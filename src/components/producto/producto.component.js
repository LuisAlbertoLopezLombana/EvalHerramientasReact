import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ProductosService  from '../../services/productos.service';
import { Link } from 'react-router-dom';
import NavbarComponent  from '../shared/navbar/navbar.component.js';

class ProductoComponent extends Component{

  producto: any = {};

  constructor(props){
    super(props);
    this.state = {
      producto: {}
    }

  }

  componentWillMount(){
      this.setState({producto: ProductosService.buscarProducto(this.props.match.params.id)});
  }

  render() {
    return (
      <div className="container">
        <NavbarComponent></NavbarComponent>
        <h1>Nombre producto</h1>
        {this.state.producto ?<div className="row" >
          <div className="col-md-6">
            <img  className="figure-img img-fluid rounded" src={"../".concat(this.state.producto.img)} alt={ this.state.producto.nombre }/>
            <Link to="/productos" className="btn btn-outline-primary" style={{marginBottom:10}}>Atrás</Link>
          </div>
          <div className="col-md-6">
            <h2>Precio: <small>{ this.state.producto.precio  }</small> </h2>
            <h3>Unidades disponibles: <small>{ this.state.producto.uniDisp }</small> </h3>
          </div>
        </div>:null}
          {!this.state.producto ?
        <div className="row" >
          <div className="col-md-6">
            <h3><small>No se ha identificado ningun producto</small> </h3>
            <Link to="/productos" className="btn btn-outline-primary" style={{marginBottom:10}}>Atrás</Link>
          </div>
        </div>:null}
      </div>
    );
  }

}

ProductoComponent.PropTypes = {
  match:PropTypes.any
}


export default ProductoComponent;
