
export default function ProductsContainer ({children}) {
  return (
    <div className="products-container">
      <h1>Products</h1>
      {children}
    </div>
  )
}