export default function Buy (props) {
  return (
    <div className="buy">
      <h3>${props.price.toFixed(2)}</h3>
      <button onClick={() => props.purshaseHandler(props.id, "+")}>ADD</button>
    </div>
  )
}