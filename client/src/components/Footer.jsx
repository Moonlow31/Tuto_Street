import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <p className="footer-rights">Touts droits réservés à CAPCOM</p>
      <Link className="footer-about" to="/about">
        About me
      </Link>
    </div>
  );
}

export default Footer;
