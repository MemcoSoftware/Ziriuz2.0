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
  