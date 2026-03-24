import getToken from "../src/helpers/getToken.js";

describe("Token", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it("returns the token", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ token: "token" }),
			}),
		);

		expect(typeof (await getToken("tokenURL"))).toBe("string");
	});
	it("throws error for token fetch failure", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			}),
		);

		await expect(getToken("tokenURL")).rejects.toThrow(/Token error!/);
	});
});
