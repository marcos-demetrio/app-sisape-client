(function () {
	'use strict';

	angular
		.module('app')
		.controller('MunicipioController', MunicipioController)
		.controller('MunicipioListagemController', MunicipioListagemController);

	MunicipioController.$inject = ['$scope', '$location', '$route', '$routeParams', 'MunicipioService', 'EstadoService'];

	function MunicipioController($scope, $location, $route, $routeParams, MunicipioService, EstadoService) {

		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var municipioID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (municipioID > 0);
		//--

		//-- Carregar lista de estados
		EstadoService.GetAll().then(function(data){
			$scope.estados = data;
		});
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(municipioID > 0){
			MunicipioService.GetById(municipioID).then(function(data){
				$scope.form = data;
			});
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o município após excluir.",
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
						MunicipioService.Delete(municipioID).then(function(data){
							$location.path('/municipio');
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
						text: "Você não poderá recuperar os dados alterados do município após cancelar.",
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
							$location.path('/municipio');
							$route.reload();
						}
					});
			}else{
				$location.path('/municipio');
			}
		}
		//--

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			var estado = angular.fromJson($scope.form.estado);

			$scope.form.estado = estado;

			if(municipioID > 0){
				MunicipioService.Update($scope.form, municipioID).then(function(data){
					$location.path('/municipio');
				})
			}else{			
				MunicipioService.Create($scope.form).then(function(data){
					$location.path('/municipio');
				});
			}
		}
		//--
	}

	MunicipioListagemController.$inject = ['$scope', '$location', '$window', 'MunicipioService'];

	function MunicipioListagemController($scope, $location, $window, MunicipioService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		MunicipioService.GetAll().then(function(data){
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
			MunicipioService.PesquisarPorNome(config).then(function(data){
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
				nome : $scope.keyword
			};

			var config = {
				params : parameters
			};

			MunicipioService.Print(config).then(function(data){
					$location.path('/municipio');
				})
		}
		//--
	}
})();
