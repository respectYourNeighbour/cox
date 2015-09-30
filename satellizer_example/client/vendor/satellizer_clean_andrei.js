/**
 * Satellizer 0.12.5
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */
(function(window, angular, undefined) {
  'use strict';

  angular.module('satellizer', [])
    .constant('SatellizerConfig', {
      httpInterceptor: true,
      withCredentials: true,
      tokenRoot: null,
      cordova: false,
      baseUrl: '/',
      loginUrl: '/auth/login',
      signupUrl: '/auth/signup',
      tokenName: 'token',
      tokenPrefix: 'satellizer',
      authHeader: 'Authorization',
      authToken: 'Bearer',
      storageType: 'localStorage',
      providers: {}
    })
    .provider('$auth', ['SatellizerConfig', function(config) {
      Object.defineProperties(this, {
        httpInterceptor: {
          get: function() { return config.httpInterceptor; },
          set: function(value) { config.httpInterceptor = value; }
        },
        baseUrl: {
          get: function() { return config.baseUrl; },
          set: function(value) { config.baseUrl = value; }
        },
        loginUrl: {
          get: function() { return config.loginUrl; },
          set: function(value) { config.loginUrl = value; }
        },
        signupUrl: {
          get: function() { return config.signupUrl; },
          set: function(value) { config.signupUrl = value; }
        },
        tokenRoot: {
          get: function() { return config.tokenRoot; },
          set: function(value) { config.tokenRoot = value; }
        },
        tokenName: {
          get: function() { return config.tokenName; },
          set: function(value) { config.tokenName = value; }
        },
        tokenPrefix: {
          get: function() { return config.tokenPrefix; },
          set: function(value) { config.tokenPrefix = value; }
        },
        authHeader: {
          get: function() { return config.authHeader; },
          set: function(value) { config.authHeader = value; }
        },
        authToken: {
          get: function() { return config.authToken; },
          set: function(value) { config.authToken = value; }
        },
        withCredentials: {
          get: function() { return config.withCredentials; },
          set: function(value) { config.withCredentials = value; }
        },
        cordova: {
          get: function() { return config.cordova; },
          set: function(value) { config.cordova = value; }
        },
        storageType: {
          get: function() { return config.storageType; },
          set: function(value) { config.storageType = value; }
        }
      });

      angular.forEach(Object.keys(config.providers), function(provider) {
        this[provider] = function(params) {
          return angular.extend(config.providers[provider], params);
        };
      }, this);

      var oauth = function(params) {
        config.providers[params.name] = config.providers[params.name] || {};
        angular.extend(config.providers[params.name], params);
      };

      this.oauth1 = function(params) {
        oauth(params);
        config.providers[params.name].type = '1.0';
      };

      this.oauth2 = function(params) {
        oauth(params);
        config.providers[params.name].type = '2.0';
      };

      this.$get = [
        '$q',
        'SatellizerShared',
        'SatellizerLocal',
        'SatellizerOauth',
        function($q, shared, local, oauth) {
          var $auth = {};

          $auth.login = function(user, opts) {
            return local.login(user, opts);
          };

          $auth.signup = function(user, options) {
            return local.signup(user, options);
          };

          $auth.logout = function() {
            return shared.logout();
          };

          $auth.isAuthenticated = function() {
            return shared.isAuthenticated();
          };

          $auth.getToken = function() {
            return shared.getToken();
          };

          $auth.setToken = function(token) {
            shared.setToken({ access_token: token });
          };

          $auth.removeToken = function() {
            return shared.removeToken();
          };

          $auth.getPayload = function() {
            return shared.getPayload();
          };

          $auth.setStorageType = function(type) {
            return shared.setStorageType(type);
          };

          return $auth;
        }];
    }])
    .factory('SatellizerShared', [
      '$q',
      '$window',
      'SatellizerConfig',
      'SatellizerStorage',
      function($q, $window, config, storage) {
        var Shared = {};

        var tokenName = config.tokenPrefix ? [config.tokenPrefix, config.tokenName].join('_') : config.tokenName;

        Shared.getToken = function() {
          return storage.get(tokenName);
        };

        Shared.getPayload = function() {
          var token = storage.get(tokenName);

          if (token && token.split('.').length === 3) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
          }
        };

        Shared.setToken = function(response) {
          var accessToken = response && response.access_token;
          var token;

          if (accessToken) {
            if (angular.isObject(accessToken) && angular.isObject(accessToken.data)) {
              response = accessToken;
            } else if (angular.isString(accessToken)) {
              token = accessToken;
            }
          }

          if (!token && response) {
            var tokenRootData = config.tokenRoot && config.tokenRoot.split('.').reduce(function(o, x) { return o[x]; }, response.data);
            token = tokenRootData ? tokenRootData[config.tokenName] : response.data[config.tokenName];
          }

          if (!token) {
            var tokenPath = config.tokenRoot ? config.tokenRoot + '.' + config.tokenName : config.tokenName;
            throw new Error('Expecting a token named "' + tokenPath + '" but instead got: ' + JSON.stringify(response.data));
          }

          storage.set(tokenName, token);
        };

        Shared.removeToken = function() {
          storage.remove(tokenName);
        };

        /**
         * @returns {boolean}
         */
        Shared.isAuthenticated = function() {
          var token = storage.get(tokenName);

          if (token) {
            if (token.split('.').length === 3) {
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              var exp = JSON.parse($window.atob(base64)).exp;

              if (exp) {
                var isExpired = Math.round(new Date().getTime() / 1000) >= exp;

                if (isExpired) {
                  storage.remove(tokenName);
                  return false;
                } else {
                  return true;
                }
              }
              return true;
            }
            return true;
          }
          return false;
        };

        Shared.logout = function() {
          storage.remove(tokenName);
          return $q.when();
        };

        Shared.setStorageType = function(type) {
          config.storageType = type;
        };

        return Shared;
      }])
    .factory('SatellizerLocal', [
      '$http',
      'SatellizerUtils',
      'SatellizerShared',
      'SatellizerConfig',
      function($http, utils, shared, config) {
        var Local = {};

        /**
         * @param {Object} user - User information. (e.g. email and password)
         * @param {Object} opts - HTTP config object.
         * @returns {Promise} - Returns a Promise that will be resolved when the request succeeds or fails.
         */
        Local.login = function(user, opts) {
          opts = opts || {};
          opts.url = config.baseUrl ? utils.joinUrl(config.baseUrl, config.loginUrl) : config.loginUrl;
          opts.data = user || opts.data;
          opts.method = opts.method || 'POST';

          return $http(opts).then(function(response) {
            shared.setToken(response);
            return response;
          });
        };

        /**
         * @param {Object} user - User information. (e.g. email and password)
         * @param {Object} opts - HTTP config object.
         * @returns {Promise} - Returns a Promise that will be resolved when the request succeeds or fails.
         */
        Local.signup = function(user, opts) {
          opts = opts || {};
          opts.url = config.baseUrl ? utils.joinUrl(config.baseUrl, config.signupUrl) : config.signupUrl;
          opts.data = user || opts.data;
          opts.method = opts.method || 'POST';

          return $http(opts);
        };

        return Local;
      }])
    .service('SatellizerUtils', function() {
      this.camelCase = function(name) {
        return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        });
      };

      this.parseQueryString = function(keyValue) {
        var obj = {}, key, value;
        angular.forEach((keyValue || '').split('&'), function(keyValue) {
          if (keyValue) {
            value = keyValue.split('=');
            key = decodeURIComponent(value[0]);
            obj[key] = angular.isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
          }
        });
        return obj;
      };

      this.joinUrl = function(baseUrl, url) {
        if (/^(?:[a-z]+:)?\/\//i.test(url)) {
          return url;
        }

        var joined = [baseUrl, url].join('/');

        var normalize = function(str) {
          return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
        };

        return normalize(joined);
      };

      this.merge = function(obj1, obj2) {
        var result = {};
        for (var i in obj1) {
          if (obj1.hasOwnProperty(i)) {
            if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
              result[i] = this.merge(obj1[i], obj2[i]);
            } else {
              result[i] = obj1[i];
            }
          }
        }
        for (i in obj2) {
          if (obj2.hasOwnProperty(i)) {
            if (i in result) {
              continue;
            }
            result[i] = obj2[i];
          }

        }
        return result;
      }
    })
    .factory('SatellizerStorage', ['$window', 'SatellizerConfig', function($window, config) {
      var isStorageAvailable = (function() {
        try {
          var supported = config.storageType in $window && $window[config.storageType] !== null;

          if (supported) {
            var key = Math.random().toString(36).substring(7);
            $window[config.storageType].setItem(key, '');
            $window[config.storageType].removeItem(key);
          }

          return supported;
        } catch (e) {
          return false;
        }
      })();

      if (!isStorageAvailable) {
        console.warn('Satellizer Warning: ' + config.storageType + ' is not available.');
      }

      return {
        get: function(key) {
          return isStorageAvailable ? $window[config.storageType].getItem(key) : undefined;
        },
        set: function(key, value) {
          return isStorageAvailable ? $window[config.storageType].setItem(key, value) : undefined;
        },
        remove: function(key) {
          return isStorageAvailable ? $window[config.storageType].removeItem(key): undefined;
        }
      };
    }])
    .factory('SatellizerInterceptor', [
      '$q',
      'SatellizerConfig',
      'SatellizerStorage',
      'SatellizerShared',
      function($q, config, storage, shared) {
        return {
          request: function(request) {
            if (request.skipAuthorization) {
              return request;
            }

            if (shared.isAuthenticated() && config.httpInterceptor) {
              var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
              var token = storage.get(tokenName);

              if (config.authHeader && config.authToken) {
                token = config.authToken + ' ' + token;
              }

              request.headers[config.authHeader] = token;
            }

            return request;
          },
          responseError: function(response) {
            return $q.reject(response);
          }
        };
      }])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('SatellizerInterceptor');
    }]);

})(window, window.angular);
