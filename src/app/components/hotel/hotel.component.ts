import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//EMPRESA
import { Empresa } from 'src/app/models/empresas.model';
import { HotelService } from 'src/app/services/hotel.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  providers: [ HotelService, UsuarioService ]
})
export class HotelComponent implements OnInit {

  public token;

  //Empresa
  public empresaModelGet: Empresa;
  public empresaModelPost: Empresa;
  public empresaModelId: Empresa;

  constructor(private _hotelService: HotelService, private _usuarioService: UsuarioService) {
    this.empresaModelPost = new Empresa('','', '','', '', '','');
    this.empresaModelId = new Empresa('','','','','','','');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){
    this._hotelService.obtenerEmpresas(this.token).subscribe(
      (response) => {
        this.empresaModelGet = response.usuarios;
        console.log(response);
        console.log(this.empresaModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getEmpresaId(idEmpresa){
    this._hotelService.obtenerEmpresaId(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.empresaModelId = response.usuarios;
        console.log(response);
        console.log(this.empresaModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postEmpresas(addForm){
    this._hotelService.agregarEmpresa(this.empresaModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado la Empresa Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes revisar la nueva Empresa.</a>'
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

  deleteEmpresa(idEmpresa) {
    this._hotelService.eliminarEmpresa(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  putEmpresa(){
    this._hotelService.editarEmpresa(this.empresaModelId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en la Empresa',
          text: '¡Puedes Revisar la Empresa Actualizada!',
          footer: '<a>Función concretada correctamente.</a>'
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
}

