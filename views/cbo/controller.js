(function () {
	'use strict';

	angular
		.module('app')
		.controller('CboController', CboController)
		.controller('CboListagemController', CboListagemController);

	CboController.$inject = ['$scope', '$location', '$route', '$routeParams', 'CboService'];

	function CboController($scope, $location, $route, $routeParams, CboService) {

		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var cboID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (cboID > 0);
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(cboID > 0){
			CboService.GetById(cboID).then(function(data){
				$scope.form = data;
			});
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o CBO após excluir.",
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
						CboService.Delete(cboID).then(function(data){
							$location.path('/cbo');
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
						text: "Você não poderá recuperar os dados alterados do CBO após cancelar.",
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
							$location.path('/cbo');
							$route.reload();
						}
					});
			}else{
				$location.path('/cbo');
			}
		}
		//--

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			if(cboID > 0){
				CboService.Update($scope.form, cboID).then(function(data){
					$location.path('/cbo');
				})
			}else{
				CboService.Create($scope.form).then(function(data){
					$location.path('/cbo');
				});
			}
		}
		//--
	}

	CboListagemController.$inject = ['$scope', '$location', '$window', 'CboService'];

	function CboListagemController($scope, $location, $window, CboService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		CboService.GetAll().then(function(data){
			$scope.itens = data;
			$scope.totalItens = $scope.itens.length;

			$scope.listaVazia = $scope.itens.length === 0;
		});

		//-- Pesquisa
		$scope.Pesquisar = function (){
			var parameters = {
				nome : $scope.nomeCbo
			};

			var config = {
				params : parameters
			};

			$scope.itens = [];
			CboService.PesquisarPorFiltro(config).then(function(data){
				$scope.itens = data;

				$scope.listaVazia = $scope.itens.length === 0;
			});
		}
		//--

		//-- Limpar
		$scope.Limpar = function (){
			$scope.nomeCbo = '';
			$scope.codigoCbo = null;
			$window.document.getElementById('input-nome').focus();
		}
		//--
		
		//-- Imprimir
		$scope.Imprimir = function (){
			var parameters = {
				nome : $scope.nomeCbo,
				codigoCbo : $scope.codigoCbo
			};

			var config = {
				params : parameters
			};
			
			CboService.Print(config).then(function(data){
					$location.path('/cbo');
				})
		}
		//--
	}
})();
