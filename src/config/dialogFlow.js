import { SessionsClient } from "dialogflow/src/v2beta1/index.js";
import fs from "fs/promises";

async function loadConfig() {
	try {
		const data = await fs.readFile(
			process.env.GOOGLE_APPLICATION_CREDENTIALS,
			"utf-8"
		);

		return JSON.parse(data);
	} catch (error) {
		console.error("Error reading config file:", error);
		throw error;
	}
}

async function initialize() {
	const config = await loadConfig();

	const projectId = config.project_id;

	const credentials = {
		client_email: config.client_email,
		private_key: config.private_key,
	};

	const sessionClient = new SessionsClient({ projectId, credentials });

	return { sessionClient, config };
}

export const textQuery = async (userText, userId) => {
	try {
		const { sessionClient, config } = await initialize();
		const sessionPath = sessionClient.sessionPath(
			config.project_id,
			(config.sessionId ?? "testing-session") + userId
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

		const response = await sessionClient.detectIntent(request);

		return response;
	} catch (error) {
		return error;
	}
};
