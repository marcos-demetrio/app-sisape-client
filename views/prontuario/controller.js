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

		//-- Controle Panels
		$scope.panel = [];
		
		$scope.collapsePanel = function(panelNum){
			$scope.panel[panelNum].collapsed = !$scope.panel[panelNum].collapsed;
		};
		$scope.isPanelCollapsed = function(panelNum){
			return $scope.panel[panelNum].collapsed;
		};
		//--

		//--
		$scope.listaVazia = true;
		$scope.atendimentos = [];

		//-- Ao selecionar um cidadão
		$scope.OnChangeCidadao = function(cidadao) {
			AtendimentoService.GetAll().then(function(data){
				$scope.atendimentos = data;
				console.log(data);
				
				for (var i = data.length - 1; i >= 0; i--) {
					$scope.panel.push({
						collapsed: false	
					});
				};

				$scope.listaVazia = $scope.atendimentos.length === 0;
			});
		}
		//--
	}
})();