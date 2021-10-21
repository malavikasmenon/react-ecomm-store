import {useSelector, useDispatch} from "react-redux";
import { removeCartItem, setCount } from "../redux/actions/actions";
import { useEffect, useState } from "react";
import "../styles/Product.css";

function Cart() {

  const dispatch = useDispatch();
  let cart_count = useSelector((state) => state.cartCount.cart_count)
  let cart_items = useSelector((state) => state.cartCount.cart_items)
  const [total, setTotal] = useState(0);


  function removeFromCart(id) {
    console.log(id);
    let newItems = cart_items.filter((el) => el.id!=id);
    console.log('new', newItems);
    dispatch(removeCartItem(newItems));
    dispatch(setCount(cart_count-1));
  }

  useEffect(() => {
    let total_amount = 0;
    cart_items.forEach(el => {
      total_amount += (el.price * el.qty)
    });
    total_amount = total_amount.toFixed(2);
    console.log(total_amount);
    setTotal(total_amount);
  })

  return ( 
    <div>
      <h1>
        Cart ({cart_count})
      </h1>
      <ul className="prod-container">
        {cart_items.map(el => (
          <li key={el.id} className="product">
            <img src={el.image} className="prod-image"></img>
            <h3>{el.title}</h3>
            <h1>${el.price}</h1>
            <h3>Qty: {el.qty}</h3>
            <button className="prod-btn" onClick={()=> removeFromCart(el.id)}>Remove</button>
          </li>
        ))}
      </ul> 
      <div className="total">
        <h1>Total Amount : ${total}</h1>
        <button className="prod-btn" onClick={()=>alert("Feature will be implemented shortly!")}>Proceed to checkout</button>
      </div>
    </div>
   
  );
}

export default Cart;