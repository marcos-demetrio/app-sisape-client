(function () {
	'use strict';

	angular
		.module('app')
		.factory('UsuarioService', UsuarioService);

	UsuarioService.$inject = ['$http', 'API'];
	function UsuarioService($http, API) {
		var service = {};

		service.GetByEmail = function GetByEmail(params) {
			return $http.get(API + 'usuario', params).then(handleSuccess, handleError('Erro ao procurar usuário por e-mail.'));
		}

		return service;
		
		function handleSuccess(res) {
			return res.data;
		}

		function handleError(error) {
			return function () {
				return { success: false, message: error };
			};
		}
	}
})();
