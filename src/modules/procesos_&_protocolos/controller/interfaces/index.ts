export interface ICampos_TiposController {
    getCamposTipos(page: number, limit: number, id?: string): Promise<any>;
    deleteCamposTipos(id?: string): Promise<any>;
    updateCamposTipos(id: string, camposTiposData: any): Promise<any>;
    createCamposTipos(camposTiposData: any): Promise<any>;
}


export interface ICamposController {
    getCampos(page: number, limit: number, id?: string): Promise<any>;
    deleteCampos(id?: string): Promise<any>;
    updateCampos(id: string, camposData: any): Promise<any>;
    createCampos(camposData: any): Promise<any>;
}


export interface IPreventivosController {
    getPreventivos(page: number, limit: number, id?: string): Promise<any>;
    deletePreventivos(id?: string): Promise<any>;
    updatePreventivos(id: string, preventivosData: any): Promise<any>;
    createPreventivos(preventivosData: any): Promise<any>;
}