"use client";

import axios from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import Content from "./MainContent";

export const Main = ({ data, updateValue }) => {
	// const { updateValue } = contextValue;

	const [hirerDetails, setHirerDetails] = useState({
		company: "",
		location: "",
		title: "",
		salaryRange: "",
		id: "",
		image: "",
	});

	const [isVisible, setIsVisible] = useState(false);
	const [message, setMessage] = useState("");

	const [applied, setApplied] = useState([]);

	async function clickNow(
		company,
		location,
		title,
		salaryRange,
		id,
		image
	) {
		const newHirerDetails = {
			company,
			location,
			title,
			salaryRange,
			id,
			image,
		};
		setHirerDetails(newHirerDetails);
		await savehirerDetails(newHirerDetails);
	}

	async function savehirerDetails(hirerDetails) {
		try {
			const response = await axios.post("/api/hirerDetails", {
				hirerDetails,
			});

			const verify = response.data.success;
			const statuscode = response.data.statusCode;
			const id = response.data.id;
			if (verify && statuscode === 200) {
				console.log("saved successfully");
				setIsVisible(true);
				setMessage(" Applied Successfully");

				setApplied((prev) => [...prev, id]);
				updateValue(response.data.newCoinValue);
				return;
			} else {
				if (statuscode === 399) setIsVisible(true);
				setMessage("Oops! You don't have sufficient balance");
				console.log("Details didn't saved");
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<div className="card-wrapper">
			{isVisible && (
				<div className="popup">
					<button onClick={() => setIsVisible(false)}>
						x
					</button>
					<p>{message}</p>
				</div>
			)}

			{data?.jobs?.map((job) => {
				const {
					company,
					location,
					title,
					salaryRange,
					id,
					image,
				} = job;
				return (
					<div key={id}>
						<Content
							title={title}
							company={company}
							salaryRange={salaryRange}
							img={image}
							location={location}
						/>
						{applied.includes(id) ? (
							<button disabled className="button">
								Applied
							</button>
						) : (
							<button
								onClick={() => {
									clickNow(
										company,
										location,
										title,
										salaryRange,
										id,
										image
									);
								}}
								className="button button-primary "
							>
								Apply(50$)
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
};
