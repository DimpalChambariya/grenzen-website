import { useState } from "react";

export default function Admin() {
  const [catalogueFile, setCatalogueFile] = useState(null);
  const [status, setStatus] = useState("No file uploaded yet.");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setStatus("Please upload a valid PDF file.");
      return;
    }

    setCatalogueFile(file);
    setStatus(`${file.name} is ready to be used as the admin catalogue.`);
  };

  const handleSave = () => {
    if (!catalogueFile) {
      setStatus("Please choose a PDF before saving.");
      return;
    }

    const objectUrl = URL.createObjectURL(catalogueFile);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = catalogueFile.name;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setStatus(`Saved: ${catalogueFile.name}. The PDF is ready for the public catalogue area.`);
  };

  return (
    <section className="section section--dim">
      <div className="shell">
        <div className="panel" style={{ maxWidth: 780, margin: "0 auto" }}>
          <p className="kicker">Admin only</p>
          <h2>Upload catalogue PDF</h2>
          <p className="lede">
            This section is only for internal/admin use. The uploaded PDF is not shown publicly
            unless you connect it to the site’s public catalogue section.
          </p>

          <div className="catalogue-panel" style={{ marginTop: 24 }}>
            <label className="upload-box">
              <span>Choose PDF file</span>
              <input type="file" accept=".pdf,application/pdf" onChange={handleFileChange} />
            </label>

            <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save PDF
              </button>
            </div>

            <p className="catalogue-meta" style={{ marginTop: 18 }}>{status}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
