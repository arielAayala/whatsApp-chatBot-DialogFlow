import { addKeyword, EVENTS } from "@builderbot/bot";

const mediaFlow = addKeyword(EVENTS.MEDIA).addAnswer(
	"Por el momento, solo entiendo mensajes escritos.\nNo soy capaz recibir imágenes 😢"
);

const audioFlow = addKeyword(EVENTS.VOICE_NOTE).addAnswer(
	"Por el momento, solo entiendo mensajes escritos.\nNo soy capaz recibir audios 😢"
);

const locationFlow = addKeyword(EVENTS.LOCATION).addAnswer(
	"Por el momento, solo entiendo mensajes escritos.\nNo soy capaz recibir ubicaciones 😢"
);

const documentFlow = addKeyword(EVENTS.DOCUMENT).addAnswer(
	"Por el momento, solo entiendo mensajes escritos.\nNo soy capaz recibir documentos 😢"
);

export { mediaFlow, audioFlow, locationFlow, documentFlow };
