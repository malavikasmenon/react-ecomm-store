import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/Product.css'
import {useDispatch, useSelector} from "react-redux";
import {setCount, setItem, setCartTotal} from "../redux/actions/actions";

function Products() {
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
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
    console.log(cart_count);
    cart_count += 1;
    dispatch(setCount(cart_count));
    let cart_item, total;
    for(let i=0; i<products.length; i++)
      if(products[i].id===id){
        cart_item = products[i];
        products[i].qty = 1;
        total = cart_item.price * cart_item.qty;
      }
    console.log(cart_item);
    dispatch(setItem(cart_item));
    dispatch(setCartTotal(total));
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
        <h1>Products</h1>
        <ul className="prod-container">
          {products.map(el => (
            <li key={el.id} className="product">
              <Link to={`product/${el.id}`}>
                <img src={el.image} className="prod-image" alt="the product"></img>
                <h3>{el.title}</h3>
                <h1>${el.price}</h1>
              </Link>
              <button className="prod-btn" onClick={()=> addCart(el.id)}>Add To Cart</button>
            </li>
          ))}
        </ul> 
      </div>
    );
  }
}

export default Products;