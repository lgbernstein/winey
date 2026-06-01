import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "/Users/larrybernstein/Documents/Codex/Winey/planning";
const today = new Date("2026-05-22T12:00:00-07:00");

function setWidths(sheet, widths) {
  widths.forEach((width, idx) => {
    const col = String.fromCharCode("A".charCodeAt(0) + idx);
    sheet.getRange(`${col}:${col}`).format.columnWidthPx = width;
  });
}

function styleTitle(sheet, range, title, subtitle) {
  sheet.getRange(range).values = [[title]];
  sheet.getRange(range).format = {
    fill: "#451827",
    font: { name: "Aptos Display", size: 18, bold: true, color: "#FFF7EC" },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
  const row = Number(range.match(/\d+/)[0]) + 1;
  sheet.getRange(`A${row}`).values = [[subtitle]];
  sheet.getRange(`A${row}`).format = {
    font: { name: "Aptos", size: 10, italic: true, color: "#6B433C" },
    wrapText: true,
  };
}

function styleHeader(sheet, range) {
  sheet.getRange(range).format = {
    fill: "#7D1838",
    font: { name: "Aptos", size: 11, bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: "#E7D2C3" },
  };
}

function styleBody(sheet, range) {
  sheet.getRange(range).format = {
    font: { name: "Aptos", size: 10, color: "#2B1A17" },
    verticalAlignment: "top",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: "#E7D2C3" },
  };
}

function writePbWorkbook() {
  const workbook = Workbook.create();
  const pb = workbook.worksheets.getOrAdd("Push Blocks", { renameFirstIfOnlyNewSpreadsheet: true });
  const ctx = workbook.worksheets.getOrAdd("Context");
  const template = workbook.worksheets.getOrAdd("PB Template");

  styleTitle(pb, "A1", "Winey Push Blocks", "Planner writes PBs here. Builder reads the next Ready PB, implements it, then updates the tracker.");
  const headers = [["PB #", "Status", "Priority", "Title / Purpose", "Instructions", "Acceptance Criteria", "Dependencies", "Target Area", "Created", "Started", "Completed", "Commit Hash", "Deploy URL / Notes"]];
  pb.getRange("A4:M4").values = headers;
  styleHeader(pb, "A4:M4");
  pb.getRange("A5:M12").values = [
    ["pb-1", "Done", "High", "Initial blind tasting app", "Create the kiosk-first Winey app with host check-in, guest tasting, TV leaderboard, local SQLite persistence, and basic deploy files.", "Host can add bottles, guests can rate, TV leaderboard works, tests pass.", "None", "Full app", today, today, today, "", "Migrated into /Documents/Codex/Winey"],
    ["pb-2", "Done", "High", "Label scan fallback", "Make label-photo check-in useful even if AI extraction fails.", "Sleeve still assigns; host can manually correct missing fields; tests cover failure path.", "pb-1", "Host check-in", today, today, today, "", "Current app includes fallback behavior"],
    ["pb-3", "Ready", "Medium", "Next planned improvement", "Replace this row with the next buildable instruction from planning.", "Clear expected user-visible result and test/deploy check.", "", "", "", "", "", "", ""],
    ["pb-4", "Backlog", "Medium", "", "", "", "", "", "", "", "", "", ""],
    ["pb-5", "Backlog", "Low", "", "", "", "", "", "", "", "", "", ""],
    ["pb-6", "Backlog", "Low", "", "", "", "", "", "", "", "", "", ""],
    ["pb-7", "Backlog", "Low", "", "", "", "", "", "", "", "", "", ""],
    ["pb-8", "Backlog", "Low", "", "", "", "", "", "", "", "", "", ""],
  ];
  styleBody(pb, "A5:M40");
  setWidths(pb, [72, 90, 86, 220, 360, 320, 150, 140, 95, 95, 95, 120, 260]);
  pb.getRange("I5:K40").format.numberFormat = "yyyy-mm-dd";
  pb.freezePanes.freezeRows(4);
  pb.getRange("B5:B40").conditionalFormats.add("containsText", { text: "Ready", format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } } });
  pb.getRange("B5:B40").conditionalFormats.add("containsText", { text: "Done", format: { fill: "#E0E7FF", font: { color: "#3730A3", bold: true } } });
  pb.getRange("B5:B40").conditionalFormats.add("containsText", { text: "Blocked", format: { fill: "#FEE2E2", font: { color: "#991B1B", bold: true } } });

  styleTitle(ctx, "A1", "Winey Builder Context", "Short notes Codex should keep close when executing push blocks.");
  ctx.getRange("A4:B4").values = [["Topic", "Current Note"]];
  styleHeader(ctx, "A4:B4");
  ctx.getRange("A5:B13").values = [
    ["Project path", "/Users/larrybernstein/Documents/Codex/Winey"],
    ["App purpose", "Kiosk-first blind wine tasting app for a single party event."],
    ["Local run", "npm run build, then npm start. App listens on localhost:3000 by default."],
    ["Tests", "npm test"],
    ["Default host PIN", "2468 for local use only; change before a real party."],
    ["Data", "SQLite database and uploads live under ./data unless DATA_DIR is set."],
    ["Scanner key", "ANTHROPIC_API_KEY_WINEY enables label-photo check-in."],
    ["Builder report", "Return PB number, purpose, files changed, test/deploy result, commit hash if committed, and last five PBs."],
    ["Planning rule", "Do not mark a PB Done until build/test/deploy reality supports it."],
  ];
  styleBody(ctx, "A5:B24");
  setWidths(ctx, [170, 620]);
  ctx.freezePanes.freezeRows(4);

  styleTitle(template, "A1", "PB Draft Template", "Copy this block into the Push Blocks sheet when planning the next build.");
  template.getRange("A4:B13").values = [
    ["PB #", "pb-"],
    ["Status", "Ready"],
    ["Priority", "High / Medium / Low"],
    ["Title / Purpose", ""],
    ["Instructions", ""],
    ["Acceptance Criteria", ""],
    ["Dependencies", ""],
    ["Target Area", ""],
    ["Created", today],
    ["Notes", ""],
  ];
  styleBody(template, "A4:B13");
  template.getRange("A4:A13").format = { fill: "#F2BD5D", font: { bold: true, color: "#2B1A17" }, borders: { preset: "all", style: "thin", color: "#E7D2C3" } };
  setWidths(template, [180, 560]);

  return workbook;
}

