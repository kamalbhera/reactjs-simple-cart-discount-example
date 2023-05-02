export default function CarstProductDetails (props) {
  const {name, price, quantity, id, bonus} = props.data;
  const total = price * (quantity - 1);
  const fixedTotal = total.toFixed(2);


  return (
    <div className="carst-product-details">
      <div className="sub-details">
        <h4>{name}</h4>
        <h3>$ {fixedTotal}</h3>
      </div>
      <div className="sub-details">
        <h4>quantity</h4>
        <button onClick={() => props.purshaseHandler(id, "-")}>-</button>
        <span>{quantity - 1 + bonus} </span>
        <button onClick={() => props.purshaseHandler(id, "+")}>+</button>
      </div>
    </div>
  )
}