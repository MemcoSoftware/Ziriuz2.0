export interface IEquipoController {
    // Read all Equipos from DATABASE || Get Equipo By ID
    getEquipos(page: number, limit: number, id?: string): Promise<any>;
    // Delete equipo by ID from DATABASE
    deleteEquipo(id?: string): Promise<any>;
    // Update Equipo
    updateEquipo(id: string, equipo: any): Promise<any>;
    // Create Equipo
    createEquipo(equipo: any): Promise<any>;
  }
  

  export interface IModeloEquipoController {
    getModeloEquipos(page: number, limit: number, id?: string): Promise<any>;
    createModeloEquipo(equipo: any): Promise<any>;
    deleteModeloEquipo(id?: string): Promise<any>;
    updateModeloEquipo(id: string, equipo: any): Promise<any>;
  }
  
// IClassDeviceController.ts
export interface IClassDeviceController {
  getClasesEquipos(page: number, limit: number, id?:string): Promise<any>;
  createClaseEquipo(claseEquipo: any): Promise<any>;
  updateClaseEquipo(id: string, claseEquipo: any): Promise<any>;
  deleteClaseEquipo(id: string): Promise<any>;
}
