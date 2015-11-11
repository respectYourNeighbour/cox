function cart(LoginService, toastr) {
	console.log("cart")
	this.clearCart = false;
	this.items = [];
	this.loadItems();
	console.log("333333333333333333",LoginService)
	console.log("444444444444444444",toastr)
	this.toastr = toastr;
	this.LoginService = LoginService;
}

cart.prototype.loadItems = function() {
	console.log("loadItems");
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