import './App.css';
import {Home} from './components/Home';
import {Cars} from './components/Cars';
import {CarCategory} from './components/CarCategory';
import {Navigation} from './components/Navigation';
import {register} from './components/register.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginForm from './loginForm';
import './style/style.css';
function App() {
  return (
    <Router>
    <div className="Logo container-fluid p-0">
    
  
    <Navigation/>

<Router>
    <Switch>
    <Route path='/' component={LoginForm} exact />
      <Route path='/home' component={Home} exact />
      <Route path='/cars' component={Cars} exact />
      <Route path='/carcategory' component={CarCategory} exact />
      <Route path='/register' component={register} exact />
      
      
    </Switch>
    </Router>

    
    {/* <div className='MainPage'>
    <div className='marketingdiv'>
    <div className='pdiv'>
      <p>
        Make your drive best <br></br>
        is our responnsibility
      </p>
    </div>

    <button className='rentbutton'>Rent Now</button>
    </div>
    <div className='anotherdiv'></div>
    </div> */}

    </div>
    
    </Router>
  );
}

export default App;
