import { User } from "@/types";

export const history = {
    navigate: <any>null,
    location: <any>null,
};

export const setTokens = (authRes: any) => {
    localStorage.setItem('token', authRes?.accessToken);
};

export const removeTokens = () => {
    localStorage.removeItem('token');
};
export const getAccessToken = () => localStorage.getItem('token')
export const getUser = () => localStorage.getItem('user');
export const setUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));
export const getRefreshToken = () => localStorage.getItem('refresh_token');


export const setItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};

export const getItem = (key: string): string | null => {
    return localStorage.getItem(key);
};

export const getItemAsBoolean = (key: string): boolean => {
    return localStorage.getItem(key) === "true" ? true : false;
};
