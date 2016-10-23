(function () {
	'use strict';

	angular
		.module('app')
		.controller('AgendamentoController', AgendamentoController)
		.controller('AgendamentoListagemController', AgendamentoListagemController);

	AgendamentoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'AgendamentoService', 'CidadaoService', 'ProfissionalLotacaoService', 'CidService'];

	function AgendamentoController($scope, $location, $route, $routeParams, AgendamentoService, CidadaoService, ProfissionalLotacaoService, CidService) {
		
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

		//-- Caso esteja editando, obtem os dados do cadastro
		if(agendamentoID > 0){
			AgendamentoService.GetById(agendamentoID).then(function(data){
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

		$scope.listaHorarios = [];

		//-- Adicionar sintoma
		$scope.mudouCidadao = function() {
			ubsID = $scope.form.cidadao.unidadeBasicaSaude.i_unidade_basica_saude;

			AgendamentoService.GetHorariosByUbs(ubsID).then(function(data){
				//console.log(data);

				for (var i = data.length - 1; i >= 0; i--) {
					$scope.listaHorarios.push({
						horario: new Date(data[i].horario)
					});
					//data[i].horario = new Date(data[i].horario);
				};
				//$scope.listaHorarios.push(null)
				console.log($scope.listaHorarios);
				//$scope.listaHorarios = data;
			});
		}
		//--

		//-- Adicionar sintoma
		$scope.mudouData = function() {
			console.log($scope.form.dataAgendamento)
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

		//-- Carregar lista de Cidadao
		CidadaoService.GetAll().then(function(data){
			$scope.cidadaos = data;
		});
		//--

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

			$scope.form.agendamentoSintoma.push(sintoma);
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o país após excluir.",
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
			if(item.i_sequencial > 0){
				$scope.sintomasExcluidos.push({
					itemSintoma: item
				});
			}

			$scope.form.agendamentoSintoma.splice(index, 1);
		}
		//--

		//-- Cancela operação no cadastro, se alterou alguma informação, faz a confirmação
		$scope.cancelar = function(dirty) {
			if(dirty){
				swal({   
						title: "Tem certeza?",
						text: "Você não poderá recuperar os dados alterados do país após cancelar.",
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
			if(agendamentoID > 0){
				console.log($scope.form);
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

	AgendamentoListagemController.$inject = ['$scope','$location', '$window', 'AgendamentoService'];

	function AgendamentoListagemController($scope, $location, $window, AgendamentoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		$scope.atualizarAgendamentos = function(){
			AgendamentoService.GetAll().then(function(data){
				$scope.itens = data;
				$scope.totalItens = $scope.itens.length;

				$scope.listaVazia = $scope.itens.length === 0;
			});
		}

		$scope.atualizarAgendamentos();
	}
})();
