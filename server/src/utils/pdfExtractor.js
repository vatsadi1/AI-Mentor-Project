const { PDFParse } = require("pdf-parse");

async function extractTextFromFile(file) {
  if (!file || !file.buffer) {
    throw new Error("No file provided");
  }

  const mime = file.mimetype;
  const name = (file.originalname || "").toLowerCase();

  if (mime === "application/pdf" || name.endsWith(".pdf")) {
    const parser = new PDFParse({ data: file.buffer });
    try {
      const result = await parser.getText();
      return (result.text || "").trim();
    } finally {
      await parser.destroy();
    }
  }

  if (mime === "text/plain" || name.endsWith(".txt")) {
    return file.buffer.toString("utf-8").trim();
  }

  throw new Error("Unsupported file type. Upload a PDF or plain text (.txt) resume.");
}

module.exports = { extractTextFromFile };