function writeTrackerWorkbook() {
  const workbook = Workbook.create();
  const summary = workbook.worksheets.getOrAdd("Summary", { renameFirstIfOnlyNewSpreadsheet: true });
  const deployed = workbook.worksheets.getOrAdd("Deployed PBs");
  const tasks = workbook.worksheets.getOrAdd("Tasks");
  const parking = workbook.worksheets.getOrAdd("Parking Lot");
  const context = workbook.worksheets.getOrAdd("At Fingertips");

  styleTitle(summary, "A1", "Winey Tracker", "One place for deployed PBs, current work, parking lot ideas, and quick context.");
  summary.getRange("A4:D4").values = [["Metric", "Value", "Meaning", "Formula / Source"]];
  styleHeader(summary, "A4:D4");
  summary.getRange("A5:D10").values = [
    ["Completed PBs", "", "Count of PB rows marked deployed or done.", "'Deployed PBs' sheet, column A"],
    ["Open Tasks", "", "Tasks not yet Done.", "Tasks sheet, column D"],
    ["Parking Lot Items", "", "Ideas held for later.", "Parking Lot sheet, column A"],
    ["Current Next PB", "pb-3", "The next candidate PB in the planning workbook.", "Manual"],
    ["Last Verified", today, "Last time this tracker was created or refreshed.", "Manual"],
    ["Project Folder", "/Users/larrybernstein/Documents/Codex/Winey", "Open Codex from here for project work.", "Manual"],
  ];
  summary.getRange("B5").formulas = [["=COUNTA('Deployed PBs'!A5:A1000)"]];
  summary.getRange("B6").formulas = [["=COUNTIF(Tasks!D5:D1000,\"<>Done\")-COUNTBLANK(Tasks!D5:D1000)"]];
  summary.getRange("B7").formulas = [["=COUNTA('Parking Lot'!A5:A1000)"]];
  styleBody(summary, "A5:D14");
  setWidths(summary, [170, 180, 360, 240]);
  summary.getRange("B9").format.numberFormat = "yyyy-mm-dd";

  styleTitle(deployed, "A1", "Deployed PBs", "Builder appends completed work here after implementation, tests, deploy, and commit.");
  deployed.getRange("A4:H4").values = [["PB #", "Date", "Purpose", "Commit Hash", "Deploy / Run Result", "Tests", "Files / Areas Changed", "Notes"]];
  styleHeader(deployed, "A4:H4");
  deployed.getRange("A5:H6").values = [
    ["pb-1", today, "Initial blind tasting app", "", "Moved into stable Codex/Winey project folder", "5 passing tests after move", "Full app", "Seeded from existing app state"],
    ["pb-2", today, "Label scan fallback", "", "Included in current app", "Covered by existing label scan tests", "src/label-scan.js, src/server.js, test/app.test.js", "Seeded from existing app state"],
  ];
  styleBody(deployed, "A5:H80");
  deployed.getRange("B5:B80").format.numberFormat = "yyyy-mm-dd";
  setWidths(deployed, [80, 100, 260, 130, 260, 190, 260, 260]);
  deployed.freezePanes.freezeRows(4);

  styleTitle(tasks, "A1", "Tasks", "Operational task list for build/deploy follow-through.");
  tasks.getRange("A4:H4").values = [["Task ID", "PB #", "Task", "Status", "Owner", "Due", "Source", "Notes"]];
  styleHeader(tasks, "A4:H4");
  tasks.getRange("A5:H8").values = [
    ["T-001", "pb-3", "Replace pb-3 placeholder with the next real push block.", "Open", "Planning", "", "Setup", ""],
    ["T-002", "", "Decide whether Winey commits should go to a GitHub repo now or later.", "Open", "Larry", "", "Workflow", ""],
    ["T-003", "", "Confirm deployment target for party use: local Mac, small VM, or hosted server.", "Open", "Larry", "", "Deployment", ""],
    ["T-004", "", "After each builder run, copy final PB result into Deployed PBs.", "Open", "Codex", "", "Workflow", ""],
  ];
  styleBody(tasks, "A5:H80");
  setWidths(tasks, [90, 80, 320, 100, 110, 95, 140, 280]);
  tasks.getRange("F5:F80").format.numberFormat = "yyyy-mm-dd";
  tasks.freezePanes.freezeRows(4);
  tasks.getRange("D5:D80").conditionalFormats.add("containsText", { text: "Open", format: { fill: "#FEF3C7", font: { color: "#92400E", bold: true } } });
  tasks.getRange("D5:D80").conditionalFormats.add("containsText", { text: "Done", format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } } });

  styleTitle(parking, "A1", "Parking Lot", "Good ideas that are not ready to build yet.");
  parking.getRange("A4:F4").values = [["Item ID", "Idea / Question", "Why It Matters", "Status", "Created", "Notes"]];
  styleHeader(parking, "A4:F4");
  parking.getRange("A5:F8").values = [
    ["P-001", "Post-party archive view", "Could turn the event into a keepsake after reveal.", "Parked", today, ""],
    ["P-002", "Guest photo wall on TV", "Could make the TV view more lively during tasting.", "Parked", today, ""],
    ["P-003", "Export results to CSV/PDF", "Useful after the event for sharing scores.", "Parked", today, ""],
    ["P-004", "Multi-event support", "Useful if Winey becomes reusable beyond one party.", "Parked", today, ""],
  ];
  styleBody(parking, "A5:F80");
  parking.getRange("E5:E80").format.numberFormat = "yyyy-mm-dd";
  setWidths(parking, [90, 300, 330, 110, 100, 260]);
  parking.freezePanes.freezeRows(4);

  styleTitle(context, "A1", "At Fingertips", "Fast facts for future planning and implementation sessions.");
  context.getRange("A4:C4").values = [["Category", "Fact", "Source / Reminder"]];
  styleHeader(context, "A4:C4");
  context.getRange("A5:C14").values = [
    ["Workflow", "Planner writes PBs; builder executes one Ready PB at a time.", "User preference"],
    ["Report format", "PB number, hash, purpose, last five PBs, tests/deploy notes.", "User preference"],
    ["App", "Winey is a blind wine tasting event app.", "README"],
    ["Host flow", "Host scans label, sleeve number is assigned, details are editable.", "Current app"],
    ["Guest flow", "Guest chooses sleeve, rates stars, guesses grape.", "Current app"],
    ["TV flow", "Blind leaderboard before reveal; reveal details after host changes state.", "Current app"],
    ["Data", "SQLite and uploads under ./data.", "README"],
    ["Command", "npm test", "README"],
    ["Command", "npm run build", "package.json"],
    ["Command", "npm start", "README"],
  ];
  styleBody(context, "A5:C80");
  setWidths(context, [130, 360, 260]);
  context.freezePanes.freezeRows(4);

  return workbook;
}

