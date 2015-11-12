function cart(name,LoginService, toastr) {
	console.log("cart")
	this.cartName = name;
	this.clearCart = false;
	this.items = [];
	console.log("333333333333333333",LoginService)
	console.log("444444444444444444",toastr)
	this.toastr = toastr;
	this.LoginService = LoginService;

	this.loadItems();
	this.saveItems();
}

cart.prototype.loadItems = function() {
	console.log("loadItems");
	var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
	console.log("localStorage",localStorage)
	console.log(localStorage[this.cartName + "_items"])
	if(items != null && JSON != null) {
		try {
            var items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                console.log("item",item)
                if(item.nume != null && item.ingredients != null && item.ingredients.length > 0) {
                	this.items.push(item);
                } else {
                	console.log("error on saving");
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
	} else {
		console.log("items is null")
	}
}

cart.prototype.addItem = function(ingredients, recipeName) {
	console.log("add item",ingredients)
	if(ingredients.length != 0 && ingredients != null) {
		var found = false;
		for(var i = 0; i<this.items.length && !found; i++) {
			if(this.items[i].nume == recipeName) {
				console.log("recipe already exists");
				found = true;
			}
		}
		if(!found) {
			var item = {
				nume : recipeName,
				ingredients : ingredients
			}
			this.items.push(item);
		}
	}

	console.log("this.items",this.items)
	this.saveItems();
}

cart.prototype.saveItems = function() {
	console.log("SAVE ITEMS")
	if(localStorage != null && JSON != null){
		localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
	} else {
		console.log("local storage is null")
	}
	console.log("saveItems",localStorage)
}