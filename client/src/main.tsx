import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
const Auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN || "AUTH0-DOMAIN";
const Auth0ClientId = import.meta.env.VITE_AUTH0_ID || "AUTH0-CLIENT-ID";
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Auth0Provider
			domain={Auth0Domain}
			clientId={Auth0ClientId}
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}
		>
			<App />
		</Auth0Provider>
		,
	</React.StrictMode>
);
