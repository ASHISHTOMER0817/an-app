'use client'

import { createContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/footer";
import axios from "axios";
// Create a context
export const CoinContext = createContext(0);

export default function Layout({ children }) {
  const [coinValue, setCoinValue] = useState(0);

  useEffect(() => {
		try {
			async function getData() {
				const coin = await axios.get("/api/coinValue");
				setCoinValue(coin.data.coin);
			}
			getData();
		} catch (error) {

			console.log(
				"The request to get the coin balance is unsuccessful"
			);
		}
	}, []);

  // Define the function to update the value
  const updateValue = (newValue) => {
    setCoinValue(newValue);
  };

  return (
    <div>
      <CoinContext.Provider value={{coinValue, updateValue}}>

        <Header classList={"flex flex-col min-h-screen"} coinValue={coinValue} />

        <div className="flex-1"> {children}</div>

      </CoinContext.Provider>

      <Footer classList={""}/>
    </div>
  );
}