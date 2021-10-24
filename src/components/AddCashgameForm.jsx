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

//Components
export default function AddCashgameForm({id}) {
  const [playerID, setPlayerID] = useState(id);
  return (
    <form>
      <div style={formStyle}>
        <div style={formItemStyle}>
          <label style={labelItemStyle} htmlFor="smallBlind">Small blind:</label>
          <input type="number" placeholder="0" name="smallBlind" id="smallBlind" />
        </div>
        <div style={formItemStyle}>
          <label style={labelItemStyle} htmlFor="bigBlind">Big blind:</label>
          <input type="number" placeholder="0" name="bigBlind" id="bigBlind" />
        </div>
        <div style={formItemStyle}>
          <label style={labelItemStyle} htmlFor='inFor'>In for (EUR):</label>
          <input type='number' placeholder='0' name='inFor' id='inFor' />
        </div>
        <div style={formItemStyle}>
          <label style={labelItemStyle} htmlFor='outFor'>Out for (EUR):</label>
          <input type='number' placeholder='0' name='outFor' id='outFor' />
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