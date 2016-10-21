(function () {
	'use strict';

	angular
		.module('app')
		.factory('MunicipioService', MunicipioService);

	MunicipioService.$inject = ['$http', 'API'];
	function MunicipioService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'municipio').then(handleSuccess, handleError('Erro obtendo lista de municípios'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'municipio/' + id).then(handleSuccess, handleError('Erro obtendo município pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'municipio/' + id).then(handleSuccess, handleError('Erro ao excluir município pelo ID: ' + id));
		}

		service.Create = function Create(municipio) {
			return $http.post(API + 'municipio/', municipio).then(handleSuccess, handleError('Erro ao criar município'));
		}

		service.Update = function Update(municipio, id) {
			return $http.put(API + 'municipio/' + id, municipio).then(handleSuccess, handleError('Erro ao atualizar município'));
		}

		service.PesquisarPorNome = function PesquisarPorNome(params) {
			return $http.get(API + 'municipio/nome/', params).then(handleSuccess, handleError('Erro ao pesquisar por nome do município'));
		}
		
		service.Print = function Print(params) {
			return $http.get(API + 'municipio/print/', params).then(handleSuccess, handleError('Erro ao gerar o relatório de município'));
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
