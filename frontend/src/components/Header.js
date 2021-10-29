import { MenuMobile } from "./MenuMobile";
import logo from "../images/logo-header.svg";
import { Route, Switch, Link } from "react-router-dom";

export const Header = ({
  loggedIn,
  handleLogout,
  email,
  toggleMenu,
  isMenuOpen,
}) => {
  return (
    <>
      {loggedIn && (
        <MenuMobile
          email={email}
          handleLogout={handleLogout}
          isMenuOpen={isMenuOpen}
        />
      )}
      <header className="header section">
        <img className="logo header__logo" src={logo} alt="Логотип" />
        
        <Switch>
          <Route exact path="/">
            <div className="header__info">
              <span className="header__email">{email}</span>
              <Link
                to="/sign-in"
                onClick={handleLogout}
                className="button header__link"
              >
                Выйти
              </Link>
            </div>

            <div className="hamburger-menu" onClick={toggleMenu}>
              <div
                className={
                  isMenuOpen
                    ? "humburger-menu__menu humburger-menu__menu_clicked"
                    : "humburger-menu__menu"
                }
              ></div>
            </div>
          </Route>

          <Route path="/sign-in">
            <Link to="/sign-up" className="button header__link">
              Регистрация
            </Link>
          </Route>

          <Route path="/sign-up">
            <Link to="/sign-in" className="button header__link">
              Войти
            </Link>
          </Route>
        </Switch>
      </header>
    </>
  );
};
