import { useState, useEffect } from "react";
import '../styles/Product.css'
import {useDispatch, useSelector} from "react-redux";
import {setCount} from "../redux/actions/actions";

function Products() {
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  let cart_count = useSelector((state) => state.cartCount.cart_count);
  console.log("yo", cart_count);
  const dispatch = useDispatch();

  useEffect(()=> {
    fetch('https://fakestoreapi.com/products', {
      'Access-Control-Allow-Origin': '*',
    })
      .then(res=>res.json())
      .then((result)=> {
        console.log(result)
        setLoaded(true)
        setProducts(result)
      },
      (error) => {
        setLoaded(true);
        setError(error);
      })
  }, [])

  function addCart(id){
    // setCartTotal(cartTotal + 1);
    console.log(cart_count);
    cart_count += 1;
    dispatch(setCount(cart_count))
  }

  if(error) {
    return <div>Error: {error.message}</div>
  }
  else if(!isLoaded) {
    return <h3>Loading...</h3>
  }
  else {
    return ( 
      <div>
        <h1>Products Cart({cart_count})</h1>
        <ul className="prod-container">
          {products.map(el => (
            <li key={el.id} className="product">
              <img src={el.image} className="prod-image"></img>
              <h3>{el.title}</h3>
              <h1>${el.price}</h1>
              <button className="prod-btn" onClick={()=> addCart(el.id)}>Add To Cart</button>
            </li>
          ))}
        </ul> 
      </div>
    );
  }
}

export default Products;