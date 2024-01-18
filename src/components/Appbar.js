import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookLoginButton from "./FacebookLoginButton";
import { useState } from "react";

export default function Appbar() {
	const [profileName, setProfileName] = useState("");

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						<div>
							{profileName
								? (`Welcome ${profileName}`)
								: (`Spring Boot React Fullstack Application`)}slt /
						</div>
					</Typography>
					<FacebookLoginButton setProfileName={setProfileName} />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
