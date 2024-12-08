import { addKeyword, EVENTS } from "@builderbot/bot";
import { textQuery } from "../config/dialogFlow.js";

const welcomeFlow = addKeyword(EVENTS.WELCOME)
	.addAnswer([`🙌 Hola`, "Soy un asistente virtual😁"])
	.addAnswer(
		[
			"Te pediré algunos datos",
			"Necesitaré que escribas solamente nombre completo para continuar",
		],
		{ capture: true },
		async (ctx, { state, flowDynamic }) => {
			const { body, from } = ctx;
			await state.update({ nombreCompleto: body, numeroTelefono: from });
			await flowDynamic("Gracias por darme tu nombre");
		}
	)
	.addAnswer(
		[
			"Necesitaré que escribas solamente tu documento completo sin puntos para continuar",
		],
		{ capture: true },
		async (ctx, { state, flowDynamic }) => {
			const { body } = ctx;
			await state.update({ documento: body });
			await flowDynamic("Gracias por darme tu nombre");
		}
	)

	.addAnswer(["¿En que puedo ayudarte?"], {
		capture: true,
		buttons: [
			{ body: "Reclamo" },
			{ body: "Sugerencia" },
			{ body: "Consulta" },
		],
	});

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
