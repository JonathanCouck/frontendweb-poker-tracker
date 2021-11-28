import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useLogout, useSession } from "../contexts/AuthProvider";

const NavItem = ({
  to,
  label
}) => {
  <span>
    <NavLink to={to}>
      {label}
    </NavLink>
  </span>
};

export default function NavMenu() {
  const { isAuthed } = useSession();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <div>
      <nav className="flex space-x-6">
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
              <NavItem to="/login" label="Sign in" />
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
    </div>
  )
}