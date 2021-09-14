import {useSelector} from "react-redux";

function Cart() {

  let cart_count = useSelector((state) => state.cartCount.cart_count)

  return ( 
    <h1>
      Cart ({cart_count})
    </h1>
  );
}

export default Cart;