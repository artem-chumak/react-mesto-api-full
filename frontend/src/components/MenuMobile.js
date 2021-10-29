import { Link } from "react-router-dom";

export const MenuMobile = ({ email, isMenuOpen, handleLogout }) => {
  return (
    <section className={isMenuOpen ? "menu_mobile" : "menu_bobile menu_hiden"}>
      <span className="menu__email">{email}</span>
      <Link to="/sign-in" onClick={handleLogout} className="button menu__link">
        Выйти
      </Link>
    </section>
  );
};
