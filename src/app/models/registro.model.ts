export class Reservacion {
  constructor(
    public _id: String,
    public nombreCompra: String,
    public precio: Number,
    public cantidad: Number,
    public idUsuario: String,
  ){}
}
