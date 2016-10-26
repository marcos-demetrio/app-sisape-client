﻿(function () {
	'use strict';

	angular
		.module('app')
		.controller('AtendimentoController', AtendimentoController)
		.controller('AtendimentoListagemController', AtendimentoListagemController);

	AtendimentoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'AtendimentoService', 'AgendamentoService', 'CidService', 'ExameService', 'MedicamentoService'];

	function AtendimentoController($scope, $location, $route, $routeParams, AtendimentoService, AgendamentoService, CidService, ExameService, MedicamentoService) {

		//-- Controle Tabs
		$scope.tab = 1;
		$scope.setTab = function(newTab){
			$scope.tab = newTab;
		};
		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};
		//--

		//-- Inicializa formulário
		if($scope.form == null){
			$scope.form = {};
		}
		
		if($scope.form.atendimentoSintoma == null){
			$scope.form.atendimentoSintoma = [];
		}

		if($scope.form.atendimentoMedicamento == null){
			$scope.form.atendimentoMedicamento = [];
		}

		if($scope.form.atendimentoExame == null){
			$scope.form.atendimentoExame = [];
		}
		//--

		//-- Campo Data
		$scope.popup2 = {
			opened: false
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};
		//--

		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var atendimentoID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (atendimentoID > 0);
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(atendimentoID > 0){
			AtendimentoService.GetById(atendimentoID).then(function(data){
				$scope.form = data;

				var date = new Date();
				var str = data.dataAtendimento;
				var dateArray = str.split("-");

				date.setFullYear(parseInt(dateArray[0]));
				date.setMonth(parseInt(dateArray[1])-1);  // months indexed as 0-11, substract 1
				date.setDate(parseInt(dateArray[2]));

				$scope.form.dataAtendimento = date;
			});
		}
		//--

		//-- Carregar lista de Agendamento
		AgendamentoService.GetAll().then(function(data){
			$scope.agendamentos = data;
		});
		//--

		//-- Carregar lista de CID's
		CidService.GetAll().then(function(data){
			$scope.listaCid = data;
		});
		//--

		//-- Carregar lista de Exame's
		ExameService.GetAll().then(function(data){
			$scope.listaExame = data;
		});
		//--

		//-- Carregar lista de Medicamento's
		MedicamentoService.GetAll().then(function(data){
			$scope.listaMedicamento = data;
		});
		//--

		//-- Adicionar sintoma
		$scope.adicionarSintoma = function() {
			var sintoma = {
				i_cid: null
			}

			$scope.form.atendimentoSintoma.push(sintoma);
		}
		//--

  		$scope.sintomasExcluidos = [];

		//-- Excluir sintoma, não faz a confirmação
		$scope.excluirSintoma = function(item, index) {
			if(item.i_sequencial > 0){
				$scope.sintomasExcluidos.push({
					itemSintoma: item
				});
			}

			$scope.form.atendimentoSintoma.splice(index, 1);
		}
		//--

		//-- Adicionar medicamento
		$scope.adicionarMedicamento = function() {
			var medicamento = {
				medicamento: null,
				posologia: ''
			}

			$scope.form.atendimentoMedicamento.push(medicamento);
		}
		//--

  		$scope.medicamentosExcluidos = [];

		//-- Excluir medicamento, não faz a confirmação
		$scope.excluirMedicamento = function(item, index) {
			if(item.i_sequencial > 0){
				$scope.medicamentosExcluidos.push({
					itemMedicamento: item
				});
			}

			$scope.form.atendimentoMedicamento.splice(index, 1);
		}
		//--

		//-- Adicionar exame
		$scope.adicionarExame = function() {
			var exame = {
				exame: null
			}

			$scope.form.atendimentoExame.push(exame);
		}
		//--

  		$scope.examesExcluidos = [];

		//-- Excluir exame, não faz a confirmação
		$scope.excluirExame = function(item, index) {
			if(item.i_sequencial > 0){
				$scope.examesExcluidos.push({
					itemExame: item
				});
			}

			$scope.form.atendimentoExame.splice(index, 1);
		}
		//--

  		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			if(atendimentoID > 0){
				AtendimentoService.Update($scope.form, atendimentoID).then(function(data){
					var id = 0;

					for (var i = $scope.sintomasExcluidos.length - 1; i >= 0; i--) {
						id = $scope.sintomasExcluidos[i].itemSintoma.i_sequencial;

						AtendimentoService.DeleteSintoma(id).then(function(data){

						});
					};

					for (var i = $scope.medicamentosExcluidos.length - 1; i >= 0; i--) {
						id = $scope.medicamentosExcluidos[i].itemMedicamento.i_sequencial;

						AtendimentoService.DeleteMedicamento(id).then(function(data){

						});
					};

					for (var i = $scope.examesExcluidos.length - 1; i >= 0; i--) {
						id = $scope.examesExcluidos[i].itemExame.i_sequencial;

						AtendimentoService.DeleteExame(id).then(function(data){

						});
					};

					$location.path('/atendimento');
				})
			}else{
				AtendimentoService.Create($scope.form).then(function(data){
					$location.path('/atendimento');
				});
			}
		}
		//--
	}

	AtendimentoListagemController.$inject = ['$scope','$location', '$window', 'AtendimentoService'];

	function AtendimentoListagemController($scope, $location, $window, AtendimentoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		$scope.atualizarAtendimentos = function(){
			AtendimentoService.GetAll().then(function(data){
				$scope.itens = data;
				$scope.totalItens = $scope.itens.length;

				$scope.listaVazia = $scope.itens.length === 0;
			});
		}

		$scope.atualizarAtendimentos();
	}
})();
