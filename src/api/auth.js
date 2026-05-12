import api from "./axios";

const login = async (data) => {
    const respons = await api.post("/auth/login", data);
    return respons.data;
}
const signUp = async (data) => {
    const respons = await api.post("/auth/signup", data);
    return respons.data;
}
export { login, signUp }