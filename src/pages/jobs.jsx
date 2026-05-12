import { useEffect, useState } from "react";
import api from "../api/axios";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get(
                "/job"
            );
            setJobs(
                response.data.jobs.rows
            );
        } catch (error) {
            console.log(error);
        }
    };
    const applyJob = async (jobId) => {
        try {
            await api.post(
                `/job/${jobId}/apply`
            );
            alert("Applied successfully");
        } catch (error) {
            console.log(error);
            setErrorMessage(
                error.response.data.message||"Something went wrong"
            )
        }

    };
 return (
                   <div>
                       <h1>Jobs</h1>
           {
              errorMessage && (
           
                 <p
                    style={{
                       color: "red",
                       marginBottom: "10px",
                    }}
                 >
                    {errorMessage}
                 </p>

              )
           }           
            {
                jobs.map((job) => (

                    <div
                        key={job.id}
                        style={{
                            border:
                                "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <h2>
                            {job.title}
                        </h2>
                        <p>
                            {job.description}
                        </p>
                        <button
                            onClick={() =>
                                applyJob(job.id)
                            }
                        >
                            Apply
                        </button>
                       
                    </div>

                ))
            }

        </div>

    );

}

export default Jobs;