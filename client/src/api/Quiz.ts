import { AxiosResponse } from "axios";
import { QuizProps } from "../types/quiztypes";
import { Base } from "./Base";

export default class Quiz extends Base {
  async getQuizes() {
    const response = await this.request.get(`${this.baseUrl}/quiz/`);
    return response.data;
  }
  async getQuizById(id: string) {
    const response = await this.request.get(`${this.baseUrl}/quiz/${id}`);
    return response.data;
  }
  async createQuiz(input: QuizProps) {
    const response = await this.request.post(
      `${this.baseUrl}/quiz/create`,
      input
    );
    return response.data;
  }
}
