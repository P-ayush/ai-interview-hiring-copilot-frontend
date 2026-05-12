import api from "./axios";

const getCandidateApplications = async (page = 1) => {
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

export { getCandidateApplications, joinInterviewRoom };