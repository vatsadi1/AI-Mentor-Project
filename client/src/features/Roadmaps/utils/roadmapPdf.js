import { jsPDF } from "jspdf";

const PAGE_BOTTOM = 270;
const MARGIN = 10;

function ensureSpace(doc, y, lineHeight = 6) {
  if (y + lineHeight > PAGE_BOTTOM) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

export function downloadRoadmapPdf(roadmap, meta) {
  if (!roadmap?.length) return;

  const doc = new jsPDF();
  let y = MARGIN;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.text("AI Career Roadmap", MARGIN, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont("Helvetica", "normal");
  doc.text(`Role: ${meta.role}`, MARGIN, y);
  y += 5;
  doc.text(`Goal: ${meta.goalLabel}`, MARGIN, y);
  y += 5;
  doc.text(`Level: ${meta.levelLabel}`, MARGIN, y);
  y += 5;
  doc.text(`Time: ${meta.timeCommitment}`, MARGIN, y);
  y += 5;
  doc.text(`Deadline: ${meta.deadline}`, MARGIN, y);
  y += 8;

  roadmap.forEach((week) => {
    y = ensureSpace(doc, y, 12);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${week.week} — ${week.title}`, MARGIN, y);
    y += 7;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);

    doc.text("Topics:", MARGIN, y);
    y += 5;
    week.topics?.forEach((topic) => {
      y = ensureSpace(doc, y);
      doc.text(`• ${topic}`, MARGIN + 2, y);
      y += 5;
    });

    y = ensureSpace(doc, y);
    doc.text("Tasks:", MARGIN, y);
    y += 5;
    week.tasks?.forEach((task) => {
      y = ensureSpace(doc, y);
      doc.text(`• ${task}`, MARGIN + 2, y);
      y += 5;
    });

    if (meta.includeProjects && week.project) {
      y = ensureSpace(doc, y);
      doc.text(`Project: ${week.project}`, MARGIN, y);
      y += 8;
    } else {
      y += 4;
    }
  });

  const filename = `roadmap-${meta.role.toLowerCase().replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
}
