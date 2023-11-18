export interface TipoProducto {
    id:         number
    nombre:     string
}

export interface IProducto {
    id?:        number
    codigo:     string
    nombre:     string
    tipo:       TipoProducto
    precio:     number
    cantidad:   number
    subtotal:   number
}
