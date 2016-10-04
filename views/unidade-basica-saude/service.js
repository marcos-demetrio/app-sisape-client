(function () {
	'use strict';

	angular
		.module('app')
		.factory('UbsService', UbsService);

	UbsService.$inject = ['$http', 'API'];
	function UbsService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'ubs').then(handleSuccess, handleError('Erro obtendo lista de ubs'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'ubs/' + id).then(handleSuccess, handleError('Erro obtendo ubs pelo ID: ' + id));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'ubs/' + id).then(handleSuccess, handleError('Erro ao excluir ubs pelo ID: ' + id));
		}

		service.DeleteZonaAtendimento = function DeleteZonaAtendimento(idZona) {
			return $http.delete(API + 'ubs/zona/' + idZona).then(handleSuccess, handleError('Erro ao excluir Zona de Atendimento pelo ID: ' + idZona));
		}

		service.Create = function Create(ubs) {
			return $http.post(API + 'ubs/', ubs).then(handleSuccess, handleError('Erro ao criar ubs'));
		}

		service.Update = function Update(ubs, id) {
			return $http.put(API + 'ubs/' + id, ubs).then(handleSuccess, handleError('Erro ao atualizar ubs'));
		}

		service.PesquisarPorNome = function PesquisarPorNome(params) {
			return $http.get(API + 'ubs/nome/', params).then(handleSuccess, handleError('Erro ao pesquisar por nome do ubs'));
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
