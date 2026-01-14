import axios from 'axios'
import {LoginOut} from "../LoginPage.jsx";

class ApiClient {
    constructor(){
        this.client = axios.create({
            baseURL: '/api/v1/', // http://localhost:8080
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            }
        })

        this.client.interceptors.response.use(
            response => response,
            error => this.handleError(error)
        )
    }

    handleError(error){
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Перенаправление на логин
                    LoginOut();
                    break;
                case 403:
                    console.log('Доступ запрещен 403')
                    LoginOut();
                    break;
                    // throw new Error('Доступ запрещен');
                case 404:
                    throw new Error('Ресурс не найден');
                case 500:
                    throw new Error('Ошибка сервера');
                default:
                    throw new Error(error.response.data?.message || 'Ошибка запроса');
            }
        } else if (error.request) {
            throw new Error('Нет ответа от сервера');
        } else {
            throw new Error('Ошибка настройки запроса');
        }

        return Promise.reject(error);
    }

    async get(url, config = {}) {
        return this.client.get(url, config);
    }

    async post(url, data, config = {}) {
        return this.client.post(url, data, config);
    }

    async put(url, data, config = {}) {
        return this.client.put(url, data, config);
    }

    async delete(url, config = {}) {
        return this.client.delete(url, config);
    }

    async patch(url, data, config = {}) {
        return this.client.patch(url, data, config);
    }
}
export default ApiClient;