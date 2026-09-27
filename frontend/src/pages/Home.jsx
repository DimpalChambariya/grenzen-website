import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import Counter from "../components/Counter.jsx";
import ProcessMotif from "../components/ProcessMotif.jsx";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.stats(), api.categories(), api.industries()])
      .then(([s, c, i]) => {
        setStats(s);
        setCategories(c);
        setIndustries(i);
      })
      .catch(() => setError("Live data is temporarily unavailable — showing the site without it."));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="section--dark hero">
        <div className="shell hero__grid">
          <div>
            <img src="/logo.png?v=2" alt="Grenzen Pharmachem logo" className="hero__brand" />
            <p className="kicker">Gujarat · Anand, Mogri &amp; Navsari</p>
            <h1 className="hero__title">
              Chemistry that keeps<br />Gujarat&rsquo;s industry running.
            </h1>
            <p className="lede">
              Grenzen Pharmachem supplies epoxy &amp; varnish raw materials, textile dyes,
              caustic soda and agro commodities to manufacturers and dairies across India —
              matched to spec, batch after batch.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn-primary">Browse product range</Link>
              <Link to="/contact" className="btn btn-outline">Request a quotation</Link>
            </div>
          </div>
          <div className="hero__motif" aria-hidden="true">
            <ProcessMotif />
          </div>
        </div>

        <div className="shell hero__stats">
          {(stats || placeholderStats).map((s) => (
            <div key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {error && (
        <div className="shell" style={{ paddingTop: 20 }}>
          <p style={{ color: "#a15b00", fontSize: "0.9rem" }}>{error}</p>
        </div>
      )}

      {/* WHAT WE SUPPLY */}
      <section className="section">
        <div className="shell">
          <p className="kicker">What we supply</p>
          <h2 style={{ maxWidth: "16ch" }}>Four product lines, one dependable supply chain</h2>
          <div className="grid grid-4" style={{ marginTop: 40 }}>
            {categories.map((c) => (
              <Link to="/products" key={c.id} className="cat-card">
                <span className="cat-card__code">{c.code}</span>
                <h3>{c.name}</h3>
                <p>{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section section--dim">
        <div className="shell why-grid">
          <div>
            <p className="kicker">Why manufacturers work with us</p>
            <h2>Built for repeat, dependable supply</h2>
            <p className="lede">
              Strategic Gujarat locations, segregated storage, and documented batches —
              the operating discipline that lets your production line keep running.
            </p>
          </div>
          <ul className="why-list">
            <li>
              <strong>Strategic Gujarat locations.</strong> Corporate office in Anand with
              warehouses at Mogri and Navsari, close to major industrial and dairy clusters.
            </li>
            <li>
              <strong>Dedicated storage.</strong> Separate facilities for chemicals and agro
              commodities, including a dedicated site for molasses at Navsari.
            </li>
            <li>
              <strong>Consistent specifications.</strong> Every supply matched to the agreed
              specification and documented batch by batch.
            </li>
            <li>
              <strong>Transparent terms.</strong> Clear pricing, GST-compliant invoicing and
              straightforward commercial terms.
            </li>
          </ul>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section">
        <div className="shell">
          <p className="kicker">Industries we serve</p>
          <h2>From transformer varnish to the dairy plant floor</h2>
          <div className="grid grid-3" style={{ marginTop: 36 }}>
            {industries.map((ind) => (
              <div key={ind.id} className="panel industry-card">
                <h3>{ind.name}</h3>
                <p>{ind.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section className="section section--tight">
        <div className="shell catalogue-shell">
          <div>
            <p className="kicker">Catalogue</p>
            <h2>Explore our complete product catalogue</h2>
            <p className="lede">
              Browse our complete range of industrial chemicals, agro inputs, dyes and process support
              materials with technical specifications and packaging details.
            </p>
            <div className="catalogue-actions">
              <a
                href="/catalogue/grenzen-catalogue.pdf"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View catalogue (PDF) ↗
              </a>
              <a
                href="/catalogue/grenzen-catalogue.pdf"
                className="btn btn-outline btn-outline--dark"
                download="Grenzen-Pharmachem-Product-Catalogue.pdf"
              >
                Download PDF
              </a>
              <Link to="/products" className="btn btn-outline btn-outline--dark">
                View products
              </Link>
            </div>
          </div>

          <div className="catalogue-card">
            <span className="catalogue-card__badge">PDF Document · 15.4 MB</span>
            <div className="catalogue-card__icon" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3>Grenzen Pharmachem Product Catalogue</h3>
            <p>
              Complete technical specification sheet, applications, packaging, and commercial grades.
            </p>
            <a
              href="/catalogue/grenzen-catalogue.pdf"
              className="catalogue-card__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open &amp; read directly in browser &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="shell cta-band__inner">
          <div>
            <h2>Let&rsquo;s build something together.</h2>
            <p className="lede">Request samples, specifications or a quotation today.</p>
          </div>
          <Link to="/contact" className="btn btn-amber">Get in touch</Link>
        </div>
      </section>
    </>
  );
}

const placeholderStats = [
  { value: 25, suffix: "+", label: "Satisfied clients" },
  { value: 2665, suffix: " MT", label: "Total monthly supply" },
  { value: 3, suffix: "", label: "Gujarat locations" },
  { value: 124, suffix: "", label: "Planned iodine products" }
];
