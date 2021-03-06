import { useState, useEffect } from "react";
import '../styles/Product.css'
import { useSelector, useDispatch } from "react-redux";
import { setItem, setCount, setCartTotal } from "../redux/actions/actions";

function ProductDetail(props) {

  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const productId = props.match.params.productId;
  const dispatch = useDispatch();
  let cart_count = useSelector((state) => state.cartCount.cart_count);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      'Access-Control-Allow-Origin': '*',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result);
          setProduct(result);
          setLoading(false);
        // console.log(productId);
      },
        (err) => {
          console.log(err);
          console.log('yp')
        }
      )
  
  })
  function addToCart(e) {
    e.preventDefault();
    console.log(e.target.count.value);
    cart_count += 1;
    dispatch(setCount(cart_count));
    let cart_item = product;
    cart_item.qty = e.target.count.value;
    dispatch(setItem(cart_item));
    let total = cart_item.qty * cart_item.price;
    dispatch(setCartTotal(total));
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  else {
    return (
      <div className="prod-detail-container">
        <img src={product.image} alt="the product" className="prod-detail-image"></img>
        <div className="prod-description">
          <h1>{product.title}</h1>
          <h3>Product Description: </h3>
          <p>{product.description}</p>
          <h3>Average rating of {product.rating.rate} from {product.rating.count} customers</h3>
          <h3>Price: ${product.price}</h3>
          <form onSubmit={addToCart}>
            <input type='number' name="count" min='1' max='10' defaultValue='1' />
            <input type='submit' value="Add to Cart" />
          </form>
          <ul style={{marginTop: '5%', color: '#5C5B5B'}}> 
            <li>Cash on Delivery Option</li>
            <li>Free Returns Available</li>
            <li>Refunds Allowed upto 10 Days post delivery</li>
            <li>Exciting cashback offers</li>
            <li>Gift options available</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ProductDetail;