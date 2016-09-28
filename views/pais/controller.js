(function () {
	'use strict';

	angular
		.module('app')
		.controller('PaisController', PaisController)
		.controller('PaisListagemController', PaisListagemController);

	PaisController.$inject = ['$scope', '$location', '$route', '$routeParams', 'PaisService'];

	function PaisController($scope, $location, $route, $routeParams, PaisService) {
		
		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var paisID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (paisID > 0);
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(paisID > 0){
			PaisService.GetById(paisID).then(function(data){
				$scope.form = data;
			});
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
						PaisService.Delete(paisID).then(function(data){
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
			if(paisID > 0){
				PaisService.Update($scope.form, paisID).then(function(data){
					$location.path('/pais');
				})
			}else{
				PaisService.Create($scope.form).then(function(data){
					$location.path('/pais');
				});
			}
		}
		//--
	}

	PaisListagemController.$inject = ['$scope','$location', '$window', 'PaisService'];

	function PaisListagemController($scope, $location, $window, PaisService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		PaisService.GetAll().then(function(data){
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
			PaisService.PesquisarPorNome(config).then(function(data){
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
	}
})();
