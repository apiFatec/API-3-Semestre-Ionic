import { api } from "@/api";

class IsoService {
    async postIso(data : FormData, title : string, description : string) {
        return await api.post(`isos/upload`, data, {
            headers :{
                'title' : title,
                'description' : description
            }
        });
    }

    async getIsos(){
        return await api.get('isos')
    }
}

export default new IsoService();