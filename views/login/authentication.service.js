(function () {
	'use strict';

	angular
		.module('app')
		.factory('AuthenticationService', AuthenticationService);

	AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UsuarioService'];
	function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UsuarioService) {
		var service = {};

		service.Login = Login;
		service.SetCredentials = SetCredentials;
		service.ClearCredentials = ClearCredentials;

		return service;

		function Login(email, password, tipoUsuario, callback) {
			$timeout(function () {
				var response;

				var parameters = {
					email : email
				};

				var config = {
					params : parameters
				};

				UsuarioService.GetByEmail(config).then(function (user) {
					if (user !== null && user.senha === password && user.tipoUsuario === tipoUsuario) {
						response = { success: true, usuario: user };
					} else {
						response = { success: false, message: 'Username or password is incorrect' };
					}
					callback(response);
				});
			}, 500);
		}

		function SetCredentials(email, password, usuario, tipoUsuario) {
			$rootScope.globals = {
				currentUser: {
					id:  usuario.id,
					email: email,
					password: password,
					tipoUsuario: tipoUsuario,//tipoUsuario: usuario.tipoUsuario,
					nomeUsuario: usuario.nome
				}
			};

			$cookieStore.put('globals', $rootScope.globals);
		}

		function ClearCredentials() {
			$rootScope.globals = {};
			$cookieStore.remove('globals');
		}
	}
})();