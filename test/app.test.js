import "dotenv/config";

import { getNearestShops } from "../src/app";
import getToken from "../src/helpers/getToken.js";
import getShopsList from "../src/helpers/getShopsList.js";

describe("App", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it("should return an array when the input is valid", async () => {
		await getNearestShops({ lat: 0, lng: 0 }).then((result) => {
			expect(Array.isArray(result)).toBe(true);
		});
	});
	it("should catch thrown errors", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			}),
		);
		const consoleObserver = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		await getNearestShops({ x: 0, y: 0 });

		expect(consoleObserver).toHaveBeenCalled();
	});

	it("should return the token", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ token: "token" }),
			}),
		);

		expect(typeof (await getToken("tokenURL"))).toBe("string");
	});
	it("should throw error for token fetch failure", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			}),
		);

		await expect(getToken("tokenURL")).rejects.toThrow(/Token error!/);
	});

	it("should return array of all shops", async () => {
		global.fetch = jest.fn().mockResolvedValueOnce({
			ok: true,
			json: () =>
				Promise.resolve([
					{
						id: 1,
						created_at: "2022-01-01",
						updated_at: "2022-01-01",
						name: "First Coffee Shop",
						x: 1,
						y: 1,
					},
				]),
		});

		const shopsList = await getShopsList("shopsUrl", "token");
		expect(Array.isArray(shopsList)).toBe(true);
	});
	it("should throw error for shops fetch failure", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			}),
		);

		await expect(getShopsList("shopsUrl", "token")).rejects.toThrow(
			/Coffee shop error!/,
		);
	});
});
