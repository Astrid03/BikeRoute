angular.module('BikeRoute')
.controller('ProfileController',
  function($scope, User, $location, $routeParams, $rootScope) {

    $scope.loadUser = function () {
       User.get({
         username: $routeParams.username
       }, function (response) {
         console.log(response);
         $scope.user = response.user
         $scope.events = response.events
         console.log(response.events);
       })
     }

      $scope.updateUser = function () {
        delete $scope.user.joinDate
        var user = $scope.user
        User.update(user, function () { /* En lugar de redirigir hay que intentar traer la informacion y renderizarla utilizando scope*/
          $location.path('/profile/' + user.username)
        })
      }

  })
