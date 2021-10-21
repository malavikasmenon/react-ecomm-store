import {useSelector, useDispatch} from "react-redux";
import { removeCartItem, setCount, setCartTotal } from "../redux/actions/actions";
import "../styles/Product.css";

function Cart() {

  const dispatch = useDispatch();
  let cart_count = useSelector((state) => state.cartCount.cart_count)
  let cart_items = useSelector((state) => state.cartCount.cart_items)
  let cart_total = useSelector((state) => state.cartCount.cart_total)

  function removeFromCart(id) {
    console.log(id);
    let item = cart_items.filter(el => el.id===id);
    console.log(item);
    let newItems = cart_items.filter((el) => el.id!==id);
    dispatch(removeCartItem(newItems));
    dispatch(setCount(cart_count-1));
    console.log(item[0].qty, item[0].price);
    let total_update = -(item[0].qty * item[0].price)
    console.log(total_update);
    dispatch(setCartTotal(total_update));
  }

  return ( 
    <div>
      <h1>
        Cart ({cart_count})
      </h1>
      <ul className="prod-container">
        {cart_items.map(el => (
          <li key={el.id} className="product">
            <img src={el.image} className="prod-image" alt="product"></img>
            <h3>{el.title}</h3>
            <h1>${el.price}</h1>
            <h3>Qty: {el.qty}</h3>
            <button className="prod-btn" onClick={()=> removeFromCart(el.id)}>Remove</button>
          </li>
        ))}
      </ul> 
      <div className="total">
        <h1>Total Amount : ${cart_total.toFixed(2)}</h1>
        <button className="prod-btn" onClick={()=>alert("Feature will be implemented shortly!")}>Proceed to checkout</button>
      </div>
    </div>
   
  );
}

export default Cart;