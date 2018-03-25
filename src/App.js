import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import  LoginComponent  from './components/login/login.component';
import  ProductosComponent  from './components/productos/productos.component';
import  ProductoComponent  from './components/producto/producto.component';
import CarrocomprasComponent from './components/carrocompras/carrocompras.component';

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/login" component={LoginComponent}/>
          <Route exact path="/" component={LoginComponent}/>
          <Route path="/productos" component={ProductosComponent}/>
          <Route path="/producto/:id" component={ProductoComponent}/>
          <Route path="/carrocompras" component={CarrocomprasComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
