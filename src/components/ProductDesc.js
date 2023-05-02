export default function ProductDesc (props) {
  return (
    <div className="product-desc">
      <h3>{props.name}</h3>
      <p>{props.desc} </p>
    </div>
  )
}