import './App.css';
import {useState } from 'react';
import CartContainer from './layouts/CartContainer';
import ProductContainer from './layouts/ProductContainer';
import Avatar from './components/Avatar';
import ProductsContainer from './layouts/ProductsContainer';
import ProductDesc from './components/ProductDesc';
import Buy from './components/Buy';
import CartProduct from './layouts/CartProduct';
import CarstProductDetails from './components/CartProductDetails';

function App() {
  // DataBase
  let products = [
    {
      id: 2,
      name: "Bread",
      desc: "Made in paris and destinated to the whole world",
      price: 1.00,
      avatar: "bread.jpg"
    },
    {
      id: 1,
      name: "Milk",
      desc: "semi skimmed milk that comes straight from Alpes farmes",
      price: 1.15,
      avatar: "milk.jpg"
    },
    {
      id: 0,
      name: "Butter",
      desc: "produced by us to inssure high quality butter",
      price: 0.80,
      avatar: "butter.jpg"
    },
  ];

  // Cart state
  const [cart, setCard] = useState([]);
  
  // the purshase handler function
  const purshaseHandler = (id, correction) => {
    // Find product id
    let index = cart.findIndex((product) => product.id === id);
    // Find bread id
    let indexBread = cart.findIndex((product) => product.id === 2);
    // if the product doen't exist, add it to cart state
    if (index === -1) {
      let product = products.find(product => product.id === id)
      
      let cartProduct = {
        id: product.id,
        name: product.name,
        avatar: product.avatar,
        price: product.price,
        quantity: 2,
        bonus: 0
      }

      setCard(cart => [...cart, cartProduct])

    } else if (correction === "+") { // if the product exists, increase its quntity.
      let tempCart = [...cart];
      let tempCartProduct = {...tempCart[index]};
      let quantity = tempCartProduct.quantity;

      // Getting the fourth milk for free if we buy 3
      if (id === 1 && quantity % 3 === 0 ) {
        tempCartProduct.bonus++;
        tempCartProduct.quantity++;
      } else {
        tempCartProduct.quantity++;
      }

      // Getting discount on the bread price if we buy two butters
      if (id === 0 && quantity % 2 === 0) {
        if (indexBread === -1) {
          let cartProduct = {
            id: 2,
            name: "Bread",
            desc: "Made in paris and destinated to the whole world",
            price: 1.00,
            avatar: "bread.jpg",
            quantity: 1,
            bonus: 0.50
          }
          tempCart.push(cartProduct);
        } else {
          let tempBreadProduct = {...tempCart[indexBread]};
          tempBreadProduct.bonus += 0.5;
          tempCart[indexBread] = tempBreadProduct;
        }
      }

      tempCart[index] = tempCartProduct;
      setCard(tempCart)

    } else { // decrease the quantity
      let tempCart = [...cart];
      let tempCartProduct = {...tempCart[index]};
      let quantity = tempCartProduct.quantity;

      // remove the frourth milk if the user undo the third milk purshase
      if (id === 1 && (quantity - 1) % 3 === 0 ) {
        tempCartProduct.bonus--;
        tempCartProduct.quantity--;
      } else {
        tempCartProduct.quantity--;
      }
      
      // remove the bread discount if the user undo the second butter purshase
      if (id === 0 && quantity % 2 !== 0) {
        let tempBreadProduct = {...tempCart[indexBread]};
        tempBreadProduct.bonus -= 0.5;
        tempCart[indexBread] = tempBreadProduct;
      }

      tempCart[index] = tempCartProduct;
      // Updating the state
      setCard(tempCart)
    }
  }

  return (
    <>
      <ProductsContainer>
        {
          products.map((product) => (
            <ProductContainer>
              <Avatar avatar={product.avatar}/>
              <ProductDesc name={product.name} desc={product.desc} />
              <Buy price={product.price} id={product.id} purshaseHandler={purshaseHandler} />
            </ProductContainer>
          ))
        }
      </ProductsContainer>
      <CartContainer cart={cart}>
        {
          cart.length > 0 ? 
            cart.map((product) => (
              <CartProduct>
                <Avatar avatar={product.avatar} />
                <CarstProductDetails data={product} purshaseHandler={purshaseHandler}/>
              </CartProduct>
            ))
            : <h3>Let's buy some food!</h3>
        }
      </CartContainer>
    </>
  );
}

export default App;



