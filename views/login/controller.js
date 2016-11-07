(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$location', '$rootScope', '$window', 'AuthenticationService'];

	function LoginController($scope, $location, $rootScope, $window, AuthenticationService) {
		$scope.login = login;

		(function initController() {
			AuthenticationService.ClearCredentials();
		})();

		function login() {
			$scope.dataLoading = true;

			var senha = md5($scope.password);
			
			AuthenticationService.Login($scope.email, senha, $scope.tipoUsuario, function (response) {	
				if (response.success) {
					var url;

					AuthenticationService.SetCredentials($scope.email, senha, response.usuario, $scope.tipoUsuario);
					$location.path('/inicio');

					$rootScope.criarMenu();
					$rootScope.ajustarMenuUsuario(response.usuario.id, response.usuario.tipoUsuario);
				} else {
					$scope.dataLoading = false;
				}
			});
		};
	}
})();