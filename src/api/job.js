import api from "./axios";
const listJobs = async () => {
    const response = await api.get("/job");
    return response.data;
}
const applyJob = async (jobId) => {
    const response = await api.post(`/job/${jobId}/apply`);
    return response.data;
}
export { listJobs, applyJob };