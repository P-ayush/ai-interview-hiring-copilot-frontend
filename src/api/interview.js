import api from "./axios";

export const getInterviewMessages = async (interviewId) => {
    const response =
        await api.get(
            `/interview/${interviewId}/messages`
        );
    return response.data;
};
export const startInterview = async (applicationId) => {
    const response =
        await api.post(
            "/interview/start",
            {
                applicationId,
            }
        );
    return response.data;
};
export const getRecruiterInterviews = async () => {
    const response =
        await api.get(
            `/interview/recruiter`
        );
    return response.data;

};