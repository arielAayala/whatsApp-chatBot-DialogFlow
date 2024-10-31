import { createBot } from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { config } from "./config/index.js";
import { provider } from "./provider/index.js";
import templates from "./templates/index.js";

const PORT = config.PORT;

const main = async () => {
	const { httpServer } = await createBot({
		flow: templates,
		provider: provider,
		database: new Database(),
	});

	httpServer(PORT);
};

main();
