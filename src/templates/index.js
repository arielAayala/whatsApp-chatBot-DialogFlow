import { createFlow } from "@builderbot/bot";
import { conversacionalFlow, endFlow, welcomeFlow } from "./WelcomeFlow.js";

export default createFlow([welcomeFlow, conversacionalFlow, endFlow]);
