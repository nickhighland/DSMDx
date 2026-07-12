const DATASET_MODULE_URL = new URL("../../data/dsm-dataset.js", import.meta.url);
const DATASET_JSON_URL = new URL("../../data/dsm-dataset.json", import.meta.url);
const DATASET_LOAD_TIMEOUT_MS = 10000;

async function loadDatasetFromJson() {
  const controller =
    typeof AbortController === "function" ? new AbortController() : null;
  const timeoutId = controller
    ? globalThis.setTimeout(() => controller.abort(), DATASET_LOAD_TIMEOUT_MS)
    : null;

  let response;
  try {
    response = await fetch(DATASET_JSON_URL, controller ? { signal: controller.signal } : undefined);
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("DSMDX_DATASET_LOAD_TIMEOUT");
    }

    throw error;
  } finally {
    if (timeoutId !== null) {
      globalThis.clearTimeout(timeoutId);
    }
  }

  if (!response.ok) {
    throw new Error(`Failed to load DSM dataset: ${response.status}`);
  }

  return response.json();
}

export async function loadDataset() {
  try {
    const datasetModule = await import(DATASET_MODULE_URL.href);
    return datasetModule.default;
  } catch (moduleError) {
    if (globalThis.location?.protocol === "file:") {
      throw new Error(`DSMDX_DATASET_MODULE_LOAD_FAILED: ${moduleError.message}`);
    }

    return loadDatasetFromJson();
  }
}

export function indexDataset(dataset) {
  const chapterById = new Map(dataset.chapters.map((chapter) => [chapter.id, chapter]));
  const entryById = new Map(dataset.entries.map((entry) => [entry.id, entry]));

  return { chapterById, entryById };
}

export function getEntriesForChapter(dataset, chapterId) {
  return dataset.entries.filter((entry) => entry.chapterId === chapterId);
}
