import {useState} from "react";
import User from "./User";
import USER_DATA from '../data/user_mock'
import NavItem from "./NavItem";

//Styles
const menuStyle = {
  backgroundColor:"lightblue",
  color: "#152c45",
  padding: "0px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  font: "Arial"
}

//Component
export default function Menu(props) {
  const {id} = props
  const [user] = useState(USER_DATA[id]);
  return (
    <div style={menuStyle}>
      <div>
        <NavItem title="Add Result"/>
        <NavItem title="Tournaments"/>
        <NavItem title="Cashgames"/>
      </div>
      <div> <User firstName={user.firstName} lastName={user.lastName}/> </div>
    </div>
  )
}