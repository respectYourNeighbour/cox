function cart(name,LoginService, toastr) {
	console.log("cart")
	this.name = name;
	this.clearCart = false;
	this.items = [];
	this.loadItems();
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
	if(items != null) {
		if(JSON != null) {
			console.log("items != null",items)
		} else {
			console.log("JSON is null")
		}
	} else {
		console.log("items is null")
	}
}

cart.prototype.addItem = function() {
	console.log("add item")
	if(!this.LoginService.isAuthenticated()) {
		console.log("555555555555555not authenticated")
		this.toastr.error("You are not logged in. <a href='/authentication' style='color:blue'>Login</a> here",{
	    	allowHtml : true
	   	});
	}
}

cart.prototype.saveItems = function() {
	console.log("SAVE ITEMS")
	if(localStorage != null && JSON != null){
		localStorage[this.name + "_items"] = JSON.stringify(this.items);
	} else {
		console.log("local storage is null")
	}
}