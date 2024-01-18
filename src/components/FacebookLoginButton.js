import React, { useEffect, useState } from "react";

const FacebookLoginButton = ({ setProfileName }) => {
  let FB;
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// Load the required SDK asynchronously for facebook
		(function (d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		})(document, "script", "facebook-jssdk");

		window.fbAsyncInit = function () {
			FB.init({
				appId: "1048021373080818",
				cookie: true,
				xfbml: true,
				version: "v18.0",
			});

			FB.getLoginStatus(function (response) {
				statusChangeCallback(response);
			});
		};
	}, []);

	const statusChangeCallback = (response) => {
		console.log("Status changed:", response);
	};

	const handleLogin = () => {
		FB.login(
			function (response) {
				if (response.authResponse) {
					console.log("Welcome!  Fetching your information.... ");
					FB.api("/me", function (response) {
						console.log("Good to see you, " + response.name + ".");
            setProfileName(response.name);
						setIsLoggedIn(true);
					});
				} else {
					console.log("User cancelled login or did not fully authorize.");
				}
			},
			{ scope: "email,public_profile" }
		);
	};

	const handleLogout = () => {
		FB.logout(function (response) {
			console.log("Logged out!");
      setProfileName("");
			setIsLoggedIn(false);
		});
	};

	return (
		<div>
			{isLoggedIn ? (
				<button onClick={handleLogout}>Logout</button>
			) : (
				<button onClick={handleLogin}>Login</button>
			)}

		</div>
	);
};

export default FacebookLoginButton;
