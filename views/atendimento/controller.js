(function () {
	'use strict';

	angular
		.module('app')
		.controller('AtendimentoController', AtendimentoController)
		.controller('AtendimentoListagemController', AtendimentoListagemController);

	AtendimentoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'AtendimentoService', 'AgendamentoService'];

	function AtendimentoController($scope, $location, $route, $routeParams, AtendimentoService, AgendamentoService) {

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
		
		/*if($scope.form.agendamentoSintoma == null){
			$scope.form.agendamentoSintoma = [];
		}*/
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
	}

	AtendimentoListagemController.$inject = ['$scope','$location', '$window', 'AtendimentoService'];

	function AtendimentoListagemController($scope, $location, $window, AtendimentoService) {

	}
})();
