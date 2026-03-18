export default async function getShopsList(shopsUrl, token) {
	let res = await fetch(`${shopsUrl}?token=${token}`);
	if (!res.ok) {
		throw new Error("Coffee shop error!");
	}
	return await res.json();
}
