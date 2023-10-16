import axios from "axios";

const BASE_URL = "http://localhost:4000/tarefas";

export class TarefasService{
    static criarTarefa(body){
        return axios.post(`${BASE_URL}/`,body);
    }
    
    static getTarefas(){
        return axios.get(`${BASE_URL}/`);
    }

    static getTarefasByText(body){
        return axios.post(`${BASE_URL}/getByText`,body);
    }

    static atualizarTarefa(id, body){
        return axios.put(`${BASE_URL}/${id}`,body);
    }

    static apagarTarefa(id){
        return axios.delete(`${BASE_URL}/${id}`);
    }
}