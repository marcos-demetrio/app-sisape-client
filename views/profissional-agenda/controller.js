(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProfissionalAgendaController', ProfissionalAgendaController);

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
				
				$scope.editandoCadastro = (data.length > 0);
				
				if(data.length === 0){
					$scope.diasSemana = [
						{i_profissional_agenda: null, lotacao: null, diaSemana: "DOMINGO"			, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "SEGUNDA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "TERCA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "QUARTA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "QUINTA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "SEXTA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "SABADO"			, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null}
					];
				}
				
				//console.log($scope.diasSemana);
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
			var lotacaoID = $scope.form.lotacao.i_profissional_lotacao;
			
			if($scope.editandoCadastro){
				ProfissionalAgendaService.Update($scope.diasSemana, lotacaoID).then(function(data){
					//$location.path('/agenda');
					$scope.form.lotacao = null;
				});
			}else{			
				ProfissionalAgendaService.Create($scope.diasSemana, lotacaoID).then(function(data){
					//$location.path('/agenda');
					$scope.form.lotacao = null;
				});
			}
		}
		//--
	}
})();
