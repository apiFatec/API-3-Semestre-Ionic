import {api} from '@/api'

class TaskService {
    async postFile(taskId: string | undefined, userId : string | undefined, userName : string | undefined, data : FormData){
        return await api.post(`files/task/${taskId}/user/${userId}/username/${userName}`, data);
    }

}

export default new TaskService();