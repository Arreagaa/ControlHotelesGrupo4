export class Room {
  constructor(
    public _id: String,
    public nombreRoom: String,
    public tipo: String,
    public precio: Number,
    public disponibilidad: String,
    public idHotel: String
  ){}
}
