import { Link } from "react-router-dom";
import '../styles/Nav.css'
import {useSelector} from "react-redux";

function Nav() {
  let cart_count = useSelector((state) => state.cartCount.cart_count);
  return ( 
    <nav className="nav-wrapper">
      <Link to='/' className="nav-item"><h1>WindowStore</h1></Link>
      <div className="nav-link">
        <Link to='/products' className="nav-item">Products</Link>
        <Link to='/cart' className="nav-item">Cart ({cart_count})</Link>
      </div>
    </nav>
  );
}

export default Nav;