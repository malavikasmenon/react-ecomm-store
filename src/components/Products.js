import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/Product.css'
import {useDispatch, useSelector} from "react-redux";
import {setCount, setItem, setCartTotal} from "../redux/actions/actions";

function Products() {
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategory] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  let cart_count = useSelector((state) => state.cartCount.cart_count);
  console.log("yo", cart_count);
  const dispatch = useDispatch();

  useEffect(()=> {
    fetch('https://fakestoreapi.com/products', {
      'Access-Control-Allow-Origin': '*',
    })
      .then(res=>res.json())
      .then((result)=> {
        console.log('one')
        setLoaded(true)
        setProducts(result)
        setFilteredList(result)
      },
      (error) => {
        setLoaded(true);
        setError(error);
      })
      fetch('https://fakestoreapi.com/products/categories', {
      'Access-Control-Allow-Origin': '*',
    })
      .then(res=>res.json())
      .then((result)=> {
        console.log('wgere',result)
        setCategory(result);
      },
      (error) => {
        console.log(error);
        setError(true);
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

  function changeCategory(e){
    console.log(e.target.value);
    if(e.target.value!=='all'){
      if(filteredList.length > 0)
        setFilteredList(filteredList.filter(el => el.category===e.target.value))
      else
        setFilteredList(products.filter(el => el.category===e.target.value))
    }
    else
      setFilteredList(products);
  }

  function changePriceRange(e){
    if(e.target.value!=="none"){
      if(filteredList.length > 0)
        setFilteredList(filteredList.filter(el => el.price < e.target.value))
      else
      setFilteredList(products.filter(el => el.price < e.target.value))
    }
    else
      setFilteredList(products);
      
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
        <label>Category</label>
        <select onChange={changeCategory} className="input-dropdown">
          <option key="all" value="all" selected>All</option>
          {
            categories.map(el => (
            <option key={el} value={el}>{el}</option>
            ))
          }    
        </select>
        <label>Price Range (below)</label>
        <select onChange={changePriceRange} className="input-dropdown">
          <option value="none">No filter</option>
          <option value="10">$10</option>
          <option value="50">$50</option>
          <option value="100">$100</option>
          <option value="200">$200</option>
        </select>
        <ul className="prod-container">
          {filteredList.map(el => (
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