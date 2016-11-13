(function () {
	'use strict';

	angular
		.module('app')
		.factory('AgendamentoService', AgendamentoService);

	AgendamentoService.$inject = ['$http', 'API'];
	function AgendamentoService($http, API) {
		var service = {};

		service.GetAll = function GetAll() {
			return $http.get(API + 'agendamento').then(handleSuccess, handleError('Erro obtendo lista de agendamento'));
		}

		service.GetById = function GetById(id) {
			return $http.get(API + 'agendamento/' + id).then(handleSuccess, handleError('Erro obtendo agendamento pelo ID: ' + id));
		}

		service.GetByCidadao = function GetByCidadao(id) {
			return $http.get(API + 'agendamento/cidadao/' + id).then(handleSuccess, handleError('Erro obtendo agendamento pelo ID: ' + id));
		}

		service.GetTotalNaoAtendidoByCidadao = function GetTotalNaoAtendidoByCidadao(id) {
			return $http.get(API + 'agendamento/totalagendamentonaoatendidoporcidadao/' + id).then(handleSuccess, handleError('Erro obtendo total de agendamento pelo ID do cidadão: ' + id));
		}

		service.GetHorarios = function GetHorarios(config) {
			return $http.get(API + 'agendamento/horarios', config).then(handleSuccess, handleError('Erro obtendo horarios disponiveis para agendamento'));
		}

		service.Delete = function Delete(id) {
			return $http.delete(API + 'agendamento/' + id).then(handleSuccess, handleError('Erro ao excluir agendamento pelo ID: ' + id));
		}

		service.DeleteSintoma = function DeleteSintoma(id) {
			return $http.delete(API + 'agendamento/sintoma/' + id).then(handleSuccess, handleError('Erro ao excluir agendamento pelo ID: ' + id));
		}

		service.Create = function Create(agendamento) {
			return $http.post(API + 'agendamento/', agendamento).then(handleSuccess, handleError('Erro ao criar agendamento'));
		}

		service.Update = function Update(agendamento, id) {
			return $http.put(API + 'agendamento/' + id, agendamento).then(handleSuccess, handleError('Erro ao atualizar agendamento'));
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
