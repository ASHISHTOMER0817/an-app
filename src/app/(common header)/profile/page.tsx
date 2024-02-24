'use client'
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Footer from "../../components/footer";
import { useRouter } from "next/navigation";

const Profile = () => {

	const router = useRouter()


	interface User {
		name: string;
		mobile: string;
		github: string;
		linkedin: string;
		// propic: File | null;
		// resume: File | null; // File type for resume input
		schoolName: string;
		startDate: string;
		endDate: string;
		projectName: string;
		projectLink: string;
		companyName: string;
		companyLink: string;
		role: string;
		jobStartDate: string;
		jobEndDate: string;
		// coverLetter: File | null; // File type for cover letter input
	}

	const [user, setUser] = useState<User>({
		name: "",
		mobile: "",
		github: "",
		linkedin: "",
		// propic: null,
		// resume: null,
		schoolName: "",
		startDate: "",
		endDate: "",
		projectName: "",
		projectLink: "",
		companyName: "",
		companyLink: "",
		role: "",
		jobStartDate: "",
		jobEndDate: "",
		// coverLetter: null,
	});

	const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setUser((prevState) => ({
				...prevState,
				resume: e.target.files[0],
			}));
		}
	};

	const handlePropicChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setUser((prevState) => ({
				...prevState,
				propic: e.target.files[0],
			}));
		}
	};

	const handleCoverLetterChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setUser((prevState) => ({
				...prevState,
				coverLetter: e.target.files[0],
			}));
		}
	};


	async function allCredentials() {
		try {
			const response = await axios.post("/api/profile", { user });
			console.log({ user });
			const verify = response.data.success;
			const message = response.data.message;

			console.log(verify, message);

			if (verify === true) {
				console.log("uploaded", verify);
				router.push('/home')
			} else {
				console.log(message, verify);
			}
		} catch (error) {
			console.log("Error occurred during storing userinfo:", error);
		}
	}

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get("/api/userData");
				const apiResult = response.data.Headers;
				console.log("the api result is-", apiResult);
				console.log("the response data is-", response.data);
				console.log("the name data is-", apiResult.name.value);
				console.log(
					"the mobile data is-",
					apiResult.mobile.value
				);
				console.log(
					"the linkedin data is-",
					apiResult.linkedin.value
				);
				console.log(
					"the schoolName data is-",
					apiResult.schoolName.value
				);
				console.log(
					"the startDate data is-",
					apiResult.startDate.value
				);
				console.log(
					"the endDate data is-",
					apiResult.endDate.value
				);
				console.log(
					"the projectName data is-",
					apiResult.projectName.value
				);
				console.log(
					"the projectLink data is-",
					apiResult.projectLink.value
				);
				console.log(
					"the companyName data is-",
					apiResult.companyName.value
				);
				console.log(
					"the companyLink data is-",
					apiResult.companyLink.value
				);
				console.log("the role data is-", apiResult.role.value);
				console.log(
					"the jobStartDate data is-",
					apiResult.jobStartDate.value
				);
				console.log(
					"the jobEndDate data is-",
					apiResult.jobEndDate.value
				);

				setUser({
					name: apiResult.name.value || undefined,
					mobile: apiResult.mobile.value || undefined,
					github: apiResult.github.value || undefined,
					linkedin: apiResult.linkedin.value || undefined,
					// propic: apiResult.propic.value || undefined,
					// resume: apiResult.resume.value || undefined,
					schoolName:
						apiResult.schoolName.value || undefined,
					startDate: apiResult.startDate.value || undefined,
					endDate: apiResult.endDate.value || undefined,
					projectName:
						apiResult.projectName.value || undefined,
					projectLink:
						apiResult.projectLink.value || undefined,
					companyName:
						apiResult.companyName.value || undefined,
					companyLink:
						apiResult.companyLink.value || undefined,
					role: apiResult.role.value || undefined,
					jobStartDate:
						apiResult.jobStartDate.value || undefined,
					jobEndDate:
						apiResult.jobEndDate.value || undefined,
					// coverLetter: apiResult.coverLetter.value || undefined,
				});
			} catch (error) {
				console.log(
					"Error occurred while getting userInfo:",
					error
				);
			}
		}
		getData();
	}, []);

	return (
		<>
			<form>
				<div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
					<h5 className="text-lg font-semibold mb-4">
						Personal Details:
					</h5>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block font-medium"
							>
								Name:
							</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Name"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.name}
								onChange={(e) => {
									setUser({
										...user,
										name: e.target
											.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="mobile"
								className="block font-medium"
							>
								Mobile:
							</label>
							<input
								type="number"
								id="mobile"
								name="mobile"
								placeholder="Mobile"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.mobile}
								onChange={(e) => {
									setUser({
										...user,
										mobile: e.target
											.value,
									});
								}}
							/>
						</div>
					</div>

					<h5 className="text-lg font-semibold my-4">
						Online Profiles:
					</h5>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="mb-4">
							<label
								htmlFor="github"
								className="block font-medium"
							>
								GitHub URL:
							</label>
							<input
								type="text"
								id="github"
								name="github"
								placeholder="GitHub URL"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.github}
								onChange={(e) => {
									setUser({
										...user,
										github: e.target
											.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="linkedin"
								className="block font-medium"
							>
								LinkedIn URL:
							</label>
							<input
								type="text"
								id="linkedin"
								name="linkedin"
								placeholder="LinkedIn URL"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.linkedin}
								onChange={(e) => {
									setUser({
										...user,
										linkedin: e.target
											.value,
									});
								}}
							/>
						</div>
					</div>

					<h5 className="text-lg font-semibold my-4">
						Profile Picture:
					</h5>
					<div className="mb-4">
						<label
							htmlFor="propic"
							className="block font-medium"
						>
							Profile Picture:
						</label>
						<input
							type="file"
							id="propic"
							name="propic"
							className="border-gray-300"
							onChange={handlePropicChange}
						/>
					</div>

					<h5 className="text-lg font-semibold my-4">
						Resume:
					</h5>
					<div className="mb-4">
						<label
							htmlFor="resume"
							className="block font-medium"
						>
							Resume:
						</label>
						<input
							type="file"
							id="resume"
							name="resume"
							className="border-gray-300"
							onChange={handleResumeChange}
						/>
					</div>
				</div>

				<div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
					<h5 className="text-lg font-semibold my-4">
						Education Details:
					</h5>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="mb-4">
							<label
								htmlFor="type"
								className="block font-medium"
							>
								Type:
							</label>
							<select
								id="type"
								name="type"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
							>
								<option value="School">
									School
								</option>
								<option value="College">
									College
								</option>
							</select>
						</div>
						<div className="mb-4">
							<label
								htmlFor="schoolName"
								className="block font-medium"
							>
								School/College Name:
							</label>
							<input
								type="text"
								id="schoolName"
								name="schoolName"
								placeholder="School/College Name"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.schoolName}
								onChange={(e) => {
									setUser({
										...user,
										schoolName:
											e.target
												.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="startDate"
								className="block font-medium"
							>
								Start Date:
							</label>
							<input
								type="date"
								id="startDate"
								name="startDate"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.startDate}
								onChange={(e) => {
									setUser({
										...user,
										startDate:
											e.target
												.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="endDate"
								className="block font-medium"
							>
								End Date:
							</label>
							<input
								type="date"
								id="endDate"
								name="endDate"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.endDate}
								onChange={(e) => {
									setUser({
										...user,
										endDate: e.target
											.value,
									});
								}}
							/>
						</div>
					</div>
				</div>

				<div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
					<h5 className="text-lg font-semibold my-4">
						Project Details:
					</h5>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="mb-4">
							<label
								htmlFor="projectName"
								className="block font-medium"
							>
								Project Name:
							</label>
							<input
								type="text"
								id="projectName"
								name="projectName"
								placeholder="Project Name"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.projectName}
								onChange={(e) => {
									setUser({
										...user,
										projectName:
											e.target
												.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="projectDescription"
								className="block font-medium"
							>
								Project Description:
							</label>
							<textarea
								rows={3}
								id="projectDescription"
								name="projectDescription"
								placeholder="Project Description"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="projectType"
								className="block font-medium"
							>
								Project Type:
							</label>
							<select
								id="projectType"
								name="projectType"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
							>
								<option value="Solo Project">
									Solo Project
								</option>
								<option value="Group Project">
									Group Project
								</option>
							</select>
						</div>
						<div className="mb-4">
							<label
								htmlFor="projectLink"
								className="block font-medium"
							>
								Project Link:
							</label>
							<input
								type="text"
								id="projectLink"
								name="projectLink"
								placeholder="Project Link"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.projectLink}
								onChange={(e) => {
									setUser({
										...user,
										projectLink:
											e.target
												.value,
									});
								}}
							/>
						</div>
					</div>
				</div>

				<div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
					<h5 className="text-lg font-semibold my-4">
						Past Experience Details:
					</h5>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="mb-4">
							<label
								htmlFor="experienceType"
								className="block font-medium"
							>
								Experience Type:
							</label>
							<select
								id="experienceType"
								name="experienceType"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
							>
								<option value="Internship">
									Internship
								</option>
								<option value="Job">Job</option>
							</select>
						</div>
						<div className="mb-4">
							<label
								htmlFor="companyName"
								className="block font-medium"
							>
								Company Name:
							</label>
							<input
								type="text"
								id="companyName"
								name="companyName"
								placeholder="Company Name"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.companyName}
								onChange={(e) => {
									setUser({
										...user,
										companyName:
											e.target
												.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="companyLink"
								className="block font-medium"
							>
								Company Link:
							</label>
							<input
								type="text"
								id="companyLink"
								name="companyLink"
								placeholder="Company Link"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.companyLink}
								onChange={(e) => {
									setUser({
										...user,
										companyLink:
											e.target
												.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="role"
								className="block font-medium"
							>
								Role:
							</label>
							<input
								type="text"
								id="role"
								name="role"
								placeholder="Role"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.role}
								onChange={(e) => {
									setUser({
										...user,
										role: e.target
											.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="jobStartDate"
								className="block font-medium"
							>
								Start Date:
							</label>
							<input
								type="date"
								id="jobStartDate"
								name="jobStartDate"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.jobStartDate}
								onChange={(e) => {
									setUser({
										...user,
										jobStartDate:
											e.target
												.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="jobEndDate"
								className="block font-medium"
							>
								End Date:
							</label>
							<input
								type="date"
								id="jobEndDate"
								name="jobEndDate"
								className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
								value={user.jobEndDate}
								onChange={(e) => {
									setUser({
										...user,
										jobEndDate:
											e.target
												.value,
									});
								}}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="coverLetter"
								className="block font-medium"
							>
								Cover Letter:
							</label>
							<input
								type="file"
								id="coverLetter"
								name="coverLetter"
								className="border-gray-300"
								onChange={
									handleCoverLetterChange
								}
							/>
						</div>
					</div>
				</div>
				<div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
					<div className="flex justify-between mt-8">
						<button
							type="button"
							className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
							onClick={allCredentials}
						>
							Submit
						</button>
						<button
							type="button"
							className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
						>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default Profile;

