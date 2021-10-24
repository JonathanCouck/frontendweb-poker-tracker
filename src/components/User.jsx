import React from 'react';

//Styling
const userStyle = {
  padding: "20px",
  margin: "0px",
  backgroundColor:"lightblue",
  color: "#152c45",
  fontSize: "200%",
  width: "300px",
  borderLeft: "2px solid #152c45",
  userSelect: 'none'
}

//Component
export default function User(props) {
  const { firstName, lastName } = props

  const handleClick = (e) => {
    console.log('click user');
  };
  const handleOnEnter = (e) => {
    console.log('enter user');
  }
  const handleOnLeave = (e) => {
    console.log('leave user');
  }
  
  return (
    <button style={userStyle} onClick={handleClick} onMouseEnter={handleOnEnter} onMouseLeave={handleOnLeave}>
      <div>{firstName} {lastName}</div>
    </button>
  );
}