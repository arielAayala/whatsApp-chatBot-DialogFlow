import { createFlow } from "@builderbot/bot";
import { consultaFlow, welcomeFlow } from "./WelcomeFlow.js";

export default createFlow([welcomeFlow, consultaFlow]);
