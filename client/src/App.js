import './App.css';
import Form from './Components/Form/Form';
import Home from './Components/Home/Home';
import { Link, Route } from 'react-router-dom'
import Detail from './Components/Detail/Detail';
import Searchbar from './Components/Searchbar/Searchbar';

function App() {
  return (
    <div className="App">
      <Searchbar />
      <Link to='/' >Volver al inicio</Link>
      <br />
      <Link to='/create' >Create</Link>
      <h1>Henry Pokemon</h1>
      <Route exact path='/' >
        <Link to='/home' >Ver pokemon</Link>
        <br />
      </Route>

    <Route path='/home' >
      <Home />
    </Route>

    <Route path='/create' >
      <Form />
    </Route>

    <Route path='/detail/:id' component={Detail} ></Route> 

    </div>
  );
}

export default App;
