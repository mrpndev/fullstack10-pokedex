let apiEndpoint = `https://pokeapi.co/api/v2/pokemon/`;

let input = document.querySelector("#input");
document.querySelector(".btn-primary").addEventListener("click", async evt => {
	evt.preventDefault();
	let url = `${apiEndpoint}${input.value}`;
	console.log(url);
	let result = await getData(url);
	render(result);
});

async function getData(url) {
	try {
		// let res = await fetch(url)
		// return await res.json()
		return await (await fetch(url)).json();
	} catch (err) {
		console.log(err);
	}
}

function render(data) {
	console.log(data);
	const img = document.querySelector(".card-img-top");
	const pokemonName = document.querySelector(".pokemon-name");
	const weight = document.querySelector(".weight");
	const baseExp = document.querySelector(".base-experience");
	const abilities = document.querySelector(".abilities");
	img.src = data.sprites.front_default;
	pokemonName.textContent = capitalizeFirstLetter(data.name)
}

function capitalizeFirstLetter(str) {
	return str
		.split(" ")
		.map(w => `${w[0].toUpperCase()}${w.slice(1)}`)
		.join(" ");
}

console.log(capitalizeFirstLetter("paul is really cool"));
