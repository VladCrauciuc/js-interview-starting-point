import "dotenv/config";
import { getNearestShops } from "./app.js";

function validateInput(position) {
	if (process.argv.length !== 4) {
		console.log(
			"Warning: Invalid number of arguments. Please provide only x and y coordinates.",
		);
		return false;
	}
	if (isNaN(position.x) || isNaN(position.y)) {
		console.log(
			"Warning: Invalid input. Please provide valid numbers for x and y coordinates.",
		);
		return false;
	}
	return true;
}

async function main(params) {
	const position = {
		x: Number(process.argv[2]?.replace(/,/g, ".")),
		y: Number(process.argv[3]?.replace(/,/g, ".")),
	};

	if (!validateInput(position)) return;

	const nearestShops = await getNearestShops(position);

	if (nearestShops.length === 0) {
		console.log("No shops found.");
		process.exit(1);
	}
	console.log("```");
	nearestShops?.forEach((shop) => {
		console.log(`${shop.shopName}: ${shop.distance.toFixed(4)}`);
	});
	console.log("```");
}

main();
