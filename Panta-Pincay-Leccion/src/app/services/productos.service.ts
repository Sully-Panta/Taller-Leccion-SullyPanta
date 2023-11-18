import { Injectable } from '@angular/core';
import { IProducto, TipoProducto } from '../interfaces/iproducto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }

  productos: IProducto[] = []
  tipos: TipoProducto[] = [
    { id: 1, nombre: 'Electrodoméstico' },
    { id: 2, nombre: 'Alimentos' },
    { id: 3, nombre: 'Libros' },
    { id: 4, nombre: 'Otros' },
  ]

  get() {
    return this.productos
  }

  getTipos() {
    return this.tipos
  }

  post(newProducto: IProducto) {
    try {
      newProducto.id = this.productos.length + 1
      this.productos.push(newProducto)
      return true
    } catch (error) {
      console.error('Error al agregar el producto:', error)
      return false
    }
  }

  delete(id: number) {
    try {
      const index = this.productos.findIndex((product) => product.id === id)
      if (index !== -1) {
        this.productos.splice(index, 1)
        return true
      } else {
        console.error('Producto no encontrado')
        return false
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
      return false
    }
  }


  getInventario() {
    const cantidadTotal = this.productos.length
    const valirTotal = this.calcularInventario()
    return `Cantidad de productos: ${cantidadTotal}, Total de inventario: $${valirTotal}`
  }

  private calcularInventario() {
    return this.productos.reduce((total, product) => total + (product.precio * product.cantidad), 0)
  }

}
