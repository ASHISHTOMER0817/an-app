// 'use client'

// import { createContext, useEffect, useState } from "react";
// import { Header } from "../components/Header";
// import Footer from "../components/footer";
// import axios from "axios";
// // Create a context
// export const CoinContext = createContext(0);

// export default function Layout({ children }) {
//   const [coinValue, setCoinValue] = useState(0);

//   useEffect(() => {
// 		try {
// 			async function getData() {
// 				const coin = await axios.get("/api/coinValue");
// 				setCoinValue(coin.data.coin);
// 			}
// 			getData();
// 		} catch (error) {

// 			console.log(
// 				"The request to get the coin balance is unsuccessful"
// 			);
// 		}
// 	}, []);

//   // Define the function to update the value
//   const updateValue = (newValue) => {
//     setCoinValue(newValue);
//   };

//   return (
//     <div>
//       <CoinContext.Provider value={{coinValue, updateValue}}>

//         <Header classList={"flex flex-col min-h-screen"} coinValue={coinValue} />

//         <div className="flex-1"> {children}</div>

//       </CoinContext.Provider>

//       <Footer classList={""}/>
//     </div>
//   );
// }

"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { Header } from "../components/Header";
import axios, { AxiosResponse } from "axios";
import Footer from "../components/footer";

// Define the type for the CoinContext value
interface CoinContextValue {
	coinValue: number;
	updateValue: (newValue: number) => void;
}

// Create a context
export const CoinContext = createContext<CoinContextValue>({
	coinValue: 0,
	updateValue: () => {},
});

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
	const [coinValue, setCoinValue] = useState<number>(0);

	async function getData(){
		try {
			const response: AxiosResponse<{ coin: number }> =
				await axios.get("/api/coinValue");
			setCoinValue(response.data.coin);
		} catch (error: any) {
			console.log(
				"The request to get the coin balance is unsuccessful"
			);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	// Define the function to update the value
	const updateValue = (newValue: number): void => {
		setCoinValue(newValue);
	};

	return (
		<div>
			<CoinContext.Provider value={{ coinValue, updateValue }}>
				<Header
					classList={"flex flex-col min-h-screen"}
					coinValue={coinValue}
				/>
				<div className="flex-1">{children}</div>
			</CoinContext.Provider>
			<Footer classList={""} />
		</div>
	);
}
