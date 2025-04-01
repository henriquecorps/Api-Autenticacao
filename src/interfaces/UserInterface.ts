export interface UserInterface {
    id?: number;
    login: string;
    senha: string;
    nome: string;
    role: string;
    status: string;
    idVendedor?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UsuarioCreateInterface {
    id?: number;
    login: string;
    nome: string;
    role: string;
    status: string;
    idVendedor?: number | null;
}

export interface IUsuarioUpdate {
    login?: string;
    senha?: string;
    nome?: string;
    role?: string;
    status?: string;
    idVendedor?: number | null;
}

export interface IUsuarioLogin {
    login: string;
    senha: string;
}

export interface IUsuarioResponse {
    id: number | undefined;
    login: string;
    nome: string;
    role: string;
    status: string;
    idVendedor?: number | null;
}