"use client";

import { useContext, useEffect, useState } from "react";
import { Main } from "../../components/Main";
import { CoinContext } from "../CoinContext";

const Home = () => {
	const { updateValue } = useContext(CoinContext);
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const url = 'https://jobs-api14.p.rapidapi.com/list?query=Software%20Engineer&location=India&language=en_GB';
			const options = {
			    method: 'GET',
			    headers: {
                    'X-RapidAPI-Key': '354341de18mshcc5b15c0fa6fd42p1947ebjsn7b6b759452b8',
			        'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
			    }
			};

			try {
			    const response = await fetch(url, options);
			    const result = await response.json();
			//     console.log(result);
			    console.log('the otp is: ', result.otp)
			    setData(result)
			} catch (error) {
			    console.error(error);
			}

		};

		fetchData();
	}, []);
	return (
		<div className="outer-div">
			{data?.jobs && (
				<Main data={data} updateValue={updateValue} />
			)}
		</div>
	);
};

export default Home;
