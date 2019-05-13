import axios from "axios";

export default class Services {

  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    })
  }

  all = () => {
    return this.service
      .get(`/all`)
      .then(data => data.data)
  }

  oneData = (id) => {
    return this.service
      .get(`/one/${id}`)
      .then(data => data.data)
  }

  newOne = (data) => {
    return this.service
      .post(`/new`, data)
  }

  /* updateOne = (id, data) => {
    return this.service
      .put(`/update/${id}`, data)
  } */

  /* deleteOne = (id) => {
    return this.service
      .delete(`/delete/${id}`)
  } */
}