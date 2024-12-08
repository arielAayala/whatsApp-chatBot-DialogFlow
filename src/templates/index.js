import { createFlow } from "@builderbot/bot";
import { dialogFlow, welcomeFlow } from "./WelcomeFlow.js";

export default createFlow([welcomeFlow, dialogFlow]);
