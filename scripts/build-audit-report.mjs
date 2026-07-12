import fs from "node:fs";

const DATASET_PATH = new URL("../data/dsm-dataset.json", import.meta.url);
const OUTPUT_PATH = new URL("../docs/audit-status.md", import.meta.url);

function readDataset() {
  return JSON.parse(fs.readFileSync(DATASET_PATH, "utf8"));
}

function formatStatusCounts(entries) {
  const counts = {
    reviewed: 0,
    corrected: 0,
    unchecked: 0,
    "needs-manual-verification": 0
  };

  entries.forEach((entry) => {
    counts[entry.audit.status] = (counts[entry.audit.status] || 0) + 1;
  });

  return counts;
}

function buildChapterSection(dataset, chapter) {
  const entries = dataset.entries.filter((entry) => entry.chapterId === chapter.id);
  const counts = formatStatusCounts(entries);
  const reviewedEntries = entries
    .filter((entry) => entry.audit.status === "reviewed" || entry.audit.status === "corrected")
    .map((entry) => `- ${entry.name} (${entry.audit.status})`);
  const reviewedWithoutSections = entries
    .filter(
      (entry) =>
        (entry.audit.status === "reviewed" || entry.audit.status === "corrected") &&
        !(entry.sections || []).length
    )
    .map((entry) => `- ${entry.name} (${entry.audit.status})`);

  const manualSelectionEntries = entries
    .filter((entry) => (entry.coding.inputs || []).length > 0)
    .map((entry) => `- ${entry.name}`);

  const entriesWithNarrativeSections = entries.filter((entry) => (entry.sections || []).length > 0).length;

  return [
    `## ${chapter.title}`,
    "",
    `- Total entries: ${entries.length}`,
    `- Reviewed: ${counts.reviewed}`,
    `- Corrected: ${counts.corrected}`,
    `- Needs manual verification: ${counts["needs-manual-verification"]}`,
    `- Unchecked: ${counts.unchecked}`,
    `- Entries with explicit recording inputs: ${manualSelectionEntries.length}`,
    `- Entries with sourced narrative sections: ${entriesWithNarrativeSections}`,
    `- Audited entries still missing sourced narrative sections: ${reviewedWithoutSections.length}`,
    "",
    reviewedEntries.length ? "Reviewed or corrected entries:" : "Reviewed or corrected entries: none yet.",
    ...(reviewedEntries.length ? reviewedEntries : []),
    "",
    reviewedWithoutSections.length
      ? "Audited entries still missing sourced narrative sections:"
      : "Audited entries still missing sourced narrative sections: none.",
    ...(reviewedWithoutSections.length ? reviewedWithoutSections : []),
    "",
    manualSelectionEntries.length
      ? "Entries currently using explicit recording inputs:"
      : "Entries currently using explicit recording inputs: none.",
    ...(manualSelectionEntries.length ? manualSelectionEntries : []),
    ""
  ].join("\n");
}

function buildReport(dataset) {
  const totalCounts = formatStatusCounts(dataset.entries);
  const manualSelectionCount = dataset.entries.filter((entry) => (entry.coding.inputs || []).length > 0).length;
  const entriesWithNarrativeSections = dataset.entries.filter((entry) => (entry.sections || []).length > 0).length;
  const auditedWithoutSections = dataset.entries.filter(
    (entry) =>
      (entry.audit.status === "reviewed" || entry.audit.status === "corrected") &&
      !(entry.sections || []).length
  ).length;

  const sections = [
    "# DSMDx Audit Status",
    "",
    `Generated from \`data/dsm-dataset.json\` on ${new Date().toISOString()}.`,
    "",
    "## Overall",
    "",
    `- Total chapters: ${dataset.chapters.length}`,
    `- Total entries: ${dataset.entries.length}`,
    `- Reviewed: ${totalCounts.reviewed}`,
    `- Corrected: ${totalCounts.corrected}`,
    `- Needs manual verification: ${totalCounts["needs-manual-verification"]}`,
    `- Unchecked: ${totalCounts.unchecked}`,
    `- Entries with explicit recording inputs: ${manualSelectionCount}`,
    `- Entries with sourced narrative sections: ${entriesWithNarrativeSections}`,
    `- Audited entries still missing sourced narrative sections: ${auditedWithoutSections}`,
    ""
  ];

  dataset.chapters.forEach((chapter) => {
    sections.push(buildChapterSection(dataset, chapter));
  });

  return `${sections.join("\n")}\n`;
}

function main() {
  const dataset = readDataset();
  fs.mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, buildReport(dataset));
  console.log(`Wrote audit status report -> ${OUTPUT_PATH.pathname}`);
}

main();
