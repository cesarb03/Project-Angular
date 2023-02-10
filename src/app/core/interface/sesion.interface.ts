import { Usuario } from "./user.interface";


export interface Sesion {
    sesionActiva: boolean,
    usuarioActivo?: Usuario;
}
