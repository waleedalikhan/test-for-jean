import { IItem } from "@/types";
import { axiosClient } from "./axiosClient";

const getPosts = async (): Promise<any> => {

    return axiosClient.get(
        "/post/all",
    );

};

const addPost = async (formData: FormData): Promise<any> => {

    return axiosClient.post(
        "/post",
        formData
    );

};

const apiService = {
    addPost,
    getPosts,
};

export default apiService;

