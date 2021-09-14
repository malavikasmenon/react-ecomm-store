import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/products' component={Products} />
        <Route path='/cart' component={Cart} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
