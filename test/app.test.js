import "dotenv/config";

import { getNearestShops } from "../src/app";

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
});
