(function () {
	'use strict';

	angular
		.module('app')
		.factory('AuthenticationService', AuthenticationService);

	AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UsuarioService', 'API'];
	function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UsuarioService, API) {
		var service = {};

		service.Login = Login;
		service.SetCredentials = SetCredentials;
		service.ClearCredentials = ClearCredentials;
		service.GetNovaSenha = GetNovaSenha;

		return service;

		function GetNovaSenha(email) {
			var parameters = {
				email : email
			};

			var config = {
				params : parameters
			};

			return $http.get(API + 'usuario/novasenha', config).then(handleSuccess, handleError('Erro obtendo nova senha pelo e-mail: ' + email));
		}

		function handleSuccess(res) {
			return res.data;
		}

		function handleError(error) {
			return function () {
				return { success: false, message: error };
			};
		}

		function Login(email, password, callback) {
			$timeout(function () {
				var response;

				var parameters = {
					email : email
				};

				var config = {
					params : parameters
				};

				UsuarioService.GetByEmail(config).then(function (user) {
					if (user !== null && user.senha === password) {
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
					tipoUsuario: tipoUsuario,
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