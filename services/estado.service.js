(function () {
	'use strict';

	angular
		.module('app')
		.factory('EstadoService', EstadoService);

	EstadoService.$inject = ['$http', 'API'];
	function EstadoService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'estado').then(handleSuccess, handleError('Erro obtendo lista de estados'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'estado/' + id).then(handleSuccess, handleError('Erro obtendo estado pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'estado/' + id).then(handleSuccess, handleError('Erro ao excluir estado pelo ID: ' + id));
		}

		service.Create = function Create(estado) {
			return $http.post(API + 'estado/', estado).then(handleSuccess, handleError('Erro ao criar estado'));
		}

		service.Update = function Update(estado, id) {
			return $http.put(API + 'estado/' + id, estado).then(handleSuccess, handleError('Erro ao atualizar estado'));
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
