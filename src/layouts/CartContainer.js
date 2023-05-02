export default function CartContainer ({children, cart}) {
  let total = 0, discount = 0, subtotal = 0;
  
  cart.forEach(product => {
    let bonus = product.bonus;
    let quantity = product.quantity;
    let price = product.price;

    total += (bonus + quantity - 1) * price;
    discount += bonus * price;
    subtotal += price * (quantity - 1)
  })

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {children}
      <div className="totals">
        <h3>Subtotal</h3>
        <span>$ {subtotal.toFixed(2)}</span>
      </div>
      <div className="totals">
        <h3>Discount</h3>
        <span>$ {discount.toFixed(2)}</span>
      </div>
      <div className="totals">
        <h3>Total</h3>
        <span>$ {total.toFixed(2)}</span>
      </div>
    </div>
  )
}