export interface RegisterRequest {
    username: string;
    email: string;
    nome: string;
    cognome: string;
    password: string;
    accountType: "user";
}
