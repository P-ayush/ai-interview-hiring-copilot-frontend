import api from "./axios";

const getApplications = async (page = 1) => {
    const response =
        await api.get(
            `/application?page=${page}&limit=5`
        );
    return response.data;
};


const joinInterviewRoom =
    async (interviewId) => {

        return `/interview/${interviewId}`;

    };
export const updateApplicationStatus = async (applicationId, status) => {
    const response =
        await api.patch(
            `/application/${applicationId}/status`,
            {
                status,
            }
        );
    return response.data;
};


export { getApplications, joinInterviewRoom };