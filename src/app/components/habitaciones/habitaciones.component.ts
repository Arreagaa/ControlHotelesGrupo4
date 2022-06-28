import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
//HOTELES
import { Hotel } from 'src/app/models/hotel.model';
import { HotelesService } from 'src/app/services/hoteles.service';
import { ActivatedRoute } from '@angular/router';
//HABITACIONES
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss'],
  providers: [ HotelesService, UsuarioService, RoomService ]
})
export class HabitacionesComponent implements OnInit {

  public token;
  public idHotel;

  //DATOS DEL HOTEL
  public hotelModelGet: Hotel;
  public hotelModelGetId: Hotel;

  //ROOMS
  public roomModelGet: Room;
  public roomlModelPost: Room;
  public roomModelGetId: Room;

  constructor(private _hotelesService: HotelesService, public _usuarioService: UsuarioService, public _activatedRoute: ActivatedRoute, public _roomService : RoomService) {
    this.hotelModelGetId = new Hotel('','', '','', '', '',0,'');
    this.token = this._usuarioService.obtenerToken();

    //ROOMS
    this.roomlModelPost = new Room('','', '',0,'','');
    this.roomModelGetId = new Room('','', '',0,'','');
  }
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getHotelId(dataRuta.get('idHotel'));

      this.idHotel = dataRuta.get('idHotel')
    });
    this.getRooms();
  }

  //OBTENER DATOS DEL HOTEL POR SU ID
  getHotelId(idHotel){
    this._hotelesService.obtenerHotelId(idHotel, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.hotelModelGetId = response.hoteles;
        console.log(response.hoteles);
        console.log(response);
        console.log(this.hotelModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  //ROOMS
  getRooms(){
    this._roomService.obtenerRooms().subscribe(
      (response) => {
        this.roomModelGet = response.rooms;
        console.log(response);
        console.log(this.roomModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getRoomId(idRoom){
    this._roomService.obtenerRoomId(idRoom, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.roomModelGetId = response.rooms;
        console.log(response);
        console.log(this.roomModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postRooms(addForm){
    this._roomService.agregarRoom(this.roomlModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getRooms();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado la Habitación Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes verificar la nueva Habitación.</a>'
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

  putRooms(){
    this._roomService.editarRoom(this.roomModelGetId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getRooms();
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en la Habitación',
          text: '¡Puedes Revisar la Habitación Actualizada!',
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

  deleteRoom(idRoom) {
    this._roomService.eliminarRoom(idRoom, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getRooms();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

}
