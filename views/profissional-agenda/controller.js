﻿(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProfissionalAgendaController', ProfissionalAgendaController);

	ProfissionalAgendaController.$inject = ['$scope', '$rootScope', '$location', '$route', '$routeParams', '$timeout', 'ProfissionalAgendaService', 'ProfissionalLotacaoService', 'UbsService', 'ProfissionalService', 'CboService'];

	function ProfissionalAgendaController($scope, $rootScope, $location, $route, $routeParams, $timeout, ProfissionalAgendaService, ProfissionalLotacaoService, UbsService, ProfissionalService, CboService) {
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
			if($rootScope.userLoggedIn.tipoUsuario == 'G'){
				for (var i = data.length - 1; i >= 0; i--) {
					if(data[i].profissional.tipoUsuario == 'S'){
						data.splice(i, 1);
					}
				};
			}
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

		//-- Limpa dados do campo caso desmarque a opção no checkbox dos horáriios
		$scope.setFocusHorario = function(periodo, index) {
			//horarioMatutino: false, horarioMatutinoInicio: null, horarioMatutinoFim: null,
			//horarioVespertino: false, horarioVespertinoInicio: null, horarioVespertinoFim: null,
			//horarioNoturno: false, horarioNoturnoInicio: null, horarioNoturnoFim: null}
			$timeout(function() {
				switch (periodo) {
					case 'M':
						if(!$scope.diasSemana[index].horarioMatutino){
							$scope.diasSemana[index].horarioMatutinoInicio = null;
							$scope.diasSemana[index].horarioMatutinoFim = null;
						}else{
							$('#horarioMatutinoInicio' + index).focus();
						}

						break;
					case 'V':
						if(!$scope.diasSemana[index].horarioVespertino){
							$scope.diasSemana[index].horarioVespertinoInicio = null;
							$scope.diasSemana[index].horarioVespertinoFim = null;
						}else{
							$('#horarioVespertinoInicio' + index).focus();
						}

						break;
					case 'N':
						if(!$scope.diasSemana[index].horarioNoturno){
							$scope.diasSemana[index].horarioNoturnoInicio = null;
							$scope.diasSemana[index].horarioNoturnoFim = null;
						}else{
							$('#horarioNoturnoInicio' + index).focus();
						}

						break;
				}
			}, 1);

			/*$timeout(function() {
				$(idHorarioInicio).focus();
				
				$(idHorarioInicio).val(null);
				$(idHorarioFim).val("");
			}, 1);*/
		};
		//--	
	}
})();
