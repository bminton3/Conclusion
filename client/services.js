angular.module('myApp').factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

    // user
    var user = null;

    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });


function isLoggedIn() {
  if(user) {
    return true;
  } else {
    return false;
  }
}

function getUserStatus() {
  return user;
}

function login(username, password) {
  
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/user/login', {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        user = true;
        deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

function logout() {
  
  var deferred = $q.defer();

  // send a get request to the server
  $http.get('/user/logout')
    // handle success
    .success(function (data) {
      user = false;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

function register(username, password) {

  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/user/register', {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        deferred.resolve();
      } else {
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject();
    });

  return deferred.promise;

}
}]);

