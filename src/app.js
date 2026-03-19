import getToken from "./helpers/getToken.js";
import getShopsList from "./helpers/getShopsList.js";
import { endpoints } from "../api/endpoints.js";

function distance([x1, y1], [x2, y2]) {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * @param {Object} position
 * @param {Number} position.x
 * @param {Number} position.y
 *
 * @returns {Array<position>}
 */

export async function getNearestShops(position) {
	try {
		let token = await getToken(endpoints.tokenEndpoint);
		let shops = await getShopsList(endpoints.shopsEndpoint, token);

		return shops
			.map((shop) => ({
				shopName: shop.name,
				distance: distance([position.x, position.y], [shop.x, shop.y]),
			}))
			.sort((a, b) => a.distance - b.distance)
			.slice(0, 3);
	} catch (error) {
		console.error(error);
		return [];
	}
}
