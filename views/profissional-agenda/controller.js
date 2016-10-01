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
				var dias = [];
				$scope.diasSemana = [];

				dias = data;

				$scope.editandoCadastro = (data.length > 0);
				
				if(data.length === 0){
					dias = [
						{i_profissional_agenda: null, lotacao: null, diaSemana: "DOMINGO"			, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "SEGUNDA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "TERCA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "QUARTA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "QUINTA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "SEXTA_FEIRA"	, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null},
						{i_profissional_agenda: null, lotacao: null, diaSemana: "SABADO"			, horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null, horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null, horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null}
					];
				}

				var dateArray = [];
				for (var i = dias.length - 1; i >= 0; i--) {
					if(dias[i].horarioMatutinoInicio != null){
						dateArray = dias[i].horarioMatutinoInicio.split(":");

						dias[i].horarioMatutinoInicio = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(dias[i].horarioMatutinoFim != null){
						dateArray = dias[i].horarioMatutinoFim.split(":");

						dias[i].horarioMatutinoFim = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(dias[i].horarioVespertinoInicio != null){
						dateArray = dias[i].horarioVespertinoInicio.split(":");

						dias[i].horarioVespertinoInicio = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(dias[i].horarioVespertinoFim != null){
						dateArray = dias[i].horarioVespertinoFim.split(":");

						dias[i].horarioVespertinoFim = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(dias[i].horarioNoturnoInicio != null){
						dateArray = dias[i].horarioNoturnoInicio.split(":");

						dias[i].horarioNoturnoInicio = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(dias[i].horarioNoturnoFim != null){
						dateArray = dias[i].horarioNoturnoFim.split(":");

						dias[i].horarioNoturnoFim = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}
				}

				$scope.diasSemana = dias;
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

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			var lotacaoID = $scope.form.lotacao.i_profissional_lotacao;
			if($scope.editandoCadastro){
				ProfissionalAgendaService.Update($scope.diasSemana, lotacaoID).then(function(data){
					$location.path('/agenda');
					$route.reload();
				});
			}else{			
				ProfissionalAgendaService.Create($scope.diasSemana, lotacaoID).then(function(data){
					$location.path('/agenda');
					$route.reload();
				});
			}
		}
		//--
	}
})();
