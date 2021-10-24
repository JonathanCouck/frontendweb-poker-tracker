import {useState } from 'react';

//Styles
const formStyle = {
  display: "flex",
  justifyContent:"left",
  flexDirection: "column",
  width: "auto",
  fontSize: "20px",
  margin: "10px"
}
const formItemStyle = {
  color:"lightblue",
  padding: "5px",
  display: "flex",
  border: "1px solid lightblue",
  width: "350px"
}
const labelItemStyle = {
  display: "flex",
  justifyContent: "left",
  width: "200px",
  align: "left"
}
const buttonStyle = {
  width: "100px",
  align: "center",
  fontSize: "20px"
}
const lbStyle = {
  backgroundColor: "lightblue"
}

//Components
export default function AddTournamentForm({id}) {
  const [playerID, setPlayerID] = useState(id);
  return (
    <form>
      <div style={formStyle}>
        <div style={formItemStyle}>
          <label style={labelItemStyle} htmlFor="buyin">Buyin (EUR):</label>
          <input type="number" placeholder="0" name="buyin" id="buyin" />
        </div>
        <div style={formItemStyle}>
          <label style={labelItemStyle} htmlFor="entrants">Entrants:</label>
          <input type="number" placeholder="0" name="entrants" id="entrants" />
        </div>
        <div style={formItemStyle}>
          <label style={labelItemStyle} htmlFor='place'>Place:</label>
          <input type='number' placeholder="0" name='place' id='place' />
        </div>
        <div style={formItemStyle}>
          <label style={labelItemStyle} htmlFor='cashed'>Cashed (EUR):</label>
          <input type='number' placeholder='0' name='cashed' id='cashed' />
        </div>
        <div style={formItemStyle}>
          <label style={labelItemStyle} htmlFor='date'>Date:</label>
          <input type='date' name='date' id='date' />
        </div>
        <div style={formItemStyle}>
          <button type="submit" style={buttonStyle}>Save</button>
        </div>
      </div>
    </form>
  )
}