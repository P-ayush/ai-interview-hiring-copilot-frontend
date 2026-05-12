import { useEffect, useState } from "react";

import api from "./api/axios";

function App() {

    const [jobs, setJobs] = useState([]);




    useEffect(() => {

        fetchJobs();

    }, []);




    const fetchJobs = async () => {

        try {

            const response =
                await api.get("/job");

            console.log(response.data);




            setJobs(
                response.data.jobs.rows
            );

        } catch (error) {

            console.log(error);

        }

    };




    return (

        <div
            style={{
                padding: "20px",
            }}
        >

            <h1>
                AI Interview Copilot
            </h1>




            <h2>
                Jobs
            </h2>




            {
                jobs.length === 0 ? (

                    <p>
                        No jobs found
                    </p>

                ) : (

                    jobs.map((job) => (

                        <div

                            key={job.id}

                            style={{

                                border:
                                    "1px solid #ccc",

                                padding:
                                    "15px",

                                marginBottom:
                                    "10px",

                                borderRadius:
                                    "10px",

                            }}

                        >

                            <h3>
                                {job.title}
                            </h3>




                            <p>
                                {
                                    job.description
                                }
                            </p>




                            <p>

                                <strong>
                                    Skills:
                                </strong>

                                {
                                    job.skills
                                }

                            </p>




                            <button>

                                Apply

                            </button>

                        </div>

                    ))

                )
            }

        </div>

    );

}

export default App;