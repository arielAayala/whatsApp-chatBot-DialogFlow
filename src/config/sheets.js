import { google } from "googleapis";

const sheets = google.sheets("v4");

export const insertInSheets = async (
	{ nombreCompleto, documento, area, motivo, telefono },
	nombreDeHoja
) => {
	try {
		const { GOOGLE_APPLICATION_CREDENTIALS_JSON, SPREADSHEET_ID } = process.env;
		// Autenticación con Google Sheets
		const auth = new google.auth.GoogleAuth({
			credentials: JSON.parse(GOOGLE_APPLICATION_CREDENTIALS_JSON), // Usa el JSON de las credenciales
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});

		const client = await auth.getClient();

		// Preparar los valores para insertar en Google Sheets

		let codigoReclamoGenerado = (new Date().now() + Math.random())
			.toString()
			.slice(-8);

		const valores = [
			[
				documento,
				nombreCompleto,
				telefono,
				new Date().toLocaleString("es-AR", {
					timeZone: "America/Argentina/Buenos_Aires",
				}),
				area,
				motivo,
				codigoReclamoGenerado,
			],
		];

		// Escribir en Google Sheets
		await sheets.spreadsheets.values.append({
			auth: client,
			spreadsheetId: SPREADSHEET_ID,
			range: `${nombreDeHoja}!A:G`, // Asegúrate de que el rango sea correcto
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: valores,
			},
		});

		if (nombreDeHoja == "RECLAMOS") {
			return `Tu reclamo se han guardado correctamente.\nTu codigo es: ${codigoReclamoGenerado} \nPronto se comunicarán contigo`;
		} else {
			return "Tu comentarios se han guardado correctamente. \nPronto se comunicarán contigo";
		}
		/* // *** INSERTAR DATOS EN MySQL ***
		const sql = `INSERT INTO registros (nombre, documento, area) VALUES (?, ?, ?)`;
		await pool.query(sql, [nombreCompleto, documento, additionalData]);

		console.log("Datos guardados en MySQL.");
		res.status(200).end(); */
	} catch (error) {
		return "Ocurrio un error al guardar. \nIntentalo más tarde";
	}
};
