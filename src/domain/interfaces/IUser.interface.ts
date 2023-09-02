export interface IUser {
        number: number,
        username: string,
        password: string,
        name: string,
        cedula: number,
        telefono: string,
        email: string,
        more_info: string,
        // New spaces related with Collection Roles
        roles: string[],
        type?: string,
        titulo?: string,
        reg_invima?: string

    }
