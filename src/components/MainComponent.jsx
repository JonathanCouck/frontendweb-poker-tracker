//Styles
const mainStyle = {
  height: "100%",
  width: "100%",
}

//Component
export default function MainComponent(props) {
  const {view} = props;

  return(
    <div style={mainStyle}>
      {view}
    </div>
  )
}