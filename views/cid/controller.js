(function () {
	'use strict';

	angular
		.module('app')
		.controller('CidController', CidController)
		.controller('CidListagemController', CidListagemController);

	CidController.$inject = ['$scope', '$location', '$route', '$routeParams', 'CidService'];

	function CidController($scope, $location, $route, $routeParams, CidService) {

		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var cidID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (cidID > 0);
		//--
		
		//-- Caso esteja editando, obtem os dados do cadastro
		if(cidID > 0){
			CidService.GetById(cidID).then(function(data){
				$scope.form = data;
			});
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o CID após excluir.",
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
						CidService.Delete(cidID).then(function(data){
							$location.path('/cid');
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
						text: "Você não poderá recuperar os dados alterados do CID após cancelar.",
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
							$location.path('/cid');
							$route.reload();
						}
					});
			}else{
				$location.path('/cid');
			}
		}
		//--

  		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			if(cidID > 0){
				CidService.Update($scope.form, cidID).then(function(data){
					$location.path('/cid');
				})
			}else{
				CidService.Create($scope.form).then(function(data){
					$location.path('/cid');
				});
			}
		}
		//--
	}

	CidListagemController.$inject = ['$scope', '$location', '$window', 'CidService'];

	function CidListagemController($scope, $location, $window, CidService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		CidService.GetAll().then(function(data){
			$scope.itens = data;
			$scope.totalItens = $scope.itens.length;

			$scope.listaVazia = $scope.itens.length === 0;
		});

		//-- Pesquisa
		$scope.Pesquisar = function (){
			var parameters = {
				descricao : $scope.descricao,
				codigoCid : $scope.codigoCid
			};

			var config = {
				params : parameters
			};

			$scope.itens = [];
			CidService.PesquisarPorFiltro(config).then(function(data){
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
			var parameters = {
				descricao : $scope.descricao,
				codigoCid : $scope.codigoCid
			};

			var config = {
				params : parameters
			};
			CidService.Print(config).then(function(data){
					$location.path('/cid');
				})
		}
		//--
	}
})();
