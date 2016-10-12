(function () {
	'use strict';

	angular
		.module('app')
		.controller('EstadoController', EstadoController)
		.controller('EstadoListagemController', EstadoListagemController);

	EstadoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'EstadoService', 'PaisService'];

	function EstadoController($scope, $location, $route, $routeParams, EstadoService, PaisService) {

		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var estadoID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (estadoID > 0);
		//--

		//-- Carregar lista de países
		PaisService.GetAll().then(function(data){
			$scope.paises = data;
		});
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(estadoID > 0){
			EstadoService.GetById(estadoID).then(function(data){
				$scope.form = data;
			});
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o estado após excluir.",
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
						EstadoService.Delete(estadoID).then(function(data){
							$location.path('/estado');
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
						text: "Você não poderá recuperar os dados alterados do estado após cancelar.",
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
							$location.path('/estado');
							$route.reload();
						}
					});
			}else{
				$location.path('/estado');
			}
		}
		//--

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			var pais = angular.fromJson($scope.form.pais);

			$scope.form.pais = pais;

			if(estadoID > 0){
				EstadoService.Update($scope.form, estadoID).then(function(data){
					$location.path('/estado');
				})
			}else{			
				EstadoService.Create($scope.form).then(function(data){
					$location.path('/estado');
				});
			}
		}
		//--
	}

	EstadoListagemController.$inject = ['$scope', '$location', '$window', 'EstadoService'];

	function EstadoListagemController($scope, $location, $window, EstadoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		EstadoService.GetAll().then(function(data){
			$scope.itens = data;
			$scope.totalItens = $scope.itens.length;

			$scope.listaVazia = $scope.itens.length === 0;
		});

		//-- Pesquisa
		$scope.Pesquisar = function (){
			var parameters = {
				nome : $scope.keyword
			};

			var config = {
				params : parameters
			};

			$scope.itens = [];
			EstadoService.PesquisarPorNome(config).then(function(data){
				$scope.itens = data;

				$scope.listaVazia = $scope.itens.length === 0;
			});
		}
		//--

		//-- Limpar
		$scope.Limpar = function (){
			$scope.keyword = '';
			$window.document.getElementById('input-nome').focus();
		}
		//--
		
		//-- Imprimir
		$scope.Imprimir = function (){
			EstadoService.Print($scope.form).then(function(data){
					$location.path('/estado');
				})
		}
		//--
	}
})();
