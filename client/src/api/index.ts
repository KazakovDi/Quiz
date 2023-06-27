import axios from "axios";
import Auth from "./Auth";
import Quiz from "./Quiz";
export default class Api {
  baseUrl = "";
  auth: Auth;
  quiz: Quiz;
  constructor() {
    this.auth = new Auth(this.request, this.baseUrl);
    this.quiz = new Quiz(this.request, this.baseUrl);
  }

  get request() {
    const instance = axios.create({
      baseURL: "http://localhost:5000",
    });

    instance.interceptors.request.use((config) => {
      config.headers.Authorization = window.localStorage.getItem("token");
      return config;
    });
    return instance;
  }
}

export const apiInterface = new Api();
