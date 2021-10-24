import AddCashgameForm from "./AddCashgameForm";
import AddTournamentForm from "./AddTournamentForm";

//Styles
const mainStyle = {
  height: "100%",
  width: "100%",
}
const itemStyle = {
  margin: "10px",
}

//Component
export default function MainComponent() {
  return(
    <div style={mainStyle}>
      <AddCashgameForm style={itemStyle} />
      <AddTournamentForm style={itemStyle} />
    </div>
  )
}