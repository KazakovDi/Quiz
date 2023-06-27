import { LoginProps, RegisterProps } from "../types/userInterfaces";
import { Base } from "./Base";

export default class Auth extends Base {
  async login(params: LoginProps) {
    const response = await this.request.post(
      `${this.baseUrl}/auth/login`,
      params
    );
    return response.data;
  }
  async register(input: RegisterProps) {
    const response = await this.request.post(
      `${this.baseUrl}/auth/register`,
      input
    );
    return response.data;
  }
  async me() {
    const response = await this.request.get(`${this.baseUrl}/auth/me`);
    return response.data;
  }
}
