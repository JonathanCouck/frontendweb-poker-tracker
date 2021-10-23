export default function User(props) {
  const { id, firstName, lastName } = props
  
  return (
    <div>
      {firstName} {lastName} met id {id}
    </div>
  );
}