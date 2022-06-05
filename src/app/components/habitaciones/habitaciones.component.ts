import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { ProductosEmpresa } from 'src/app/models/productosEmpresa.model';
import { ProductosSucursal } from 'src/app/models/productosSucursal.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss'],
  providers: [ HabitacionesService, UsuarioService ]
})
export class HabitacionesComponent implements OnInit {

  public token;
  public buscar;

  //PRODUCTOS DE LA EMPRESA
  public productosEmpresaModelGet: ProductosEmpresa;
  public productosEmpresaModelPost: ProductosEmpresa;
  public productosSucursalModelPost: ProductosSucursal;
  public productosEmpresaModelId: ProductosEmpresa;

  constructor(private _habitacionesService: HabitacionesService, private _usuarioService: UsuarioService) {
    this.productosEmpresaModelPost = new ProductosEmpresa('','', '',0, '');
    this.productosEmpresaModelId = new ProductosEmpresa('','','',0, '');
    this.productosSucursalModelPost = new ProductosSucursal('','',0,'',0, '','');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getProductosEmpresa();
  }

  getProductosEmpresa(){
    this._habitacionesService.obtenerProductosEmpresa(this.token).subscribe(
      (response) => {
        this.productosEmpresaModelGet = response.productos;
        console.log(response);
        console.log(this.productosEmpresaModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getProductosEmpresaId(idSucursal){
    this._habitacionesService.obtenerProductosEmpresaId(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.productosEmpresaModelId = response.productos;
        console.log(response);
        console.log(this.productosEmpresaModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  sendProductosEmpresa(sendForm){
    this._habitacionesService.enviarProductosSucursal(this.productosSucursalModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductosEmpresa();
        sendForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se han Enviada Productos a Sucursal',
          text: '¡Puedes Revisar el cambio!',
          footer: 'Envió de Producto Exitoso.'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡La cantidad a mandar es mucho mayor al Stock!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>'
        })
      }
    )
  }

  postProductosEmpresa(addForm){
    this._habitacionesService.agregarProductoEmpresa(this.productosEmpresaModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductosEmpresa();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado un Producto Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: 'Puedes revisar el nuevo Producto.'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>'
        })
      }
    )
  }

  deleteProductosEmpresa(idSucursal) {
    this._habitacionesService.eliminarProductosEmpresa(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductosEmpresa();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  putProductosEmpresa(){
    this._habitacionesService.editarProductosEmpresa(this.productosEmpresaModelId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductosEmpresa();
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en el Producto',
          text: '¡Puedes Revisar el Producto Actualizado!',
          footer: 'Función concretada correctamente.'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: 'No dejes campos vacios, ¡gracias!'
        })
      }
    )
  }

  getProductosStockEmpresa(){
    this._habitacionesService.obtenerStockProductoEmpresa(this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.productosEmpresaModelGet = response.productos;

        console.log(response);
        console.log(this.productosEmpresaModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getProductosStockEmpresaMenor(){
    this._habitacionesService.obtenerStockProductosEmpresaMenor(this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.productosEmpresaModelGet = response.productos;

        console.log(response);
        console.log(this.productosEmpresaModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

}
