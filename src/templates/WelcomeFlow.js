import { addKeyword, EVENTS } from "@builderbot/bot";
import { textQuery } from "../config/dialogFlow.js";

/**
 * PLugin Configuration
 */

const welcomeFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx, ctxFn) => {
	const { state, gotoFlow } = ctxFn;

	let response = await textQuery(ctx.body, ctx.from);

	console.log(response);

	if (!response[0].queryResult.fulfillmentText) {
		return ctxFn.flowDynamic(
			"Oops, disculpe... Por el momento, no esta funcionando el sistema"
		);
	}
	await state.update({ answer: response[0].queryResult.fulfillmentText });
	return gotoFlow(dialogFlow);
});

const dialogFlow = addKeyword(EVENTS.ACTION).addAction(
	async (_, { state, flowDynamic }) => {
		const currentState = state.getMyState();

		await flowDynamic(currentState.answer);
	}
);

export { welcomeFlow, dialogFlow };
