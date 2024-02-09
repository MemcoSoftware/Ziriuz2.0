export interface IOrdenes_EstadosController {
    // Leer todos los OrdenesEstados de la BASE DE DATOS || Obtener OrdenEstado por ID
    getOrdenesEstados(page: number, limit: number, id?: string): Promise<any>;
    // Eliminar orden_estado por ID de la BASE DE DATOS
    deleteOrdenEstado(id?: string): Promise<any>;
    // Actualizar OrdenEstado
    updateOrdenEstado(id: string, ordenEstado: any): Promise<any>;
    // Crear OrdenEstado
    createOrdenEstado(ordenEstado: any): Promise<any>;
}

export interface IFallas_AccionesController {
    // Leer todas las FallasAcciones de la BASE DE DATOS || Obtener FallaAccion por ID
    getFallasAcciones(page: number, limit: number, id?: string): Promise<any>;
    // Eliminar falla_accion por ID de la BASE DE DATOS
    deleteFallaAccion(id?: string): Promise<any>;
    // Actualizar FallaAccion
    updateFallaAccion(id: string, fallaAccion: any): Promise<any>;
    // Crear FallaAccion
    createFallaAccion(fallaAccion: any): Promise<any>;
}
