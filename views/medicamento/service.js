(function () {
	'use strict';

	angular
		.module('app')
		.factory('MedicamentoService', MedicamentoService);

	MedicamentoService.$inject = ['$http', 'API'];
	function MedicamentoService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'medicamento').then(handleSuccess, handleError('Erro obtendo lista de medicamentos'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'medicamento/' + id).then(handleSuccess, handleError('Erro obtendo medicamento pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'medicamento/' + id).then(handleSuccess, handleError('Erro ao excluir medicamento pelo ID: ' + id));
		}

		service.Create = function Create(medicamento) {
			return $http.post(API + 'medicamento/', medicamento).then(handleSuccess, handleError('Erro ao criar medicamento'));
		}

		service.Update = function Update(medicamento, id) {
			return $http.put(API + 'medicamento/' + id, medicamento).then(handleSuccess, handleError('Erro ao atualizar medicamento'));
		}

		service.PesquisarPorNome = function PesquisarPorNome(params) {
			return $http.get(API + 'medicamento/nome/', params).then(handleSuccess, handleError('Erro ao pesquisar por nome do medicamento'));
		}
		
		service.Print = function Print(params) {
			return $http.get(API + 'medicamento/print/', params).then(handleSuccess, handleError('Erro ao gerar o relatório de medicamento'));
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
