"use client";

import Image from "next/image";
import coins from "/public/icons/coin.svg";
import profile from "/public/icons/user.svg";
import logo from "/public/icons/logo.svg";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const user = {};
export const Header = ({ classList, coinValue }) => {

	const [menuVisible, setMenuVisible] = useState(false);
	const router = useRouter();

	const logout = async () => {
		try {
			await axios.post("/api/logout");
			router.push("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	const menuVisibleT = () => {
		setMenuVisible(true);
	};

	const menuVisibleF = () => {
		setMenuVisible(false);
	};

	return (
		<div
			className={`header  mt-3 ${classList}`}
		>
			<nav className="flex justify-between items-center w-full  pb-2">
				<div>
					<Link href={"/home"}>
						<Image
							src={logo}
							alt="logo Image"
							className="logo-image"
						/>
					</Link>
				</div>
				<ul className="flex">
					<li>
						<button
							onClick={logout}
							className=" right-align bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							Logout
						</button>
					</li>
					<li
						className="right-align"
						onMouseOver={menuVisibleT}
						onMouseOut={menuVisibleF}
					>
						{/* <Link href={'/profile'} > */}

						<Image
							src={user?.profilePic || profile}
							alt="Profile Pic"
						/>
						{menuVisible && (
							<div className="user-menu">
								<Link href={"/profile"}>
									Profile
								</Link>
								<Link href={"/appliedJobs"}>
									Applied Jobs
								</Link>
								<Link href={"/logout"}>
									Logout
								</Link>
							</div>
						)}
						{/* </Link> */}
					</li>
					<li className="coin-wrapper">
						<Image src={coins} alt="Coins" />
						<span className="coin-value">
							{coinValue || 0}
						</span>
					</li>
				</ul>
			</nav>
		</div>
	);
};


