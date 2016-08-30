(function () {
	'use strict';

	angular
		.module('app')
		.factory('CidadaoService', CidadaoService);

	CidadaoService.$inject = ['$http', 'API'];
	function CidadaoService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'cidadao').then(handleSuccess, handleError('Erro obtendo lista de cidadões'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'cidadao/' + id).then(handleSuccess, handleError('Erro obtendo cidadão pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'cidadao/' + id).then(handleSuccess, handleError('Erro ao excluir cidadão pelo ID: ' + id));
		}

		service.Create = function Create(cidadao) {
			return $http.post(API + 'cidadao/', cidadao).then(handleSuccess, handleError('Erro ao criar cidadão'));
		}

		service.Update = function Update(cidadao, id) {
			return $http.put(API + 'cidadao/' + id, cidadao).then(handleSuccess, handleError('Erro ao atualizar cidadão'));
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
