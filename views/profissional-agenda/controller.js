(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProfissionalAgendaController', ProfissionalAgendaController)
		.controller('ProfissionalAgendaListagemController', ProfissionalAgendaListagemController);

	ProfissionalAgendaController.$inject = ['$scope', '$location', '$route', '$routeParams', 'ProfissionalAgendaService', 'ProfissionalLotacaoService', 'UbsService', 'ProfissionalService', 'CboService'];

	function ProfissionalAgendaController($scope, $location, $route, $routeParams, ProfissionalAgendaService, ProfissionalLotacaoService, UbsService, ProfissionalService, CboService) {
		//-- Controle Panels
		$scope.panel = [
			{collapsed: false},
			{collapsed: false},
			{collapsed: false},
			{collapsed: false},
			{collapsed: false},
			{collapsed: false},
			{collapsed: false}
		];
		
		$scope.collapsePanel = function(panelNum){
			$scope.panel[panelNum].collapsed = !$scope.panel[panelNum].collapsed;
		};
		$scope.isPanelCollapsed = function(panelNum){
			return $scope.panel[panelNum].collapsed;
		};
		//--
	
		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var agendaID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (agendaID > 0);
		//--

		//-- Carregar lista de Lotação
		ProfissionalLotacaoService.GetAll().then(function(data){
			$scope.lotacoes = data;
		});
		//--

		//-- Ao selecionar uma lotacao
		$scope.selecionarAgenda = function(idLotacao) {
			ProfissionalAgendaService.GetByLotacao(idLotacao).then(function(data){
				$scope.diasSemana = [];
				$scope.diasSemana = data;
				
				if(data.length > 0){
					console.log(data);
				}else{
					$scope.diasSemana = [
						{diaSemana: "DOMINGO"		, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{diaSemana: "SEGUNDA_FEIRA", horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{diaSemana: "TERCA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{diaSemana: "QUARTA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{diaSemana: "QUINTA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{diaSemana: "SEXTA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{diaSemana: "SABADO"			, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null}
					];
				}
				
				console.log($scope.diasSemana);
			});
		}
		//--
		
		$scope.getDescricaoDiaSemana = function (diaSemana) {
			var descricaoDiaSemana = '';
			switch (diaSemana) {
				case 'DOMINGO':
					descricaoDiaSemana = 'Domingo';
					break;
				case 'SEGUNDA_FEIRA':
					descricaoDiaSemana = "Segunda-feira";
					break;                      
				case 'TERCA_FEIRA':
					descricaoDiaSemana = "Terça-feira";
					break;                      
				case 'QUARTA_FEIRA':
					descricaoDiaSemana = "Quarta-feira";
					break;                      
				case 'QUINTA_FEIRA':
					descricaoDiaSemana = "Quinta-feira";
					break;                      
				case 'SEXTA_FEIRA':
					descricaoDiaSemana = "Sexta-feira";
					break;                      
				case 'SABADO':
					descricaoDiaSemana = "Sábado";
					break;
				default: ''
			}
			return descricaoDiaSemana;
		}

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar a agenda após excluir.",
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
						ProfissionalAgendaService.Delete(agendaID).then(function(data){
							$location.path('/lotacao');
							$route.reload();
						});
					}
				});
		}
		//--

		//-- Cancela operação no cadastro, se alterou alguma informação, faz a confirmação
		$scope.cancelar = function(dirty) {
			if(dirty){
				swal({   
						title: "Tem certeza?",
						text: "Você não poderá recuperar os dados alterados da agenda após cancelar.",
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
							$location.path('/lotacao');
							$route.reload();
						}
					});
			}else{
				$location.path('/lotacao');
			}
		}
		//--

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			var pais = angular.fromJson($scope.form.pais);

			$scope.form.pais = pais;

			if(agendaID > 0){
				ProfissionalAgendaService.Update($scope.form, agendaID).then(function(data){
					$location.path('/lotacao');
				})
			}else{			
				ProfissionalAgendaService.Create($scope.form).then(function(data){
					$location.path('/lotacao');
				});
			}
		}
		//--
	}

	ProfissionalAgendaListagemController.$inject = ['$scope', '$location', '$window', 'ProfissionalAgendaService'];

	function ProfissionalAgendaListagemController($scope, $location, $window, ProfissionalAgendaService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		ProfissionalAgendaService.GetAll().then(function(data){
			$scope.itens = data;
			$scope.totalItens = $scope.itens.length;

			$scope.listaVazia = $scope.itens.length === 0;
		});
	}
})();
