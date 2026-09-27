import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Manufacturing() {
  const [upcoming, setUpcoming] = useState([]);
  const [qualityProcess, setQualityProcess] = useState([]);

  useEffect(() => {
    api.upcoming().then(setUpcoming).catch(() => {});
    api.qualityProcess().then(setQualityProcess).catch(() => {});
  }, []);

  const iodine = upcoming.find((u) => u.id === "iodine");
  const castor = upcoming.find((u) => u.id === "castor");

  return (
    <>
      <section className="section--dark section--tight">
        <div className="shell">
          <p className="kicker">Coming soon</p>
          <h1 style={{ maxWidth: "22ch" }}>Moving from trading into manufacturing</h1>
          <p className="lede">
            Grenzen is investing in two manufacturing projects — iodine intermediates and castor
            derivatives — built on the same commitment to consistent quality and dependable supply.
          </p>
        </div>
      </section>

      {/* Iodine */}
      <section className="section">
        <div className="shell">
          <div className="upcoming-card">
            <span className="upcoming-scale">{iodine?.scale || "124 planned products"} · Target 2028</span>
            <h3>{iodine?.name || "Iodine Intermediates"}</h3>
            <p style={{ maxWidth: "70ch" }}>
              {iodine?.description ||
                "Grenzen is moving from trading into manufacturing. Our upcoming unit will produce a planned portfolio of 124 iodine intermediates for pharmaceutical and specialty chemical manufacturers."}
            </p>
            <div className="grid grid-4" style={{ marginTop: 24 }}>
              {(iodine?.timeline || []).map((t) => (
                <div key={t.title} className="variant-card">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--amber-500)" }}>
                    {t.year}
                  </span>
                  <h4 style={{ marginTop: 6 }}>{t.title}</h4>
                  <p>{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Castor derivatives */}
      <section className="section section--dim">
        <div className="shell">
          <p className="kicker">Upcoming project</p>
          <h2>Castor Derivatives — HCO &amp; 12-HSA</h2>
          <p className="lede">
            {castor?.description ||
              "India grows most of the world's castor seed, and Gujarat is its largest producing state. Our planned plant will convert this local resource into hydrogenated castor oil and its derivatives."}
          </p>
          <div className="grid grid-2" style={{ marginTop: 28 }}>
            {(castor?.variants || []).map((v) => (
              <div key={v.name} className="panel">
                <h3 style={{ fontSize: "1.1rem" }}>{v.name}</h3>
                <p style={{ fontSize: "0.92rem", color: "var(--muted)" }}>{v.description}</p>
                <div style={{ margin: "12px 0" }}>
                  {v.applications.map((a) => (
                    <span key={a} className="tag tag-amber">{a}</span>
                  ))}
                </div>
                <table className="spec-table">
                  <tbody>
                    {v.specs.map((s) => (
                      <tr key={s.parameter}>
                        <td>{s.parameter}</td>
                        <td>{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality process */}
      <section className="section">
        <div className="shell">
          <p className="kicker">Quality &amp; compliance</p>
          <h2>Quality built into every step</h2>
          <div className="timeline" style={{ marginTop: 32, maxWidth: 640 }}>
            {qualityProcess.map((q, i) => (
              <div className="timeline-item" key={q.step}>
                <div className="timeline-item__year">Step {q.step}</div>
                <div className="timeline-item__rail">
                  <div className="timeline-item__dot timeline-item__dot--done" />
                  <div className="timeline-item__line" />
                </div>
                <div className="timeline-item__content">
                  <h4>{q.title}</h4>
                  <p>{q.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-band__inner">
          <div>
            <h2>Register early interest.</h2>
            <p className="lede">Request the planned iodine product list or castor derivative datasheets.</p>
          </div>
          <Link to="/contact" className="btn btn-amber">Contact us</Link>
        </div>
      </section>
    </>
  );
}
