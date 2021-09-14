import { Link } from "react-router-dom";
import '../styles/Nav.css'

function Nav() {
  return ( 
    <nav className="nav-wrapper">
      <Link to='/' className="nav-item">Home</Link>
      <Link to='/products' className="nav-item">Products</Link>
      <Link to='/cart' className="nav-item">Cart</Link>
    </nav>
  );
}

export default Nav;