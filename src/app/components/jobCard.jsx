import Image from "next/image";
import close from "@/../public/close.png"
export default function JobCard({
	Name,
	city,
      WorkPreference,
	position,
      candidateType,
	summary,
	requirements,
}) {
	return (
		<div>
			<h3>{position}</h3> <Image src={close}/>
			<h4 className="text-gray-400">{Name} <div className="float-right">{city}<div>.</div> {WorkPreference}</div></h4>
                  <div>

			<button className="bg-blue-500">Apply Now</button>
			<button className="bg-gray-400">Save</button>
                  </div>
                  <h3>Job details</h3>
                  <div className="mb-4">{candidateType}</div>
                  < hr/>
                  <h3 className="mb-4">Job Summary</h3>
			<div className="mt-4">{summary}</div>
                  <h3 className="my-4">Requirements</h3>
			<div>{requirements}</div>
                  <button className="mt-6">Report Job</button>
		</div>
	);
}