async function saveWorkbook(workbook, path) {
  const blob = await SpreadsheetFile.exportXlsx(workbook);
  await blob.save(path);
}

async function verifyWorkbook(workbook, ranges) {
  for (const range of ranges) {
    const inspected = await workbook.inspect({ kind: "table", range, include: "values,formulas", tableMaxRows: 12, tableMaxCols: 10 });
    console.log(inspected.ndjson.split("\n").slice(0, 3).join("\n"));
  }
  const errors = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 20 },
    summary: "formula error scan",
  });
  console.log(errors.ndjson);
  for (const range of ranges) {
    const bang = range.indexOf("!");
    await workbook.render({ sheetName: range.slice(0, bang), range: range.slice(bang + 1), scale: 1 });
  }
}

await fs.mkdir(outDir, { recursive: true });

const pbWorkbook = writePbWorkbook();
await verifyWorkbook(pbWorkbook, ["Push Blocks!A1:M12", "Context!A1:B13", "PB Template!A1:B13"]);
await saveWorkbook(pbWorkbook, `${outDir}/Winey_PBs.xlsx`);

const trackerWorkbook = writeTrackerWorkbook();
await verifyWorkbook(trackerWorkbook, ["Summary!A1:D10", "Deployed PBs!A1:H8", "Tasks!A1:H8", "Parking Lot!A1:F8", "At Fingertips!A1:C14"]);
await saveWorkbook(trackerWorkbook, `${outDir}/Winey_Tracker_Tasks.xlsx`);

console.log(`Saved ${outDir}/Winey_PBs.xlsx`);
console.log(`Saved ${outDir}/Winey_Tracker_Tasks.xlsx`);
