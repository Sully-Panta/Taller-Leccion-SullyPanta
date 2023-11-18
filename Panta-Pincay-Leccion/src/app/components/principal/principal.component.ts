import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProducto, TipoProducto } from 'src/app/interfaces/iproducto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{

  displayedColumns: string[] = ['codigo', 'nombre', 'tipo', 'precio', 'cantidad', 'subtotal', 'accion']
  dataSource = new MatTableDataSource<IProducto>()
  loading: boolean = false
  tipos: TipoProducto[] = []
  inventario: string = ""
  form:  FormGroup

  constructor(
    private _productosService: ProductosService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      codigo:   ['', Validators.required],
      nombre:   ['', Validators.required],
      tipo:     ['', Validators.required],
      precio:   ['', Validators.required],
      cantidad: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getProducts()    
    this.tipos = this._productosService.getTipos()
    console.log(this.tipos);
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0){
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  getProducts() {
    this.dataSource.data = this._productosService.get()
    this.inventario = this._productosService.getInventario()
  }

  handleSubmit() {
    
    if (this.form.invalid) {
      this._snackBar.open("Campos vacíos", "Error", {
        duration: 4000,
        verticalPosition: 'bottom'
      })
      return
    }

    const product : IProducto = {
      codigo:     this.form.value.codigo,
      nombre:     this.form.value.nombre,
      tipo:       this.tipos[this.form.value.tipo - 1],
      precio:     this.form.value.precio,
      cantidad:   this.form.value.cantidad,
      subtotal:   Number(this.form.value.precio) * Number(this.form.value.cantidad)
    }

    const success = this._productosService.post(product);

    if (success) {
      this.mostrarMensajeExito("Producto agregado correctamente");
      this.getProducts();
      this.form.reset();
    } else {
      this.mostrarMensajeError("Error al agregar el producto");
    }

  }

  handleDelete(id: number) {
    const success = this._productosService.delete(id);

    if (success) {
      this.mostrarMensajeExito("Producto eliminado correctamente");
      this.getProducts();
    } else {
      this.mostrarMensajeError("Error al eliminar el producto");
    }
  }

  private mostrarMensajeExito(mensaje: string) {
    this._snackBar.open(mensaje, 'Enhorabuena', {
      duration: 4000,
      verticalPosition: 'bottom',
    });
  }

  private mostrarMensajeError(mensaje: string) {
    this._snackBar.open(mensaje, 'Upss!!', {
      duration: 4000,
      verticalPosition: 'bottom',
    });
  }

}
