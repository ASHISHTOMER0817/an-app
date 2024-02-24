'use client'

import { useEffect, useState } from "react";
import { Main } from "../../components/Main";
import axios from "axios";
import Content from "../../components/MainContent";

const Page = () =>{

    const [appliedJobs, setAppliedJobs] = useState();


    useEffect(()=> {
        try {
            async function getApplications() {
                const response = await axios.get('/api/appliedJobs')
                // console.log(response)
                // console.log(response.data.data)
                // console.log(response.data)
                setAppliedJobs(response.data.data)
            }
            getApplications()
        }catch(error) {
            console.log(error.message)
        }

    },[])

    return (

        <div className="card-wrapper">
            {
                appliedJobs &&

                appliedJobs.map((job) => {
                    return (
                        <div key={id}>
                            <Content title={job.title} company={job.company} salaryRange={job.salaryRange} img={job.image} location={job.location} />
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Page;