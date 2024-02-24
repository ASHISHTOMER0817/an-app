'use client'

import { createContext, useEffect, useState, ReactNode } from "react";
import { Header } from "../components/Header";

import Footer from "../components/footer";
import CoinContextWrapper from "./CoinContext";


interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
	

	return (
		<div>

			<CoinContextWrapper>
				{children}
			</CoinContextWrapper>
			<Footer classList={""} />
		</div>
	);
}
