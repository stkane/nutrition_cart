const registrar = document.getElementById('registrar');
const input = document.getElementById('foodquest');
const ul = document.getElementById('foodList');
const shoppinglist = document.getElementById('shoppingList');
let text = '';
const calcNutritionButton = document.getElementById('calcNutrition');



console.log(registrar);

let rawFoodData = [];
let nutritionData = [];
let processedNutritionData = [];

calcNutritionButton.addEventListener('click', (e) => {
	calcNutritionFunc(nutritionData)
});

function calcNutritionFunc(data) {
	daily_nutrition_totals = daily_nutrition;
	for(let i = 0; i < daily_nutrition_totals.length; i++) {
		nutrient_id_local = daily_nutrition_totals.dvs[i].nutrient_id;
		for (let j = 0; j < nutritionData.length; j++) {
			food_nutrients = nutritionData[j].nutrients;
		}
			for (let k = 0; k < food_nutrients.length; k++) {
				
			};
	};
}

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
	d3.json(`https://api.nal.usda.gov/ndb/search/?format=json&q=${qText}&sort=r&ds=Standard%20Reference&offset=0&api_key=DEMO_KEY`, function(data){
	    responseArr = data.list.item;
	    
	    qMatchable = qText.toLowerCase() + ',';
	    for(let i = 0; i < 6; i++) {
	    	rawFoodData[i] = new ndInfo(responseArr[i]);
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


const daily_nutrition = {
	"dvs": [
		{
			"name": "total_fat",
			"uom": "g",
			"dv": 65,
			"nutrient_id": 204
		},
		{
			"name": "saturated_fat",
			"uom": "g",
			"dv": 20,
			"nutrient_id": 606
		},
		{
			"name": "cholesterol",
			"uom": "mg",
			"dv": 300,
			"nutrient_id": 601 
		},
		{
			"name": "sodium",
			"uom": "mg",
			"dv": 2400,
			"nutrient_id": 307 
		},
		{
			"name": "potassium",
			"uom": "mg",
			"dv": 3500,
			"nutrient_id": 306  
		},
		{
			"name": "total_carbs",
			"uom": "g",
			"dv": 300,
			"nutrient_id": 205 
		},
		{
			"name": "fiber",
			"uom": "g",
			"dv": 25,
			"nutrient_id": 291  
		},
		{
			"name": "protein",
			"uom": "g",
			"dv": 50,
			"nutrient_id": 203  
		},
		{
			"name": "vitamin_a",
			"uom": "iu",
			"dv": 5000,
			"nutrient_id": 318 
		},
		{
			"name": "vitamin_c",
			"uom": "mg",
			"dv": 60,
			"nutrient_id": 401 
		},
		{
			"name": "calcium",
			"uom": "mg",
			"dv": 1000,
			"nutrient_id": 301 
		},
		{
			"name": "iron",
			"uom": "mg",
			"dv": 18,
			"nutrient_id": 303 
		},
		{
			"name": "vitamin_d",
			"uom": "iu",
			"dv": 400,
			"nutrient_id": 324 
		},
		{
			"name": "vitamin_e",
			"uom": "iu",
			"dv": 30,
			"nutrient_id": 323  
		},
		{
			"name": "vitamin_k",
			"uom": "µg",
			"dv": 80,
			"nutrient_id": 430 
		},
		{
			"name": "thiamin",
			"uom": "mg",
			"dv": 1.5,
			"nutrient_id": 404 
		},
		{
			"name": "riboflavin",
			"uom": "mg",
			"dv": 1.7,
			"nutrient_id": 405
		},
		{
			"name": "niacin",
			"uom": "mg",
			"dv": 20,
			"nutrient_id": 406 
		},
		{
			"name": "vitamin_b6",
			"uom": "mg",
			"dv": 2,
			"nutrient_id": 415 
		},
		{
			"name": "folate",
			"uom": "µg",
			"dv": 400,
			"nutrient_id": 417 
		},
		{
			"name": "vitamin_b12",
			"uom": "µg",
			"dv": 6,
			"nutrient_id": 418 
		},
		{
			"name": "biotin",
			"uom": "µg",
			"dv": 300,
			"nutrient_id": 000 
		},
		{
			"name": "pantothenic_acid",
			"uom": "mg",
			"dv": 10,
			"nutrient_id": 410  
		},
		{
			"name": "phosphorus",
			"uom": "mg",
			"dv": 1000,
			"nutrient_id": 305 
		},
		{
			"name": "iodine",
			"uom": "µg",
			"dv": 150,
			"nutrient_id": 000  
		},
		{
			"name": "magnesium",
			"uom": "mg",
			"dv": 400,
			"nutrient_id": 304 
		},
		{
			"name": "zinc",
			"uom": "mg",
			"dv": 15,
			"nutrient_id": 309 
		},
		{
			"name": "selenium",
			"uom": "µg",
			"dv": 70,
			"nutrient_id": 317 
		},
		{
			"name": "copper",
			"uom": "mg",
			"dv": 2,
			"nutrient_id": 312
		},
		{
			"name": "manganese",
			"uom": "mg",
			"dv": 2,
			"nutrient_id": 304 
		}
	]
};









