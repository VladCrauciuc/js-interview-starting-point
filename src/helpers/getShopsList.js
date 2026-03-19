export default async function getShopsList(shopsUrl, token) {
	const retries = 3;
	const delay = 1000;

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			const res = await fetch(`${shopsUrl}?token=${token}`);

			if (!res.ok) {
				if (res.status >= 500 && attempt < retries) {
					throw new Error("Server error, retrying...");
				}
				throw new Error(`Request failed: ${res.status} - ${res.statusText}`);
			}

			return res.json();
		} catch (error) {
			if (attempt === retries) {
				throw error;
			}

			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}
}
