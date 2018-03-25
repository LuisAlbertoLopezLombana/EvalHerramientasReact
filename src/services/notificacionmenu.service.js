import { Producto } from "../interfaces/producto.interface";

  let productos: Producto[] = [];
  let precioTotal: number = 0;

  export function addProductoCar(producto: Producto, cantidad:number){
    let productoCopy = Object.assign({}, producto);
    productoCopy.precio = +productoCopy.precio * +cantidad;
    precioTotal += +productoCopy.precio;
    productoCopy.cantidad = +cantidad;
    productos.push(productoCopy);
  }

  export function getCarElements(){
    return productos;
  }

  export function cleanCarElements(){
      productos= [];
  }

  export function getPriceTotalElements(){
      return precioTotal;
  }
