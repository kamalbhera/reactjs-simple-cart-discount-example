export default function Avatar (props) {
  let src = `${props.avatar}`;
  return (
    <>
      <img src={require("../assets/" + src)} alt="butter" className="avatar" />
    </>
  )
}