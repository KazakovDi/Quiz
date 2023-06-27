export interface RegisterProps {
  username: string;
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface UserResponceProps {
  token: string;
  username: string;
}
