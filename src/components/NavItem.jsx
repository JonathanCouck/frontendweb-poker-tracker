//Styles
const navItemStyle = {
  backgroundColor:"lightblue",
  color: "#152c45",
  fontSize: "200%",
  padding: "10px",
  width: "300px",
  userSelect: 'none'
}
const navHoverStyle = {
  backgroundColor:"blue",
  color: "white"
}

//Component
export default function NavItem(props) {
  const {title} = props;

  const handleClick = (e) => {
    console.log('click', title)
  };
  const handleMouseEnter = (e) => {
    console.log('enter', title)
  };
  const handleMouseLeave = (e) => {
    console.log('leave', title)
  };

  return (
    <button style={navItemStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {title}
    </button>
  )
}