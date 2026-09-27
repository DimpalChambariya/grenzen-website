import { useEffect, useState } from "react";
import { api } from "../api.js";

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "General enquiry",
  message: ""
};

export default function Contact() {
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message }
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    api.company().then((c) => setLocations(c.locations)).catch(() => {});
    api.categories().then(setCategories).catch(() => {});
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setStatus(null);

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill in your name, email and message." });
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitEnquiry(form);
      setSubmittedData({ ...form });
      setStatus({ type: "success", message: res.message });
      setForm(initialForm);
      setTouched(false);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="section--dark section--tight">
        <div className="shell">
          <p className="kicker">Partner with us</p>
          <h1>Let&rsquo;s build something together</h1>
          <p className="lede">Request samples, specifications or a quotation — our team responds directly.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell contact-grid">
          <div>
            <h2 style={{ fontSize: "1.4rem" }}>Our locations</h2>
            {locations.map((l) => (
              <div className="location-card" key={l.id}>
                <span className="location-card__tag">{l.label}</span>
                <h4>{l.city}</h4>
                <p>{l.address}</p>
                <p style={{ fontStyle: "italic", color: "var(--muted)" }}>{l.role}</p>
              </div>
            ))}

            <div className="location-card" style={{ background: "var(--paper-dim)", border: "none" }}>
              <span className="location-card__tag">Direct contact</span>
              <h4>Talk to our team</h4>
              <p><a href="tel:+918490008908">+91 84900 08908</a></p>
              <p><a href="mailto:info@grenzenpharmachem.com">info@grenzenpharmachem.com</a></p>
            </div>
          </div>

          <div>
            <div className="panel">
              <h2 style={{ fontSize: "1.4rem" }}>Send an enquiry</h2>
              <p className="lede" style={{ marginBottom: 24 }}>
                Share your requirement — product, grade, quantity and delivery location — and
                we&rsquo;ll come back with a specification and a clear commercial offer.
              </p>

              {status && status.type === "error" && (
                <div className="form-status form-status--error" role="status">
                  {status.message}
                </div>
              )}

              {submittedData ? (
                <div className="enquiry-success" style={{ textAlign: "center", padding: "32px 16px" }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(15, 144, 190, 0.12)",
                    color: "var(--teal-600)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px"
                  }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.45rem", color: "var(--navy-950)", marginBottom: 8 }}>Enquiry Sent Successfully!</h3>
                  <p style={{ color: "var(--muted)", maxWidth: "46ch", margin: "0 auto 14px", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    Thank you, <strong>{submittedData.name}</strong>. Your enquiry regarding <strong>{submittedData.product}</strong> has been dispatched.
                  </p>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: 26 }}>
                    A confirmation has been sent to <strong>{submittedData.email}</strong>. Our team will review your requirement and get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline btn-outline--dark"
                    onClick={() => {
                      setSubmittedData(null);
                      setStatus(null);
                      setForm(initialForm);
                    }}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="name">Full name *</label>
                      <input
                        id="name"
                        required
                        data-touched={touched}
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        value={form.company}
                        onChange={update("company")}
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="email">Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        data-touched={touched}
                        value={form.email}
                        onChange={update("email")}
                        placeholder="you@company.com"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="+91 …"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="product">Product interest</label>
                    <select id="product" value={form.product} onChange={update("product")}>
                      <option>General enquiry</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                      <option>Iodine Intermediates (2028)</option>
                      <option>Castor Derivatives — HCO &amp; 12-HSA</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      required
                      data-touched={touched}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Product, grade, quantity and delivery location…"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: "100%", justifyContent: "center" }}>
                    {submitting ? "Sending…" : "Send enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
