import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//EMPRESA
import { Hotel } from 'src/app/models/hotel.model';
import { HotelesService } from 'src/app/services/hoteles.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.scss'],
  providers: [ HotelesService, UsuarioService ]
})
export class HotelesComponent implements OnInit {

  public token;

  //Empresa
  public hotelModelGet: Hotel;
  //public empresaModelPost: Empresa;
  //public empresaModelId: Empresa;

  constructor(private _hotelesService: HotelesService, public _usuarioService: UsuarioService) {
    //this.empresaModelPost = new Empresa('','', '','', '', '','');
    //this.empresaModelId = new Empresa('','','','','','','');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getHoteles();
  }

  getHoteles(){
    this._hotelesService.obtenerHoteles().subscribe(
      (response) => {
        this.hotelModelGet = response.hoteles;
        console.log(response);
        console.log(this.hotelModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

 /* getEmpresaId(idEmpresa){
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
  }*/
}


