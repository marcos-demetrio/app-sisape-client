(function () {
	'use strict';

	angular
		.module('app')
		.controller('AgendamentoController', AgendamentoController)
		.controller('AgendamentoListagemController', AgendamentoListagemController);

	AgendamentoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'AgendamentoService'];

	function AgendamentoController($scope, $location, $route, $routeParams, AgendamentoService) {
		
		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var agendamentoID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (agendamentoID > 0);
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(agendamentoID > 0){
			AgendamentoService.GetById(agendamentoID).then(function(data){
				$scope.form = data;
			});
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
							$location.path('/pais');
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
							$location.path('/pais');
							$route.reload();
						}
					});
			}else{
				$location.path('/pais');
			}
		}
		//--

  		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			if(agendamentoID > 0){
				AgendamentoService.Update($scope.form, agendamentoID).then(function(data){
					$location.path('/pais');
				})
			}else{
				AgendamentoService.Create($scope.form).then(function(data){
					$location.path('/pais');
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
