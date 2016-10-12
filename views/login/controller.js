(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$location', '$rootScope', '$window', 'AuthenticationService'];

	function LoginController($scope, $location, $rootScope, $window, AuthenticationService) {
		$scope.login = login;

		$scope.email = 'demetrius.marcos@gmail.com';

		(function initController() {
			AuthenticationService.ClearCredentials();
		})();

		function login() {
			$scope.dataLoading = true;

			var senha = md5($scope.password);
			
			AuthenticationService.Login($scope.email, senha, function (response) {	
				if (response.success) {
					var url;

					AuthenticationService.SetCredentials($scope.email, senha, response.usuario);
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