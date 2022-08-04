import { useCallback } from "react";
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
  const { t } = useTranslation();
  const { isAuthed } = useSession();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

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
      <div className="flex-1" ></div>
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