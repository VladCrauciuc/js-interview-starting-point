import getShopsList from "../src/helpers/getShopsList.js";

describe("getShopsList", () => {
	beforeEach(() => {
		jest.resetAllMocks();
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
