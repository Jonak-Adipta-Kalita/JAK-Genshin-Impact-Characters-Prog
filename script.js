const dex = document.getElementById('dex');
const fetchCharacters = async () => {
    const url = "/characters.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const characters = data.character.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
	}));
	displayCharacter(characters);
};

const displayCharacter = (character) => {
    const characterssHTMLString = character
        .map((charactere) => (`
			<li class="card" onclick="selectCharacter(${charactere.id})">
				<img class="card-image" src="${charactere.image}"/>
				<h2 class="card-title">${charactere.id}. ${charactere.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = characterssHTMLString;
};

const selectCharacter = async (id) => {
	const url = `\characters.json`;
	const res = await fetch(url);
	const charactere = await res.json();
	displayPopup(charactere, id);
};

const displayPopup = (charactere, id) => {
	const image = `./images/${charactere.character[id - 1].image}`;
	let nationHTMLString;
	let special_dishHTMLString;
	
	if (charactere.character[id - 1].nation === null) {
		nationHTMLString = "";
	} else {
		nationHTMLString = `<small>Nation: </small>${charactere.character[id - 1].nation}`;
	}
	
	if (charactere.character[id - 1].special_dish === null) {
		special_dishHTMLString = "";
	} else {
		special_dishHTMLString = `<small>Special Dish: </small>${charactere.character[id - 1].special_dish}`;
	}

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${charactere.character[id - 1].id + 1}. ${charactere.character[id - 1].name}
				</h2>
				<p><small>Sex: </small>${charactere.character[id - 1].sex}</p>
				<p><small>Weapon: </small>${charactere.character[id - 1].weapon}</p>
				<p><small>Element: </small>${charactere.character[id - 1].element}</p>
				<p><small>Constellation: </small>${charactere.character[id - 1].constellation}</p>
				<p><small>Birthday: </small>${charactere.character[id - 1].birthday}</p>
				<p>${nationHTMLString}</p>
				<p>${special_dishHTMLString}</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchCharacters();
