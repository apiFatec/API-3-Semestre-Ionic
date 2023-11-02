import { api } from "@/api";

class IsoService {
    async postIso(data : FormData) {
        return await api.post(`isos/upload`, data);
    }
}

export default new IsoService();