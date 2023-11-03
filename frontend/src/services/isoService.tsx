import { api } from "@/api";

class IsoService {
    async postIso(data : FormData) {
        return await api.post(`isos/upload`, data);
    }
    async getIso() {
        return await api.get("/isos")
    }
}

export default new IsoService();