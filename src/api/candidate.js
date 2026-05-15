import api from "./axios";
export const uploadResume = async (formData) => {

    const response = await api.post("/candidate/upload-resume",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );
    return response.data;

};
export const getProfile = async () => {
    const response =
        await api.get(
            "/candidate/profile"
        );
    return response.data;

};