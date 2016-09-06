(function () {
	'use strict';

	angular
		.module('app')
		.factory('TipoLogradouroService', TipoLogradouroService);

	TipoLogradouroService.$inject = ['$http', 'API'];
	function TipoLogradouroService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'tipologradouro').then(handleSuccess, handleError('Erro obtendo lista de tipos de logradouro'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'tipologradouro/' + id).then(handleSuccess, handleError('Erro obtendo tipo de logradouro pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'tipologradouro/' + id).then(handleSuccess, handleError('Erro ao excluir tipo de logradouro pelo ID: ' + id));
		}

		service.Create = function Create(tipoLogradouro) {
			return $http.post(API + 'tipologradouro/', tipoLogradouro).then(handleSuccess, handleError('Erro ao criar tipo de logradouro'));
		}

		service.Update = function Update(tipoLogradouro, id) {
			return $http.put(API + 'tipologradouro/' + id, tipoLogradouro).then(handleSuccess, handleError('Erro ao atualizar tipo de logradouro'));
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
