﻿(function () {
	'use strict';

	angular
		.module('app')
		.controller('AgendamentoController', AgendamentoController)
		.controller('AgendamentoListagemController', AgendamentoListagemController);

	AgendamentoController.$inject = ['$scope', '$rootScope', '$location', '$route', '$routeParams', '$filter', 'AgendamentoService', 'CidadaoService', 'ProfissionalLotacaoService', 'CidService'];

	function AgendamentoController($scope, $rootScope, $location, $route, $routeParams, $filter, AgendamentoService, CidadaoService, ProfissionalLotacaoService, CidService) {
		
		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var agendamentoID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (agendamentoID > 0);

		//--

		if($scope.form == null){
			$scope.form = {};
		}
		
		if($scope.form.agendamentoSintoma == null){
			$scope.form.agendamentoSintoma = [];
		}

		var ubsID = 0;

		$scope.getHorarios = function(ubsID) {
			AgendamentoService.GetHorariosByUbs(ubsID).then(function(data){
				var newDate;
				$scope.listaHorarios = [];
				for (var i = data.length - 1; i >= 0; i--) {
					newDate = new Date(data[i].horario);
					newDate.setSeconds(0);

					$scope.listaHorarios.push({
						horario: newDate
					});
				};

				$scope.listaHorarios = $filter('orderBy')($scope.listaHorarios, 'horario', false);
			});
		}

		//-- Caso esteja editando, obtem os dados do cadastro
		if(agendamentoID > 0){
			AgendamentoService.GetById(agendamentoID).then(function(data){
				ubsID = data.cidadao.unidadeBasicaSaude.i_unidade_basica_saude;

				$scope.getHorarios(ubsID);

				var newTime;
				newTime = new Date(data.horaAgendamento);
				newTime.setFullYear(2016);
				newTime.setMonth(0);
				newTime.setDate(1);
				newTime.setSeconds(0);
				newTime.setMilliseconds(0);


				data.horaAgendamento = newTime;

				$scope.form = data;

				var date = new Date();
				var str = data.dataAgendamento;
				var dateArray = str.split("-");

				date.setFullYear(parseInt(dateArray[0]));
				date.setMonth(parseInt(dateArray[1])-1);  // months indexed as 0-11, substract 1
				date.setDate(parseInt(dateArray[2]));

				$scope.form.dataAgendamento = date;
			});
		}
		//--

		//-- Obter horários
		$scope.mudouCidadao = function() {
			ubsID = $scope.form.cidadao.unidadeBasicaSaude.i_unidade_basica_saude;

			$scope.getHorarios(ubsID);
		}
		//--

		var horarioAtivo = [
			{numero: 0},
			{numero: 0},
			{numero: 0}
		];

		$scope.clickHorario = function(numeroAtivo, periodoDia) {
			switch (periodoDia) {
				case "M":
					horarioAtivo[0].ativo = numeroAtivo;
					break;
				case "V":
					horarioAtivo[1].ativo = numeroAtivo;
					break;
				case "N":
					horarioAtivo[2].ativo = numeroAtivo;
					break;
			}
		}

		$scope.isActive = function(numeroAtivo, periodoDia) {
			var horarioAtivoReturn = false;

			switch (periodoDia) {
				case "M":
					horarioAtivoReturn = horarioAtivo[0].ativo == numeroAtivo;
					break;
				case "V":
					horarioAtivoReturn = horarioAtivo[1].ativo == numeroAtivo;
					break;
				case "N":
					horarioAtivoReturn = horarioAtivo[2].ativo == numeroAtivo;
					break;
			}

			return horarioAtivoReturn;
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

		switch($rootScope.globals.currentUser.tipoUsuario){
			case 'C':
				CidadaoService.GetById($rootScope.globals.currentUser.id).then(function(data){
					$scope.form.cidadao = data;

					var ubsID = data.unidadeBasicaSaude.i_unidade_basica_saude;

					$scope.getHorarios(ubsID);
				});

				break;
			default:
				//-- Carregar lista de Cidadao
				CidadaoService.GetAll().then(function(data){
					$scope.cidadaos = data;
				});
				//--
		}

		//-- Carregar lista de CID's
		CidService.GetAll().then(function(data){
			$scope.listaCid = data;
			$scope.listaCid.push(null);
		});
		//--

		//-- Carregar lista de Profissionais
		ProfissionalLotacaoService.GetAll().then(function(data){
			$scope.profissionais = data;
		});
		//--
		
		//-- Adicionar sintoma
		$scope.adicionarSintoma = function() {
			var sintoma = {
				i_cid: null,
				descricao: ''
			}

			if(!$scope.editandoCadastro){
				$scope.form.agendamentoSintoma.push(sintoma);
			}
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o agendamento após excluir.",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Sim, excluir agora!",
					cancelButtonText: "Não!",
					closeOnConfirm: true,
					closeOnCancel: true
				},
				function(isConfirm){
					if (isConfirm) {
						AgendamentoService.Delete(agendamentoID).then(function(data){
							$location.path('/agendamento');
							$route.reload();
						});
					}
				});
  		}
  		//--

  		$scope.sintomasExcluidos = [];

		//-- Excluir sintoma, não faz a confirmação
		$scope.excluirSintoma = function(item, index) {
			if(!$scope.editandoCadastro){
				if(item.i_sequencial > 0){
					$scope.sintomasExcluidos.push({
						itemSintoma: item
					});
				}

				$scope.form.agendamentoSintoma.splice(index, 1);
			}
		}
		//--

		//-- Cancela operação no cadastro, se alterou alguma informação, faz a confirmação
		$scope.cancelar = function(dirty) {
			if(dirty){
				swal({   
						title: "Tem certeza?",
						text: "Você não poderá recuperar os dados alterados do agendamento após cancelar.",
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "Sim, cancelar agora!",
						cancelButtonText: "Não!",
						closeOnConfirm: true,
						closeOnCancel: true
					},
					function(isConfirm){
						if (isConfirm) {
							$location.path('/agendamento');
							$route.reload();
						}
					});
			}else{
				$location.path('/agendamento');
			}
		}
		//--

  		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){

			$scope.form.atendido = false
			$scope.form.horaAgendamento = new Date($scope.form.horaAgendamento.horario);

			if(agendamentoID > 0){
				AgendamentoService.Update($scope.form, agendamentoID).then(function(data){
					var sintomaID = 0;

					for (var i = $scope.sintomasExcluidos.length - 1; i >= 0; i--) {
						sintomaID = $scope.sintomasExcluidos[i].itemSintoma.i_sequencial;

						AgendamentoService.DeleteSintoma(sintomaID).then(function(data){

						});
					};

					$location.path('/agendamento');
				})
			}else{
				AgendamentoService.Create($scope.form).then(function(data){
					$location.path('/agendamento');
				});
			}
		}
		//--
	}

	AgendamentoListagemController.$inject = ['$scope', '$rootScope', '$location', '$window', '$filter', 'AgendamentoService'];

	function AgendamentoListagemController($scope, $rootScope, $location, $window, $filter, AgendamentoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		$scope.atualizarAgendamentosTodos = function(){
			AgendamentoService.GetAll().then(function(data){
				$scope.itens = data;
				$scope.totalItens = $scope.itens.length;

				$scope.listaVazia = $scope.itens.length === 0;

				$filter('orderBy')($scope.itens, ['dataAgendamento', 'horaAgendamento'], false);
			});
		}

		$scope.atualizarAgendamentosCidadao = function(id){
			AgendamentoService.GetByCidadao(id).then(function(data){
				$scope.itens = data;
				$scope.totalItens = $scope.itens.length;

				$scope.listaVazia = $scope.itens.length === 0;
			});
		}

		switch($rootScope.globals.currentUser.tipoUsuario){
			case 'C':
				$scope.atualizarAgendamentosCidadao($rootScope.globals.currentUser.id);
				break;
			default:
				$scope.atualizarAgendamentosTodos();
		}
	}
})();
