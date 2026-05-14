import api from "./axios";
const listJobs = async () => {
    const response = await api.get("/job");
    return response.data;
}
const applyJob = async (jobId) => {
    const response = await api.post(`/job/${jobId}/apply`);
    return response.data;
}

const getApplicants = async (jobId, page = 1) => {
    const response =
        await api.get(
            `/job/${jobId}/applicants?page=${page}`
        );
    return response.data;
};

const getRecruiterJobs = async () => {
    const response = await api.get(`/job/recruiter`);
    return response.data;
}
const createJob = async (job) => {
    const response = await api.post(`/job`, job);
    return response.data;
}
export { listJobs, applyJob, getApplicants, getRecruiterJobs, createJob };