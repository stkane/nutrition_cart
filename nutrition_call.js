const registrar = document.getElementById('registrar');
const input = document.getElementById('foodquest');
const ul = document.getElementById('foodList');
const shoppinglist = document.getElementById('shoppingList');
let text = '';


console.log(registrar);

let rawFoodData = [];
let nutritionData = [];

function createLI(text) {
	const li = document.createElement('li');
	li.classList.add("ph3", "pv3", "bb", "b--light-silver", "hover-light-pink")
	li.textContent = text;
	ul.appendChild(li);
	return li;
}

registrar.addEventListener('submit', (e) => {
	while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
	};
	topFive = [];
	e.preventDefault();
	text = input.value;
	apiCall(text);
	input.value = '';
});

ul.addEventListener('click', (e) => {
	shoppinglist.appendChild(e.target);
	nutritionCall(e.target.id);
	ul.removeChild(e.target);

});

let body = '';

function ndInfo(input) {
 	this.name = input.name;
	this.id = input.ndbno;
 }

// function constructNutrition(input) {

// }

function apiCall(qText) {
	d3.json(`https://api.nal.usda.gov/ndb/search/?format=json&q=${qText}&sort=n&ds=Standard%20Reference&offset=0&api_key=DEMO_KEY`, function(data){
	    responseArr = data.list.item;
	    qMatchable = qText.toLowerCase() + ',';
	    for(let i = 0; i < 6; i++) {
	    	rawFoodData[i] = new ndInfo(data.list.item[i]);
	    };    
		for(let i = 0; i < rawFoodData.length; i++) {
			const li = createLI(rawFoodData[i].name);
			li.setAttribute("id", rawFoodData[i].id)
			ul.appendChild(li);	
		};
	});
}

function nutritionCall(foodId) {
	d3.json(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${foodId}&type=f&format=json&api_key=DEMO_KEY`, function(data) {
		justFoodInfo = data.foods[0].food;
		nutritionData.unshift(justFoodInfo);
		index = nutritionData.length - 1;
		getMeasures(index);
	})
}

function getMeasures(index) {
	measuresNum = nutritionData[index].nutrients[0].measures.length;
	labelsArr = [];
	for(let i = 0; i < measuresNum; i++) {
		labelsArr.push(nutritionData[i].nutrients[0].measures[i].label);
	};
	console.log(labelsArr);
}










