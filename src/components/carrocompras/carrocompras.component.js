import React, { Component } from 'react';
import * as NotificacionmenuService from '../../services/notificacionmenu.service';
import { Producto } from "../../interfaces/producto.interface";
import * as ProductosService  from '../../services/productos.service';
import NavbarComponent  from '../shared/navbar/navbar.component.js';
import './carrocompras.component.css';

class CarrocomprasComponent extends Component {
  productos: Producto[] = [];
  totalPrecioProductos: number = 0;
  actualizado: boolean = false;

  constructor(props){
    super(props);
    this.state = {
      productos: [],
      productosadd: [],
      totalPrecioProductos: 0,
      cantidad: 1
    }
  }

  componentWillMount(){
    this.setState({productos:NotificacionmenuService.getCarElements()});
    this.setState({totalPrecioProductos:NotificacionmenuService.getPriceTotalElements()});
  }

  pagar() {
    let lengthProductos: number = this.state.productos.length;
    ProductosService.getProductos().then(productos => {
      for (let key in productos) {
        for (let producto of this.state.productos) {
          if (key === producto.key$) {
            productos[key].uniDisp -= producto.cantidad;
            ProductosService.actualizarProducto(productos[key], key).then((res) => {
              lengthProductos--;
              if (lengthProductos === 0) {
                this.productos = [];
                NotificacionmenuService.cleanCarElements();
                this.props.history.push('/productos');
              }
            })
          }
        }
      }
    })
  }
  

  render() {
    var listItems = this.state.productos.map(function(item,index) {
      return (
        <li className="list-group list-group-flush" key={item.key$.concat(index)} >
          <div className="row">
            <div className="col-md-2">
              <img className="card-img-top img-producto-car" src={item.img} alt={item.nombre}/>
            </div>
            <div className="col-md-10">
              <h5 className="card-title">{ item.nombreProducto }</h5>
              <p className="card-text">Unidades: <small className="text-muted">{ item.cantidad }</small></p>
            </div>
          </div>
          <p className="card-text"> <b>Subtotal:</b>  { item.precio }</p>
        </li>
      );
    });
    return (
    <div className="container">
      <NavbarComponent></NavbarComponent>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <ul className="list-group">
                {listItems}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h1>TOTAL: <small>{ "$".concat(this.state.totalPrecioProductos) }</small> </h1>
          <br />
          <button type="button" name="button" className="btn btn-primary btn-car">Cancelar</button>
          <button type="button" name="button" className="btn btn-primary btn-car" onClick={ (e)=> this.pagar(e) }>Pagar</button>
        </div>
      </div>

    </div>
    );
  }

}


export default CarrocomprasComponent;
