import {Link} from "react-router-dom";

function Home() {
  return ( 
    <div style={{display:'flex', flexWrap: 'wrap'}}>
      <img src="/hero-img.svg" className="hero-img" alt="banner illustration"/>
      <div className="hero-text">
        <h3>Have a seamless shopping experience, here at WindowShop!</h3>
        <Link to="/products"><button className="prod-btn">See Products &rarr;</button></Link>
      </div>
    </div>
   );
}

export default Home;