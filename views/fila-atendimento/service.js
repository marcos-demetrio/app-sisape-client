(function () {
	'use strict';

	angular
		.module('app')
		.factory('FilaAtendimentoService', FilaAtendimentoService);

	FilaAtendimentoService.$inject = ['$http', 'API'];
	function FilaAtendimentoService($http, API) {
		var service = {};

		service.GetAgendamentoNaoAtendido = function GetAgendamentoNaoAtendido() {
			return $http.get(API + 'agendamento/naoatendido').then(handleSuccess, handleError('Erro obtendo lista de agendamento não atendido'));
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
