(function () {
	'use strict';

	angular
		.module('app')
		.factory('CboService', CboService);

	CboService.$inject = ['$http', 'API'];
	function CboService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'classificacaobrasileiraocupacao').then(handleSuccess, handleError('Erro obtendo lista de cbo'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'classificacaobrasileiraocupacao/' + id).then(handleSuccess, handleError('Erro obtendo cbo pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'classificacaobrasileiraocupacao/' + id).then(handleSuccess, handleError('Erro ao excluir cbo pelo ID: ' + id));
		}

		service.Create = function Create(cbo) {
			return $http.post(API + 'classificacaobrasileiraocupacao/', cbo).then(handleSuccess, handleError('Erro ao criar cbo'));
		}

		service.Update = function Update(cbo, id) {
			return $http.put(API + 'classificacaobrasileiraocupacao/' + id, cbo).then(handleSuccess, handleError('Erro ao atualizar cbo'));
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
