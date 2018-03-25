import { Producto } from "../interfaces/producto.interface";


  let url:string = "https://productosappnu.firebaseio.com/productos.json";
  let urlProducto:string = "https://productosappnu.firebaseio.com/productos";
  let response:any;
  let listadoproductos:Producto[] = [];

  export function getProductos(){
    return fetch(url).then(res => {
      return res.json();
    });
  }

  export function getAllProductos(){
    let productos:Producto[] = [];
    for(let key in response){
      productos.push(response[key]);
    }
    return productos;
  }

  export function getProducto(key$:string){
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${urlProducto}/${ key$ }.json`;
    return fetch(url, { headers:headers }).then(res=>{
      return res.json();
    });
  }

  export function setProductos(lstProductos){
    listadoproductos = lstProductos;
  }

  export function buscarProducto(idx:number){
    return listadoproductos[idx];
 }

  export function buscarProductos(termino:string){
    let productosPorTermino:Producto[] = [];
    termino = termino.toLowerCase();
    for(let producto of  listadoproductos){
       let nombreProducto = producto.nombreProducto.toLowerCase();
       if(nombreProducto.indexOf(termino) >= 0){
         productosPorTermino.push(producto);
       }
    }
    return productosPorTermino;
  }

  export function actualizarProducto(producto:Producto, key$:string){
    let body = JSON.stringify(producto);
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let url = `${urlProducto}/${ key$ }.json`;
    return fetch(url, {method: 'put', body:body, headers:headers}).then(res=>{
      return res.json();
    });

  }
