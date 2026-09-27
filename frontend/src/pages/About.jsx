import { useEffect, useState } from "react";
import { api } from "../api.js";

const history = [
  { year: "2026", title: "Company incorporated", detail: "Grenzen Pharmachem Industries Pvt. Ltd. established in Anand, Gujarat.", status: "done" },
  { year: "Now", title: "Trading operations", detail: "Chemicals, dyes, caustic soda and agro commodities supplied across Gujarat.", status: "active" },
  { year: "Next", title: "Manufacturing unit", detail: "Iodine intermediates facility being established.", status: "upcoming" },
  { year: "2028", title: "Commercial production", detail: "Launch of the 124-product iodine range.", status: "upcoming" }
];

export default function About() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    api.company().then(setCompany).catch(() => {});
  }, []);

  return (
    <>
      <section className="section--dark section--tight">
        <div className="shell">
          <p className="kicker">Company profile</p>
          <h1 style={{ maxWidth: "20ch" }}>
            A dependable partner for industrial chemicals and agro commodities
          </h1>
          <p className="lede">
            From our corporate office in Anand and warehouses at Mogri and Navsari, we combine
            disciplined sourcing, careful storage and on-time dispatch with a working
            understanding of what our customers make.
          </p>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="section">
        <div className="shell split">
          <div className="vision-panel">
            <p className="kicker" style={{ color: "#bfe8e2" }}>Our vision</p>
            <h3>To make India a leader in iodine chemistry.</h3>
            <p>
              {company?.vision ||
                "By 2028 we will manufacture a portfolio of 124 iodine intermediates in Gujarat, supplying pharmaceutical, diagnostic and specialty chemical manufacturers in India and overseas."}
            </p>
          </div>
          <div className="mission-panel">
            <p className="kicker">Our mission</p>
            <h3>From trader to trusted manufacturer.</h3>
            <p style={{ color: "var(--muted)" }}>
              {company?.mission ||
                "To supply industrial chemicals and agro commodities that meet specification every time, delivered safely and on schedule."}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--dim">
        <div className="shell">
          <p className="kicker">Core values</p>
          <h2>What guides every consignment</h2>
          <div className="grid grid-4" style={{ marginTop: 32 }}>
            {(company?.values || defaultValues).map((v) => (
              <div key={v.title} className="value-card">
                <h4>{v.title}</h4>
                <p>{v.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="shell split">
          <div>
            <p className="kicker">Looking ahead</p>
            <h2>From reliable supplier today to iodine manufacturer tomorrow</h2>
            <p className="lede">
              Our next stage is manufacturing: a dedicated unit for iodine intermediates and a
              castor derivatives plant for hydrogenated castor oil and 12-HSA.
            </p>
          </div>
          <div className="timeline">
            {history.map((h) => (
              <div className="timeline-item" key={h.year + h.title}>
                <div className="timeline-item__year">{h.year}</div>
                <div className="timeline-item__rail">
                  <div className={`timeline-item__dot timeline-item__dot--${h.status}`} />
                  <div className="timeline-item__line" />
                </div>
                <div className="timeline-item__content">
                  <h4>{h.title}</h4>
                  <p>{h.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section section--dim">
        <div className="shell">
          <p className="kicker">Leadership team</p>
          <h2>Experienced hands, clear direction</h2>
          <div className="grid grid-2" style={{ marginTop: 32, gap: "32px 40px" }}>
            {(company?.leadership || defaultLeadership).map((l) => (
              <div className="leader-card" key={l.name}>
                <div className="leader-avatar">
                  {l.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <h4>{l.name}</h4>
                  <span className="leader-role">{l.role}</span>
                  <p>{l.bio}</p>
                  <div>
                    {l.focus.map((f) => (
                      <span key={f} className="tag">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const defaultValues = [
  { title: "Quality", detail: "Materials that match the agreed specification, consignment after consignment." },
  { title: "Integrity", detail: "Honest commitments, transparent pricing and clear documentation." },
  { title: "Reliability", detail: "Planned inventory and dispatch so our customers' lines keep running." },
  { title: "Innovation", detail: "Moving from trading into manufacturing, starting with iodine intermediates." }
];

const defaultLeadership = [
  { name: "Dhruv K. Chambariya", role: "Director", focus: ["Business strategy", "Key accounts"], bio: "Drives Grenzen's strategy and growth and leads key industrial and dairy customer relationships." },
  { name: "Chandrikaben B. Patel", role: "Director", focus: ["Governance", "Compliance"], bio: "Provides governance and oversight across the company, guiding statutory compliance." },
  { name: "Aksh B. Patel", role: "Chief Financial Officer", focus: ["Finance", "Taxation"], bio: "Leads finance, from accounts and taxation to working capital and banking." },
  { name: "Dimpal K. Chambariya", role: "Chief Technical Officer", focus: ["Digital", "Documentation"], bio: "Leads technology and digital presence, and supports technical documentation." }
];
