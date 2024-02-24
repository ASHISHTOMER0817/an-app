"use client";
import React, { SetStateAction, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [showOtpInput, setShowOtpInput] = useState(false);
	const router = useRouter();

	async function sendOtp() {
		try {
			const response = await axios.post("/api/login", { email });
			console.log(email);
			const verify = response.data.success;
			const message = response.data.message;

			console.log(verify, message);

			if (verify === true) {
				console.log("Login successful");
			} else {
				console.log(message);
			}
		} catch (error) {
			console.log("Error occurred during login:", error);
		}
	}

	async function verifyOtp() {
		try {
			const response = await axios.post("/api/verification", {
				otp,
			});
			console.log(otp);
			const verify = response.data.success;
			const message = response.data.message;
			if (verify) {
				console.log("OTP correct");
				router.push("/home");
			} else {
				console.log(message);
			}
		} catch (error) {
			console.log("Error occurred during OTP filling:", error);
		}
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOtp(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendOtp();
		setShowOtpInput(true);
	};

	const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		verifyOtp();
		console.log("OTP:", otp);
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6">
					Create Account with Kapa
				</h1>
				{!showOtpInput ? (
					<form onSubmit={handleSubmit} id="loginForm">
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={handleEmailChange}
							placeholder="Enter your email address"
							required
							className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
						/>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
						>
							Get OTP
						</button>
					</form>
				) : (
					<form onSubmit={handleOtpSubmit}>
						<input
							type="text"
							id="otp"
							name="otp"
							value={otp}
							onChange={handleOtpChange}
							placeholder="Enter OTP"
							required
							className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
						/>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
						>
							Verify OTP
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
