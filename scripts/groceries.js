	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "broccoli",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		category: "vegetables",
		price: 2.00
	},
	{
		name: "bread",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		category: "carbohydrates",
		price: 2.35
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		category: "proteins",
		price: 10.00
	},
	{
		name: "chicken",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		category: "proteins",
		price: 9.00
	},
	{
		name: "beef",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		category: "proteins",
		price: 12.00
	},
	{
		name: "lettuce",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		category: "vegetables",
		price: 4.00
	},
	{
		name: "tomato",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		category: "vegetables",
		price: 3.00
	},
	{
		name: "strawberry",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		category: "fruits",
		price: 6.00
	},
	{
		name: "yogurt",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		category: "dairy",
		price: 4.50
	},
	{
		name: "milk",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		category: "dairy",
		price: 2.00
	}
];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction, orgRestriction) {
	let product_names = [];
	for (let i=0; i<prods.length; i+=1) {
		if ((restriction == "Vegetarian") && (prods[i].vegetarian == true)){
			product_names.push(prods[i].name);
		}	
		else if ((restriction == "GlutenFree") && (prods[i].glutenFree == true)){
			product_names.push(prods[i].name);
		}
		else if ((restriction == "VegGluten") && (prods[i].vegetarian == true) && (prods[i].glutenFree == true)){
			product_names.push(prods[i].name);
		}
		else if (restriction == "None"){
			product_names.push(prods[i].name);
		}
	}
	// remove unorganic items if organic selected
	// code to filter out non-organic items inspired by https://alligator.io/js/filter-array-method/ and https://stackoverflow.com/questions/13964155/get-javascript-object-from-array-of-objects-by-value-of-property
	if (orgRestriction == "Organic") {
		product_names = product_names.filter(function(item) {
			return prods.find(elem => elem.name == item).organic == true;
		});
	}
	
	
	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}
