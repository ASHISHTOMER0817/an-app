import React from "react";

function Footer({classList}) {
	return (
		<footer className={`bg-slate-100 text-black  py-6 ${classList}`}>
			<div className="container mx-auto flex px-12 justify-between items-center">
				<div className="text-left">
					<h3 className="text-lg font-semibold">Explore</h3>
					<ul className="mt-2">
						<li className="mb-2">About</li>
						<li className="mb-2">Contact</li>
						<li className="mb-2">Terms of Service</li>
						<li className="mb-2">Privacy Policy</li>
					</ul>
				</div>
				<div className="text-center">
					<h3 className="text-lg font-semibold">
						Categories
					</h3>
					<ul className="mt-2">
						<li className="mb-2">Technology</li>
						<li className="mb-2">Finance</li>
						<li className="mb-2">Healthcare</li>
						<li className="mb-2">Education</li>
					</ul>
				</div>
				<div className="text-right">
					<h3 className="text-lg font-semibold">Connect</h3>
					<ul className="mt-2">
						<li className="mb-2">LinkedIn</li>
						<li className="mb-2">Twitter</li>
						<li className="mb-2">Facebook</li>
						<li className="mb-2">Instagram</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
