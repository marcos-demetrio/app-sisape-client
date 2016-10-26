(function () {
	'use strict';

	angular
		.module('app')
		.controller('AtendimentoController', AtendimentoController)
		.controller('AtendimentoListagemController', AtendimentoListagemController)
		.controller('AtendimentoRelatorioController', AtendimentoRelatorioController);

	AtendimentoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'AtendimentoService', 'UbsService', 'ProfissionalService', 'CidadaoService'];

	function AtendimentoController($scope, $location, $route, $routeParams, AtendimentoService, UbsService, ProfissionalService, CidadaoService) {
		
		//-- Campo Data
		$scope.popup2 = {
			opened: false
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};
		//--
		
	}

	AtendimentoListagemController.$inject = ['$scope','$location', '$window', 'AtendimentoService'];

	function AtendimentoListagemController($scope, $location, $window, AtendimentoService) {

	}
	
	AtendimentoRelatorioController.$inject = ['$scope','$location', '$window', 'AtendimentoService', 'UbsService', 'ProfissionalService', 'CidadaoService'];

	function AtendimentoRelatorioController($scope, $location, $window, AtendimentoService, UbsService, ProfissionalService, CidadaoService) {
		$scope.listaVazia = true;
		$scope.itens = [];
		
		$scope.filtro = 'VAZIO';
		
		//-- Carregar lista de Ubs
		UbsService.GetAll().then(function(data){
			$scope.ubss = data;
		});
		//--
		
		//-- Carregar lista de Profissional
		ProfissionalService.GetAll().then(function(data){
			$scope.profissionais = data;
		});
		//--
		
		//-- Carregar lista de Cidadao
		CidadaoService.GetAll().then(function(data){
			$scope.cidadaos = data;
		});
		//--

		//-- Campo Data
		$scope.popup2 = {
			opened: false
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};
		//--
		
		//-- Campo Data
		$scope.popup3 = {
			opened: false
		};

		$scope.open3 = function() {
			$scope.popup3.opened = true;
		};
		
		//--
		AtendimentoService.GetAll().then(function(data){
			$scope.itens = data;
			$scope.totalItens = $scope.itens.length;

			$scope.listaVazia = $scope.itens.length === 0;
		});

		//-- Pesquisa
		$scope.AtendimentoPesquisar = function (){
			var parameters = {
				tipoFiltro : $scope.filtro,
				codigoUbs : $scope.unidadeBasicaSaude,
				codigoProfissional : $scope.profissional,
				codigoCidadao : $scope.cidadao,
				dataAtendimentoInicial : $scope.dataAtendimentoInicio,
				dataAtendimentoFinal : $scope.dataAtendimentoFinal
			};

			var config = {
				params : parameters
			};

			$scope.itens = [];
			AtendimentoService.PesquisarPorFiltro(config).then(function(data){
				$scope.itens = data;

				$scope.listaVazia = $scope.itens.length === 0;
			});
		}
		//--

		//-- Limpar
		$scope.AtendimentoLimpar = function (){
			$scope.filtro = 'VAZIO';
			$scope.unidadeBasicaSaude = null;
			$scope.profissional = null;
			$scope.cidadao = null;
			$scope.dataAtendimentoInicio = null;
			$scope.dataAtendimentoFinal = null;
			$window.document.getElementById('filtro').focus();
		}
		//--
		
		//-- Imprimir
		$scope.AtendimentoImprimir = function (){
			var parameters = {
				nome : $scope.nomeCbo,
				codigoCbo : $scope.codigoCbo
			};

			var config = {
				params : parameters
			};
			
			AtendimentoService.Print(config).then(function(data){
					$location.path('/cbo');
				})
		}
		//--
	}
})();
