import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import List from "./components/List";
import Tree from "./components/Tree";
import Patient from "./components/Patient";
import Edit from "./components/Edit";



function App() {
  

  return (
    <div className="App">
      <Router >
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/list/:id' component={Patient}/>
          <Route exact path='/edit/:id' component={Edit}/>
          <Route exact path='/list' component={List}/>
          <Route exact path='/tree' component={Tree}/>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
