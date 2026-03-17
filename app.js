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
	console.dir(abilities.textContent)
	// Simple solution to childElementCount
	abilities.textContent = ""
	img.src = data.sprites.front_default;
	pokemonName.textContent = capitalizeFirstLetter(data.name)
	weight.textContent = `Weight: ${data.weight}`
	baseExp.textContent = `Base Experience: ${data.base_experience}`
	
	// if (abilities.childElementCount) {
	// 	abilities.replaceChildren()
	// }

	data.abilities.forEach(a => {
		console.log(a.ability.name)
		let aBtn = document.createElement("a")
		aBtn.classList.add("btn", "btn-primary")
		aBtn.textContent = capitalizeFirstLetter(a.ability.name)
		abilities.appendChild(aBtn)
	})
}

function capitalizeFirstLetter(str) {
	return str
		.split(" ")
		.map(w => `${w[0].toUpperCase()}${w.slice(1)}`)
		.join(" ");
}