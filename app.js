let apiEndpoint = `https://pokeapi.co/api/v2/pokemon/ditto`
async function getData(url) {
	try {
		let res = await fetch(url)
		let data = await res.json()
		console.log(data)
	} catch(err) {
		console.log(err)
	}
}

getData(apiEndpoint)

