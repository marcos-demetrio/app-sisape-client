(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProntuarioController', ProntuarioController);

	ProntuarioController.$inject = ['$scope', 'AtendimentoService', 'CidadaoService'];

	function ProntuarioController($scope, AtendimentoService, CidadaoService) {
		//-- Carregar lista de Cidadão
		CidadaoService.GetAll().then(function(data){
			$scope.cidadaos = data;
		});
		//--

		$scope.listaVazia = true;
		$scope.atendimentos = [];

		//-- Ao selecionar um cidadão
		$scope.OnChangeCidadao = function(cidadao) {
			AtendimentoService.GetAll().then(function(data){
				$scope.atendimentos = data;

				$scope.listaVazia = $scope.atendimentos.length === 0;
			});
		}
		//--
	}
})();