import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerHoteles(): Observable<any> {
    //let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })
    return this._http.get(this.url + '/obtenerHoteles', { headers: this.headersVariable })
  }

 /* agregarEmpresa(modeloEmpresa: Empresa, token): Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/registrarEmpresa', parametros, {headers: headersToken})
  }

  eliminarEmpresa(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarEmpresa/' + id, { headers: headersToken })
  }

  obtenerEmpresaId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerEmpresaId/' + id, {headers: headersToken})
  }

  editarEmpresa(modeloEmpresa: Empresa, token): Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarEmpresa/' + modeloEmpresa._id, parametros, { headers: headersToken })
  }*/

}
