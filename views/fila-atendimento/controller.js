(function () {
	'use strict';

	angular
		.module('app')
		.controller('FilaAtendimentoController', FilaAtendimentoController);

	FilaAtendimentoController.$inject = ['$scope','$location', '$window', 'FilaAtendimentoService'];

	function FilaAtendimentoController($scope, $location, $window, FilaAtendimentoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		$scope.atualizarFilaAtendimento = function(){
			FilaAtendimentoService.GetAgendamentoNaoAtendido().then(function(data){

				for (var i = data.length - 1; i >= 0; i--) {
					data[i].horaAgendamento = new Date(data[i].horaAgendamento);
				};

				$scope.itens = data;
				$scope.totalItens = $scope.itens.length;

				$scope.listaVazia = $scope.itens.length === 0;
			});
		}

		$scope.atualizarFilaAtendimento();
	}
})();
