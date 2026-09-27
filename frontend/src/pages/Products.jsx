import { useEffect, useMemo, useState } from "react";
import { api } from "../api.js";

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.categories(), api.products()])
      .then(([c, p]) => {
        setCategories(c);
        setProducts(p);
      })
      .catch(() => setError("Could not load the product range right now. Please try again shortly."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.categoryId === activeCategory;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, query]);

  return (
    <>
      <section className="section--dark section--tight">
        <div className="shell">
          <p className="kicker">Product portfolio</p>
          <h1>Nine products in supply today, 730+ on the way</h1>
          <p className="lede">
            Search or filter the current range below. Every product ships with a documented
            specification and certificate of analysis.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="filter-bar">
            <div className="filter-tabs" role="tablist" aria-label="Filter by category">
              <button
                className={`filter-tab ${activeCategory === "all" ? "filter-tab--active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All products
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`filter-tab ${activeCategory === c.id ? "filter-tab--active" : ""}`}
                  onClick={() => setActiveCategory(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <input
              type="search"
              className="search-input"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>

          {error && <p className="form-status form-status--error">{error}</p>}
          {loading && <p className="lede">Loading product range…</p>}

          {!loading && filtered.length === 0 && (
            <div className="empty-state">
              <p>No products match &ldquo;{query}&rdquo;. Try a different search or category.</p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((p) => {
              const isOpen = openId === p.id;
              return (
                <div key={p.id} className={`product-card ${isOpen ? "product-card--open" : ""}`}>
                  <button
                    className="product-card__head"
                    onClick={() => setOpenId(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="product-card__code">{p.code}</span>
                      <h3>{p.name}</h3>
                      <p>{p.description}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span className="product-card__volume">{p.volume}</span>
                      <svg className="product-card__chevron" width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="product-card__body">
                      <div>
                        <h4 style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", marginBottom: 10 }}>
                          Key applications
                        </h4>
                        <div>
                          {p.applications.map((a) => (
                            <span key={a} className="tag">{a}</span>
                          ))}
                        </div>
                        {p.hazard && (
                          <p style={{ fontSize: "0.82rem", color: "var(--amber-600)", marginTop: 14 }}>
                            ⚠ {p.hazard}
                          </p>
                        )}
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", marginBottom: 10 }}>
                          Typical specification
                        </h4>
                        <table className="spec-table">
                          <tbody>
                            {p.specs.map((s) => (
                              <tr key={s.parameter}>
                                <td>{s.parameter}</td>
                                <td>{s.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
