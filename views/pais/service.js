(function () {
	'use strict';

	angular
		.module('app')
		.factory('PaisService', PaisService);

	PaisService.$inject = ['$http', 'API'];
	function PaisService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'pais').then(handleSuccess, handleError('Erro obtendo lista de países'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'pais/' + id).then(handleSuccess, handleError('Erro obtendo país pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'pais/' + id).then(handleSuccess, handleError('Erro ao excluir país pelo ID: ' + id));
		}

		service.Create = function Create(pais) {
			return $http.post(API + 'pais/', pais).then(handleSuccess, handleError('Erro ao criar país'));
		}

		service.Update = function Update(pais, id) {
			return $http.put(API + 'pais/' + id, pais).then(handleSuccess, handleError('Erro ao atualizar país'));
		}

		service.PesquisarPorNome = function PesquisarPorNome(params) {
			return $http.get(API + 'pais/nome/', params).then(handleSuccess, handleError('Erro ao pesquisar por nome do país'));
		}
		
		service.Print = function Print(params) {
			return $http.post(API + 'pais/print', params).then(handleSuccess, handleError('Erro ao gerar o relatório de país'));
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
