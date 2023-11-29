import {api} from '@/api'
import { I2Comentario } from '@/components/taskModal';

class TaskService {
    async postFile(taskId: string | undefined, userId : string | undefined, userName : string | undefined, data : FormData){
        return await api.post(`files/task/${taskId}/user/${userId}/username/${userName}`, data);
    }

    async getUserTask(taskId: string | undefined, userId : string | null){
        return await api.get(`tasks/${taskId}/user/${userId}`)
    }

    async getFileTask(taskId : string | undefined){
        return await api.get(`files/task/${taskId}`);
    }

    async getMembers(taskId : string | undefined){
        return await api.get(`tasks/members/${taskId}`)
    }

    async getComentarios(taskId : string | undefined){
        return await api.get(`comentarios/${taskId}`)
    }

    async postComentario(data : I2Comentario | undefined){
        return await api.post(`comentarios`, data)
    }

    async deleteComentario(idComentario : string | undefined){
        return await api.delete(`comentarios/${idComentario}`)
    }

    async leaderTeam(idProcess : string | undefined){
        return await api.get(`teams/leader/${idProcess}`)
    }
}

export default new TaskService();