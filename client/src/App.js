import './App.css';
import Form from './Components/Form/Form';
import Home from './Components/Home/Home';
import { Link, Route, Switch } from 'react-router-dom'
import Detail from './Components/Detail/Detail';
import Searchbar from './Components/Searchbar/Searchbar';
import Landing from './Components/Landing/Landing';
import Game from './Components/Game/Game';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path='/'> <Landing /> </Route>
        <Route path='/' > <Searchbar /> </Route>
      </Switch>

    <Route path='/home' >
      <Home />
    </Route>

    <Route path='/create' >
      <Form />
    </Route>

    <Route path='/detail/:id' component={Detail} ></Route> 

    <Route path='/game' ><Game /></Route>

    </div>
  );
}

export default App;