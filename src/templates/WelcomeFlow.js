import { addKeyword, EVENTS } from "@builderbot/bot";
import { textQuery } from "../config/dialogFlow.js";

/**
 * PLugin Configuration
 */

const welcomeFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx, ctxFn) => {
	const { state, gotoFlow } = ctxFn;

	let response = await textQuery(ctx.body, ctx.from);

	if (!response) {
		return ctxFn.flowDynamic(
			"Oops, disculpe... Por el momento, no esta funcionando el sistema"
		);
	}

	await state.update({
		message:
			response[0].queryResult.fulfillmentMessages[1]?.payload.fields.response
				.structValue.fields || response[0].queryResult.fulfillmentText,
	});
	return gotoFlow(dialogFlow);
});

const dialogFlow = addKeyword(EVENTS.ACTION).addAction(
	async (_, { state, flowDynamic }) => {
		try {
			const currentState = state.getMyState();

			await flowDynamic(
				currentState.message.response?.stringValue || currentState.message
			);
			if (currentState.message.question?.stringValue) {
				await flowDynamic([
					{
						body: currentState.message.question?.stringValue,
						buttons: currentState.message.button?.listValue.values.map((i) => {
							return { body: i.stringValue };
						}),
					},
				]);
			}
		} catch (error) {
			await flowDynamic("Oops... Ha ocurrido un error");
		}
	}
);

export { welcomeFlow, dialogFlow };
