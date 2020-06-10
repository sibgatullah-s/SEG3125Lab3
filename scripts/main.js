
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {
	// Get all elements with class="tabcontent" and hide them
	console.log("test", evt, tabName);
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		// tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		if (tablinks[i].className == "tablinks active") {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
			document.getElementById(tabName).style.display = "none";
		} else {
			// Show the current tab, and add an "active" class to the button that opened the tab
			document.getElementById(tabName).style.display = "block";
			evt.currentTarget.className += " active";
		}
		
	}

}


	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct2) {
    var s1 = document.querySelector('input[name="dietSelect"]:checked') // to get dietary pref
	var s2 = document.getElementById(slct2); // displayProduct
	var s3 = document.querySelector('input[name="organicSelect"]:checked') // get organic pref
	if (s1.value != "" && s3.value != ""){
	
	
		// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
		s2.innerHTML = "";
			
		// obtain a reduced list of products based on restrictions
		var optionArray = restrictListProducts(products, s1.value, s3.value);

		// for each item in the array, create a checkbox element, each containing information such as:
		// <input type="checkbox" name="product" value="Bread">
		// <label for="Bread">Bread/label><br>
		// sort array by increasing prices inspired by https://stackoverflow.com/questions/5002848/how-to-define-custom-sort-function-in-javascript
		optionArray.sort(function(x, y) {
			if (products.find(elem => elem.name == x).price < products.find(elem => elem.name == y).price) {
				return -1;
			}
			if (products.find(elem => elem.name == x).price > products.find(elem => elem.name == y).price) {
				return 1;
			}
			return 0;
		});
		for (i = 0; i < optionArray.length; i++) {
			// code to find prices for products inspired by https://stackoverflow.com/questions/36419195/get-index-from-a-json-object-with-value/36419269
			var productName = optionArray[i];
			var container = document.createElement("div");
			container.id = productName;
			container.className = "prods";
			container.style.display = "none";
			container.style.verticalAlign = "top";
			var idx = products.findIndex(obj => obj.name == productName);
			var price = products[idx].price;
			// get image for element
			var img = document.createElement("img");
			img.src = "images/" + productName + ".jpg";
			img.style.height = '100px';
			img.style.width = '100px';
			img.style.overflow = 'hidden';
			container.appendChild(img);
			container.appendChild(document.createElement("br"));
			// create the checkbox and add in HTML DOM
			var checkbox = document.createElement("input");
			// checkbox.style.display = "inline";
			checkbox.type = "checkbox";
			checkbox.name = "product";
			checkbox.value = productName;
			container.appendChild(checkbox);
			
			// create a label for the checkbox, and also add in HTML DOM
			var label = document.createElement('label')
			label.htmlFor = productName;
			label.appendChild(document.createTextNode(productName + ": " + price));
			container.appendChild(label);
			
			// create a breakline node and add in HTML DOM
			s2.appendChild(container);
			// s2.appendChild(document.createElement("br"));    
		}
	}
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	var para = document.createElement("P");
	// para.style.marginLeft = "10px";
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	// add 5px space between text and list .. inefficient
	var spc = document.createElement("div");
	spc.style.height = "5px";
	para.appendChild(spc);
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			// create div for item and pic
			var div = document.createElement("div");
			div.style.verticalAlign = "top";
			div.style.display = "inline-block";
			div.style.textAlign = "center";
			div.style.width = "100px";
			div.style.marginLeft = "12px";
			// create image for item
			var img = document.createElement("img");
			img.src = "images/" + ele[i].value + ".jpg";
			img.style.height = '100px';
			img.style.width = '100px';
			img.style.overflow = 'hidden';
			// add image to div
			div.appendChild(img);
			// create span with text
			var text = document.createElement("span");
			text.textContent = ele[i].value;
			text.style.display = "block";
			// div.appendChild(document.createTextNode(ele[i].value));
			// add span to div
			div.appendChild(text);
			// add div to para
			para.appendChild(div);
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts)));
		
}

// function which displays products based on category selected
function updateChoices(){
	// set all items to display none
	var prods = document.getElementsByClassName("prods");
	for (var i = 0; i < prods.length; i++) {
		prods[i].style.display = "none";
	}
	
	// iterate list of products, display based on category selected
	var category = document.getElementById("category").value;
	products.forEach(item => {
		if (item.category == category && document.getElementById(item.name) != null) {
			var choice = document.getElementById(item.name);
			// console.log("choices", choice);
			choice.style.display = "table-caption";
			choice.style.marginTop = "0px";
		}
	});
}

