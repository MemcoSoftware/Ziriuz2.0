// index.ts

export interface IVisitasEstadosController {
    // Read all VisitasEstados from DATABASE || Get VisitaEstado By ID
    getVisitasEstados(page: number, limit: number, id?: string): Promise<any>;
    // Delete visita_estado by ID from DATABASE
    deleteVisitaEstado(id?: string): Promise<any>;
    // Update VisitaEstado
    updateVisitaEstado(id: string, visitaEstado: any): Promise<any>;
    // Create VisitaEstado
    createVisitaEstado(visitaEstado: any): Promise<any>;
}

