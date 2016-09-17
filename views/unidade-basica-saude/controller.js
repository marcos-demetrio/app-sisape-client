(function () {
	'use strict';

	angular
		.module('app')
		.controller('UbsController', UbsController)
		.controller('UbsListagemController', UbsListagemController);

	UbsController.$inject = ['$scope', '$location', '$route', '$routeParams', 'UbsService', 'MunicipioService'];

	function UbsController($scope, $location, $route, $routeParams, UbsService, MunicipioService) {
		//-- Controle Tabs
		$scope.tab = 1;
		$scope.setTab = function(newTab){
			$scope.tab = newTab;
		};
		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};
		//--
		
		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var ubsID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (ubsID > 0);
		//--

		//-- Carregar lista de estados
		MunicipioService.GetAll().then(function(data){
			$scope.municipios = data;
		});
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(ubsID > 0){
			UbsService.GetById(ubsID).then(function(data){
				$scope.form = data;
			});
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar a UBS após excluir.",
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
						UbsService.Delete(ubsID).then(function(data){
							$location.path('/ubs');
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
						text: "Você não poderá recuperar os dados alterados da UBS após cancelar.",
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
							$location.path('/ubs');
							$route.reload();
						}
					});
			}else{
				$location.path('/ubs');
			}
		}
		//--

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			var estado = angular.fromJson($scope.form.estado);

			$scope.form.estado = estado;

			if(ubsID > 0){
				MunicipioService.Update($scope.form, ubsID).then(function(data){
					$location.path('/ubs');
				})
			}else{			
				MunicipioService.Create($scope.form).then(function(data){
					$location.path('/ubs');
				});
			}
		}
		//--
	}

	UbsListagemController.$inject = ['$scope', '$location', '$window', 'UbsService'];

	function UbsListagemController($scope, $location, $window, UbsService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		UbsService.GetAll().then(function(data){
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
			UbsService.PesquisarPorNome(config).then(function(data){
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

		// Verifica Status
		$scope.IsAtivo = function (status){
			return status == 'ATIVO';
		}
		//--
	}
})();
