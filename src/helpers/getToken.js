export default async function getToken(url) {
	const res = await fetch(`${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		throw new Error("Token error!");
	}
	return (await res.json()).token;
}
