let apiEndpoint = `https://pokeapi.co/api/v2/pokemon/`;
const cardContainer = document.querySelector(".card-container")


let input = document.querySelector("#input");
document.querySelector(".btn-primary").addEventListener("click", async evt => {
	evt.preventDefault();
	let url = `${apiEndpoint}${input.value}`;
	let result = await getData(url);

	if (result) {
		render(result);
	}
});

async function getData(url) {
	try {
		let res = await fetch(url)

		// Guard clauses programming style
		if (!res.ok) {
			throw new Error(`Server Error`, { cause: res.status })
		}
		return await res.json()
	} catch (err) {
		console.log(err)
		renderErrorHandler(err)
	}
}

function renderErrorHandler(err) {
	cardContainer.classList.add("hidden")
	let p = document.createElement("p")

	if (err.cause === 404) {
		p.textContent = `Pokemon not found. Try another Pokemon.`
		cardContainer.insertAdjacentElement("afterend", p)
	}
	
	if (err.cause === 400) {
		p.textContent = `URL Issues`
		cardContainer.insertAdjacentElement("afterend", p)
	}

	if (err.cause === 500) {
		p.textContent = `Server Error. Try again Later.`
		cardContainer.insertAdjacentElement("afterend", p)
	}
}

function render(data) {
	const img = document.querySelector(".card-img-top");
	const pokemonName = document.querySelector(".pokemon-name");
	const weight = document.querySelector(".weight");
	const baseExp = document.querySelector(".base-experience");
	const abilities = document.querySelector(".abilities");

	// Simple solution to childElementCount
	abilities.textContent = ""
	img.src = data.sprites.front_default;
	pokemonName.textContent = capitalizeFirstLetter(data.name)
	weight.textContent = `Weight: ${data.weight}`
	baseExp.textContent = `Base Experience: ${data.base_experience}`

	if (pokemonName.textContent) {
		cardContainer.classList.remove("hidden")
	}
	
	// if (abilities.childElementCount) {
	// 	abilities.replaceChildren()
	// }

	data.abilities.forEach(a => {
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