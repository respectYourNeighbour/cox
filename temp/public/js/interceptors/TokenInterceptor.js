angular.module('main_app').factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      console.log("TokenInterceptor config",config)
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['Content-Type'] = "application/json";
        /*console.log("$window.sessionStorage.token",$window.sessionStorage.token)
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['X-Key'] = $window.sessionStorage.user;
        config.headers['Content-Type'] = "application/json";*/
      }
      return config || $q.when(config);
    },

    response: function(response) {
      return response || $q.when(response);
    }
  };
});