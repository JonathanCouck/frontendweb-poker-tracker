import { Link } from "react-router-dom";

function linkDiv(tag) {
  return(
    <div className="text-left pl-auto pr-auto p-4 bg-gray-800 select-none cursor-default border-2 hover:bg-gray-600 cursor-pointer" style={{color:"#61dafb",borderColor:"#212121"}}>
      {tag}
    </div>
  )
}

export default function MenuBar({ signOut, user }) {
  return (
    <nav>
      <ul className="grid grid-cols-5 bg-gray text-2xl w-screen h-18">
        <li>
          <Link to="/tournaments">
            {linkDiv('Tournaments')}
          </Link>
        </li>
        <li>
          <Link to="/cashgames">
            {linkDiv('Cashgames')}
          </Link>
        </li>
        <li>
          <Link to="/places">
            {linkDiv('Places')}
          </Link>
        </li>
        <li>
          <Link to="/user">
            {linkDiv(user.username)}
          </Link>
        </li>
        <li onClick={signOut}>
          <Link to="/">
            {linkDiv('Log out')}
          </Link>
        </li>
      </ul>
    </nav>
  )
}