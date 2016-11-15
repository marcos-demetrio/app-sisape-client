(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController)
		.controller('RecuperarSenhaController', RecuperarSenhaController);

	LoginController.$inject = ['$scope', '$location', '$rootScope', '$window', 'AuthenticationService'];

	function LoginController($scope, $location, $rootScope, $window, AuthenticationService) {
		$scope.login = login;

		(function initController() {
			AuthenticationService.ClearCredentials();
		})();

		function login() {
			$scope.dataLoading = true;

			var senha = md5($scope.password);
			
			AuthenticationService.Login($scope.email, senha, function (response) {
				if (response.success) {
					var url;

					AuthenticationService.SetCredentials($scope.email, senha, response.usuario, response.usuario.tipoUsuario);
					$location.path('/inicio');

					$rootScope.criarMenu();
					$rootScope.ajustarMenuUsuario(response.usuario.id, response.usuario.tipoUsuario);
				} else {
					$scope.dataLoading = false;
				}
			});
		};
	}

	RecuperarSenhaController.$inject = ['$scope', '$location', 'AuthenticationService'];

	function RecuperarSenhaController($scope, $location, AuthenticationService) {
		$scope.novaSenha = novaSenha;

		function novaSenha() {
			console.log('cidadao@sisape.com.br');//cidadao@sisape.com.br
			AuthenticationService.GetNovaSenha($scope.emailRecuperar).then(function(data){
				$location.path('/login');
				$location.reload();
			});
		}
	}
})();