(function () {
	'use strict';

	angular
		.module('app')
		.factory('ProfissionalAgendaService', ProfissionalAgendaService);

	ProfissionalAgendaService.$inject = ['$http', 'API'];
	function ProfissionalAgendaService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'agendaprofissional').then(handleSuccess, handleError('Erro obtendo lista de agenda'));
		}

		service.GetByLotacao = function GetByLotacao(idLotacao) {
			return $http.get(API + 'agendaprofissional/' + idLotacao).then(handleSuccess, handleError('Erro obtendo agenda pelo ID da lotação: ' + idLotacao));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'agendaprofissional/' + id).then(handleSuccess, handleError('Erro ao excluir agenda pelo ID: ' + id));
		}

		service.Create = function Create(agendaProfissional, id) {
			return $http.post(API + 'agendaprofissional/' + id, agendaProfissional).then(handleSuccess, handleError('Erro ao criar agenda'));
		}

		service.Update = function Update(agendaProfissional, id) {
			return $http.put(API + 'agendaprofissional/' + id, agendaProfissional).then(handleSuccess, handleError('Erro ao atualizar agenda'));
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
