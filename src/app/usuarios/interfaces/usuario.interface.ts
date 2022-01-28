export interface Usuario {
    _id?: number,
    usuario: string,
    nombre: string,
    apellido: string,
    correo: string
}

export interface UsuariosResponse {
    usuarios: Usuario[];
    page: number;
}