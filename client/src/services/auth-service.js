import axios from "axios";

export default class authService {

    constructor() {

        this.service = axios.create({
            baseURL: process.env.REACT_APP_URL,
            withCredentials: true
        })
    }

    validationCheck = (firstname, lastname, number) => {
        return this.service.post("/verification", {firstname, lastname, number})
            .then(response => response.data)
    }

    signup = (username, email, password) => {
        return this.service.post('/signup', { username, email, password })
            .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
    }

    login = (username, password) => {
        return this.service.post('/login', { username, password })
            .then(response => response.data)
    }

    logout = () => {
        return this.service.post('/logout', {})
            .then(response => response.data)
    }


}