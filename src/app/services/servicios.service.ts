import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerServicios(): Observable<any> {
    //let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })
    return this._http.get(this.url + '/obtenerServicios', { headers: this.headersVariable })
  }

  agregarServicio(ServicioModel: Servicio, token): Observable<any> {
    let parametros = JSON.stringify(ServicioModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/agregarServicio', parametros, {headers: headersToken})
  }

  obtenerServicioId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerServicioId/' + id, {headers: headersToken})
  }

  editarServicio(ServicioModel: Servicio, token): Observable<any> {
    let parametros = JSON.stringify(ServicioModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarServicio/' + ServicioModel._id, parametros, { headers: headersToken })
  }

  eliminarServicio(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarServicio/' + id, { headers: headersToken })
  }

}

