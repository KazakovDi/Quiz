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
  async uploadPhoto(cover: FormData) {
    const response = await this.request.post(
      `${this.baseUrl}/quiz/uploadImage`,
      cover
    );
    return response.data;
  }
  async getPhoto(imageName: string) {
    const response = await this.request.get(
      `${this.baseUrl}/uploads/${imageName}`
    );
    return response.data;
  }
}
