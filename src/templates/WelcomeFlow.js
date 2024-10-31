import { addKeyword, EVENTS } from "@builderbot/bot";
import { textQuery } from "../config/dialogFlow.js";

const welcomeFlow = addKeyword(EVENTS.WELCOME).addAnswer(
	[`🙌 Hola`, "Soy un asistente virtual😁", "¿En que puedo ayudarte?"],
	{
		capture: true,
		buttons: [
			{ body: "Reclamo" },
			{ body: "Sugerencia" },
			{ body: "Consulta" },
		],
	}
);

const consultaFlow = addKeyword("consulta").addAnswer(
	"Escribe tu consulta",
	{ capture: true },
	async (ctx, { flowDynamic }) => {
		const { body, from } = ctx;

		const response = await textQuery(body, from);
		await flowDynamic(response);
	}
);

export { welcomeFlow, consultaFlow };
