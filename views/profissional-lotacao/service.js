(function () {
	'use strict';

	angular
		.module('app')
		.factory('ProfissionalLotacaoService', ProfissionalLotacaoService);

	ProfissionalLotacaoService.$inject = ['$http', 'API'];
	function ProfissionalLotacaoService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'lotacao').then(handleSuccess, handleError('Erro obtendo lista de lotação'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'lotacao/' + id).then(handleSuccess, handleError('Erro obtendo lotação pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'lotacao/' + id).then(handleSuccess, handleError('Erro ao excluir lotação pelo ID: ' + id));
		}

		service.Create = function Create(lotacao) {
			return $http.post(API + 'lotacao/', lotacao).then(handleSuccess, handleError('Erro ao criar lotação'));
		}

		service.Update = function Update(lotacao, id) {
			return $http.put(API + 'lotacao/' + id, lotacao).then(handleSuccess, handleError('Erro ao atualizar lotação'));
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
