import { addKeyword, EVENTS } from "@builderbot/bot";
import { fetchDialogFlow } from "../config/dialogFlow.js";

/**
 * PLugin Configuration
 */

const welcomeFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx, ctxFn) => {
	const { state, gotoFlow } = ctxFn;

	let response = await fetchDialogFlow(ctx.body, ctx.from);

	console.log(response);

	if (!response) {
		return ctxFn.flowDynamic(
			"Oops, disculpe... Por el momento, no esta funcionando el sistema"
		);
	}

	await state.update({
		message:
			response.queryResult.fulfillmentMessages[1]?.payload.fields.response
				.structValue.fields || response.queryResult.fulfillmentText,
	});

	if (response.queryResult.intent.endInteraction) {
		return gotoFlow(endFlow);
	}
	return gotoFlow(conversacionalFlow);
});

const conversacionalFlow = addKeyword(EVENTS.ACTION).addAction(
	async (ctx, { state, flowDynamic }) => {
		const currentState = state.getMyState();
		try {
			if (currentState.message.type?.stringValue == "mainMenu") {
				await flowDynamic([
					{
						header: "Menu",
						body: currentState.message.response?.stringValue,
						buttons: currentState.message.button?.listValue.values.map((i) => {
							return { body: i.stringValue };
						}),
					},
				]);
			} else if (currentState.message.type?.stringValue == "areasMenu") {
				await flowDynamic([
					{
						header: "Menu",
						body: currentState.message.response?.stringValue,
					},
				]);
			} else {
				await flowDynamic(currentState.message);
			}
		} catch (error) {
			await flowDynamic("Oops... Ocurrio un error");
		}
	}
);

const endFlow = addKeyword(EVENTS.ACTION).addAction(
	async (ctx, { state, flowDynamic }) => {
		const currentState = state.getMyState();
		try {
			await flowDynamic([
				{
					header: "End",
					body:
						currentState.message.response?.stringValue || currentState.message,
					buttons: [{ body: "Volver al Inicio" }],
				},
			]);
		} catch (error) {
			await flowDynamic("Oops... Ocurrio un error");
		}
	}
);

export { welcomeFlow, conversacionalFlow, endFlow };
