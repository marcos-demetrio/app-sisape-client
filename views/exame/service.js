(function () {
	'use strict';

	angular
		.module('app')
		.factory('ExameService', ExameService);

	ExameService.$inject = ['$http', 'API'];
	function ExameService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'exame').then(handleSuccess, handleError('Erro obtendo lista de exames'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'exame/' + id).then(handleSuccess, handleError('Erro obtendo exame pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'exame/' + id).then(handleSuccess, handleError('Erro ao excluir exame pelo ID: ' + id));
		}

		service.Create = function Create(exame) {
			return $http.post(API + 'exame/', exame).then(handleSuccess, handleError('Erro ao criar exame'));
		}

		service.Update = function Update(exame, id) {
			return $http.put(API + 'exame/' + id, exame).then(handleSuccess, handleError('Erro ao atualizar exame'));
		}

		service.PesquisarPorNome = function PesquisarPorNome(params) {
			return $http.get(API + 'exame/nome/', params).then(handleSuccess, handleError('Erro ao pesquisar por nome do exame'));
		}
		
		service.Print = function Print(params) {
			return $http.get(API + 'exame/print/', params).then(handleSuccess, handleError('Erro ao gerar o relatório de exame'));
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
