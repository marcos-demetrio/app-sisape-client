(function () {
	'use strict';

	angular
		.module('app')
		.controller('ExameController', ExameController)
		.controller('ExameListagemController', ExameListagemController);

	ExameController.$inject = ['$scope', '$location', '$route', '$routeParams', 'ExameService'];

	function ExameController($scope, $location, $route, $routeParams, ExameService) {
		
		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var exameID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (exameID > 0);
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(exameID > 0){
			ExameService.GetById(exameID).then(function(data){
				$scope.form = data;
			});
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o exame após excluir.",
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
						ExameService.Delete(exameID).then(function(data){
							$location.path('/exame');
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
						text: "Você não poderá recuperar os dados alterados do exame após cancelar.",
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
							$location.path('/exame');
							$route.reload();
						}
					});
			}else{
				$location.path('/exame');
			}
		}
		//--

  		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			if(exameID > 0){
				ExameService.Update($scope.form, exameID).then(function(data){
					$location.path('/exame');
				})
			}else{
				ExameService.Create($scope.form).then(function(data){
					$location.path('/exame');
				});
			}
		}
		//--
	}

	ExameListagemController.$inject = ['$scope','$location', '$window', 'ExameService'];

	function ExameListagemController($scope, $location, $window, ExameService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		ExameService.GetAll().then(function(data){
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
			ExameService.PesquisarPorNome(config).then(function(data){
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
				params : parameters,
				responseType: 'arraybuffer'
			};

			ExameService.Print(config).then(function(data){
					var file = new Blob([data], { type: 'application/pdf' });
					var fileURL = URL.createObjectURL(file);
					
					saveAs(file, 'exame.pdf'); //Faz o download
					
					$window.open(fileURL); //Abre em outra aba
				})
		}
		//--
	}
})();
