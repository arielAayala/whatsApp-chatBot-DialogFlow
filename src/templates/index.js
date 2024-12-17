import { createFlow } from "@builderbot/bot";
import { conversacionalFlow, endFlow, welcomeFlow } from "./WelcomeFlow.js";
import { reclamosFlow } from "./ReclamosFlow.js";

export default createFlow([
	welcomeFlow,
	conversacionalFlow,
	endFlow,
	reclamosFlow,
]);
