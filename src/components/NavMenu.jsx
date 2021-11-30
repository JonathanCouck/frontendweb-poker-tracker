import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useLogout, useSession } from "../contexts/AuthProvider";

const NavItem = ({
  to,
  label
}) => 
    <NavLink to={to} className="text-xl text-gray-300 p-2 pl-5 pr-5 font-semibold hover:bg-gray-500">
      {label}
    </NavLink>
;

export default function NavMenu() {
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
            <NavItem to="/tournaments" label="Tournaments" />
            <NavItem to="/cashgames" label="Cashgames" />
            <NavItem to="/places" label="Places" />
          </>
        ) : null
      }
      <div className="flex-1" ></div>
      {
        !isAuthed ? (
          <>
            <NavItem to="/" label="Sign in" />
            <NavItem to="/register" label="Register" />
          </>
        ) : (
          <>
            <button onClick={handleLogout} >
              Sign out
            </button>
          </>
        )
      }
    </nav>
  )
}