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

		//-- Controle Panels do prontuário
		$scope.panel = [];
		
		$scope.collapsePanel = function(panelNum){
			$scope.panel[panelNum].collapsed = !$scope.panel[panelNum].collapsed;
		};
		$scope.isPanelCollapsed = function(panelNum){
			return $scope.panel[panelNum].collapsed;
		};
		//--

		//-- Controle tab do prontuário
		$scope.panel = [];
		
		$scope.setTab = function(index, tabNum){
			$scope.panel[index].tabSelected = tabNum;
		};
		$scope.isTab = function(index, tabNum){
			return $scope.panel[index].tabSelected === tabNum;
		};
		//--

		//-- Inicia variaveis do prontuário
		$scope.listaVazia = true;
		$scope.atendimentos = [];
		//--

		//-- Ao selecionar um cidadão
		$scope.OnChangeCidadao = function(cidadao) {
			AtendimentoService.GetAll().then(function(data){
				$scope.atendimentos = data;
				
				for (var i = data.length - 1; i >= 0; i--) {
					$scope.panel.push({
						collapsed: false,
						tabSelected: 1	
					});
				};

				$scope.listaVazia = $scope.atendimentos.length === 0;

				$scope.temExame = $scope.atendimentos.atendimentoExame.length === 0;
			});
		}
		//--
	}
})();