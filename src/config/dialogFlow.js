import { SessionsClient } from "dialogflow/src/v2beta1/index.js";
import "dotenv/config";

export const fetchDialogFlow = async (userText, userId) => {
	try {
		const { project_id, client_email, private_key, session_id } = process.env;

		const sessionClient = new SessionsClient({
			projectId: project_id,
			credentials: {
				client_email: client_email,
				private_key: private_key.replace(/\\n/g, "\n"), // Reemplaza los saltos de línea
			},
		});

		const sessionPath = sessionClient.sessionPath(
			project_id,
			(session_id || "testing-session") + userId
		);

		const request = {
			session: sessionPath,
			queryInput: {
				text: {
					text: userText,
					languageCode: "es",
				},
			},
		};

		const [response] = await sessionClient.detectIntent(request);

		return response;
	} catch (error) {
		console.error("Error fetching Dialogflow response:", error.message);
		throw error;
	}
};
