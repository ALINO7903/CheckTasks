export interface Task {
    _id: string;
    from: TaskUser;
    to: TaskUser;
    project: string;
    text: string;
    expires: string;
    deleted: boolean;
}

export interface TaskUser {
    _id: string;
    email: string;
    nome: string;
    cognome: string;
}

export interface TaskRequest {
    to: string;
    project: string;
    text: string;
    expires: string;
}
