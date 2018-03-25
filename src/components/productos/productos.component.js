import React, { Component } from 'react';
import * as ProductosService  from '../../services/productos.service';
import { Producto } from "../../interfaces/producto.interface";
import * as NotificacionmenuService  from '../../services/notificacionmenu.service';
import NavbarComponent  from '../shared/navbar/navbar.component.js';
import './productos.component.css';

class ProductosComponent extends Component {

  productos: Producto[] = [];


  constructor(props){
    super(props);
    this.state = {
      productos: [],
      productosadd: [],
      cantidad: 1,
      msgerror: false,
      buscar: ''
    }
    this.verProducto = this.verProducto.bind(this);
    this.buscarProducto = this.buscarProducto.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

  }


  componentWillMount(){
    const self = this;
    ProductosService.getProductos().then(function(data) {
      let lstProductos = [];
      let  producto: Producto = {};
      for(let key in data){
        producto = data[key];
        producto.key$ = key;
        producto.cantidad = 1;
        lstProductos.push(producto);
      }
      ProductosService.setProductos(lstProductos);
      self.setState({productos: lstProductos});
    });
  }

  componentDidMount(){
    this.setState({productosadd: NotificacionmenuService.getCarElements()});
  }

  verProducto(idx) {
    this.props.history.push('/producto/'.concat(idx));
  }

  buscarProductos() {
    ProductosService.getAllProductos();
  }

  buscarProducto (e) {
    this.setState({productos: ProductosService.buscarProductos(this.state.buscar)});
  }

  changeHandler (e){
    this.setState({buscar: e.target.value});
  }

  addProductoCar(producto: Producto, cantidad: number) {
    if (cantidad >= 1) {
      this.setState({msgerror: false});
      NotificacionmenuService.addProductoCar(producto, cantidad);
      this.setState({productosadd: NotificacionmenuService.getCarElements()});
    }else{
      this.setState({msgerror: true});
      setTimeout(()=>{
        this.setState({msgerror: false});
      },3000)
    }

  }


  onChange(idx,event){
    var prods = Object.assign([{}], this.state.productos);
    prods[idx].cantidad = event.target.value;
    this.setState({productos: prods});
  }

  render() {
    const self = this;
    var listItems = this.state.productos.map(function(item,index) {
      return (
        <div key={item.key$} className="card animated fadeIn fast" >
          <img className="card-img-top" src={item.img} alt={item.nombre}/>
          <div className="card-body">
            <h5 className="card-title">{ item.nombreProducto }</h5>
            <p className="card-text">Precio: { item.precio }</p>
            <p className="card-text">Unidades disponibles: <small className="text-muted">{ item.uniDisp }</small></p>
            <div className="row">
              <div className="col-md-4"><button onClick={(e)=> self.verProducto(index, e) } type="button" name="button" className="btn btn-primary">Ver más</button></div>
              <div className="col-md-4"><button onClick={(e)=> self.addProductoCar(item, item.cantidad,e)} type="button" name="button" className="btn btn-warning">Añadir</button></div>
              <div className="col-md-4"> <input className="form-control" type="number" min="1" ref="cantidad"  onChange= { self.onChange.bind(self,index) } value={ item.cantidad } required/></div>
            </div>
          </div>

        </div>
      );
    });
    return (
      <div className="container">
        <NavbarComponent carElements = { this } ></NavbarComponent>
        <div className="row">
          <div className="col-md-8">
            <h1>Catálogo de productos</h1>
          </div>
          <div className="col-md-4">
            <h3><small>¿Qué estas buscando?</small></h3>
            <form>
              <input className="form-control mr-sm-2" type="search" placeholder="Buscar producto" onChange={ this.changeHandler } onKeyUp={ this.buscarProducto } ref="buscarProd" value={ this.state.buscar }/>
            </form>
          </div>
        </div>
        <hr />
        {this.state.msgerror?<div id="error"  className="alert alert-danger" role="alert">Cantidad no permitida, debe ser mayor a uno ( 1 ).</div>:null}
        <div className="card-columns">
	         {listItems}
        </div>
      </div>
    );
  }
}

export default ProductosComponent;
