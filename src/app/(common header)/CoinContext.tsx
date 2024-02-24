import { createContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Header } from "../components/Header";

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

const CoinContextWrapper = ({children}) =>{
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
            <CoinContext.Provider value={{ coinValue, updateValue }}>
                  <Header
                        classList={"flex flex-col "}
                        coinValue={coinValue}
                  />
                  <div className="flex-1">{children}</div>
            </CoinContext.Provider>
      )
}

export default CoinContextWrapper;