var MainCtrl = function($http,$scope, Auth) {
            	console.log("main controller")


            	$scope.Auth = Auth;

            	$scope.isUserLoggedIn = Auth._authenticated;


            	console.log("auth : ",Auth._authenticated)

			    showLeft.onclick = function() {
			        $(this).toggleClass("active");
			        $( this ).toggleClass( "effect1" );
			        $("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")
			    };

			    $(".cbp-spmenu a").on("click", function() {
			        var $this = $(this),
			            $links = $(".cbp-spmenu a");

			        $links.removeClass("selected");
			        $this.addClass("selected");
			    });

				$scope.name = 'user';
				$scope.orderProperty = 'age';
			}