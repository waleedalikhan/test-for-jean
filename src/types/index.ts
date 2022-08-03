
export interface IAuth {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface IItem {
  id: number;
  title: string;
  desc: string;
  file: string;
}

export type LoginForm = {
  username: string;
  password: string;
}
export type Item_Form = {
  title: string;
  desc: string;
  file: any;
}



export type User = {
  // userName: string;
  accessToken: string;
}

// export interface IUser {
//   name: string;
// }

