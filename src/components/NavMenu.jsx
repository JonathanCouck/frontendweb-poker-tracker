import { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLogout, useSession } from "../contexts/AuthProvider";
import { useTranslation } from "react-i18next";

const NavItem = ({
  to,
  label
}) => 
    <NavLink to={to} className="text-xl text-gray-300 p-2 pl-5 pr-5 font-semibold hover:bg-gray-500">
      {label}
    </NavLink>
;

export default function NavMenu() {
  const { t, i18n } = useTranslation();
  const { isAuthed } = useSession();
  const logout = useLogout();

  useEffect(() => {
    const lang = sessionStorage.getItem('lang');
    if(!lang) {
      sessionStorage.setItem('lang', i18n.language);
    } else {
      i18n.changeLanguage(lang)
    }
  },[]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleLanguageChange = useCallback((event) => {
    i18n.changeLanguage(event.target.value);
    sessionStorage.setItem('lang', i18n.language);
  }, []);

  return (
    <nav className="flex bg-gray-600">
      {
        isAuthed ? (
          <>
            <NavItem to="/games" label={t('NavMenu.games')} />
            <NavItem to="/places" label={t('NavMenu.places')} />
          </>
        ) : null
      }
      <select className="text-gray-300 bg-gray-600 ml-auto mr-5 w-16 p-2 hover:bg-gray-500" onChange={handleLanguageChange} defaultValue={sessionStorage.getItem('lang')}>
        <option value="nl">NL</option>
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>
      {
        !isAuthed ? (
          <>
            <NavItem to="/login" label={t('NavMenu.logIn')} />
            <NavItem to="/register" label={t('NavMenu.register')} />
          </>
        ) : (
          <>
            <button onClick={handleLogout} className="text-xl text-gray-300 p-2 pl-5 pr-5 font-semibold hover:bg-gray-500" >
              {t('NavMenu.logOut')}
            </button>
          </>
        )
      }
    </nav>
  )
}