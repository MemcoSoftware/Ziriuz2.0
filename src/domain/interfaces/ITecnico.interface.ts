export interface ITecnico {
    user_id: string; // Object ID from users
    tipo: {
        aux_tecnico: string;
        bio_titulado: string
    },
    titulo: string;
    reg_invima: string;
    tarjeta_profesional: string
}