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
			});
		}
		//--

		//-- Adicionar sintoma
		$scope.mudouCidadao = function() {
			ubsID = $scope.form.cidadao.unidadeBasicaSaude.i_unidade_basica_saude;

			AgendamentoService.GetHorariosByUbs(ubsID).then(function(data){
				for (var i = data[0].senhas.length - 1; i >= 0; i--) {
					data[0].senhas[i].horario = new Date(data[0].senhas[i].horario);
				};

				$scope.listaHorarios = data[0];

				console.log($scope.listaHorarios);
			});
		}
		//--

		//-- Carregar lista de horarios
		/*AgendamentoService.GetHorariosByUbs($scope.form.cidadao.i_unidade_basica_saude).then(function(data){
			$scope.listaHorarios = data;
			console.log(data);
		});*/
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
