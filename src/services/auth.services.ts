import { setItem } from "@/helper";
import { LoginForm, User } from "@/types";
import { axiosClient } from "./axiosClient";


const login = async (loginForm: LoginForm): Promise<any> => {

    return axiosClient.post(
        "/auth/login",
        JSON.stringify(loginForm)
    );

};

const authService = {
    login,
};

export default authService;