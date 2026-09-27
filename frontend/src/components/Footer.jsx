import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div className="footer__brand">
          <h3>Grenzen Pharmachem</h3>
          <p>
            Industrial chemicals, epoxy systems, textile dyes and agro commodities, supplied from
            Gujarat to manufacturers across India.
          </p>
          <p className="footer__reg">
            CIN U21001GJ2026PTC172674 · GSTIN 24AAMCG7263L1Z4
          </p>
        </div>

        <div>
          <h4>Site</h4>
          <ul className="footer__links">
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/manufacturing">Manufacturing</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Locations</h4>
          <ul className="footer__links">
            <li>Anand — Corporate office</li>
            <li>Mogri — Warehouse 1</li>
            <li>Navsari — Warehouse 2</li>
          </ul>
        </div>

        <div>
          <h4>Get in touch</h4>
          <ul className="footer__links">
            <li><a href="tel:+918490008908">+91 84900 08908</a></li>
            <li><a href="mailto:info@grenzenpharmachem.com">info@grenzenpharmachem.com</a></li>
            <li>www.grenzenpharmachem.com</li>
          </ul>
        </div>
      </div>

      <div className="shell footer__bottom">
        <span>© {year} Grenzen Pharmachem Industries Pvt. Ltd.</span>
        <span>Specifications subject to change without notice.</span>
      </div>
    </footer>
  );
}
