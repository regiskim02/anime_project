import api from "./axios";

export const login = async (data) => {
    const response = await api.post("/auth/login", data);

    const token = response.data.token;
    localStorage.setItem("token", token);

    return response.data;
};

export const signup = (data) => {
    return api.post("auth/signup", data);
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};