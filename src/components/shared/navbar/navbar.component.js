import React, { Component } from 'react';
import * as NotificacionmenuService  from '../../../services/notificacionmenu.service';
import { Producto } from "../../../interfaces/producto.interface";
import './navbar.component.css';
import { Link } from 'react-router-dom';

class NavbarComponent extends Component {

  productos: Producto[] = [];

  constructor(props){
    super(props);
    this.state = {
      productos: [],
      productosadd:[]
    }
  }

  verCarroCompras() {
    let contextProductosComponent = this.props.carElements;
    contextProductosComponent.props.history.push('/carrocompras');
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/productos">La bodega</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/productos"><i className="fas fa-th"></i></Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={(e)=> this.verCarroCompras(e) }><i className="fas fa-shopping-cart"></i>
                <span className="badge-position badge badge-danger" >{ this.props.carElements?this.props.carElements.state.productosadd.length:NotificacionmenuService.getCarElements().length }</span></a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos"><i className="fas fa-inbox"></i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login"><i className="fas fa-sign-out-alt"></i></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

    );
  }

}

export default NavbarComponent;
