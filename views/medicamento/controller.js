(function () {
	'use strict';

	angular
		.module('app')
		.controller('MedicamentoController', MedicamentoController)
		.controller('MedicamentoListagemController', MedicamentoListagemController);

	MedicamentoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'MedicamentoService', 'UbsService'];

	function MedicamentoController($scope, $location, $route, $routeParams, MedicamentoService, UbsService) {
		
		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var medicamentoID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (medicamentoID > 0);
		//--

		//-- Carregar lista de UBS
		UbsService.GetAll().then(function(data){
			$scope.unidades = data;
		});
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(medicamentoID > 0){
			MedicamentoService.GetById(medicamentoID).then(function(data){
				$scope.form = data;
			});
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o medicamento após excluir.",
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
						MedicamentoService.Delete(medicamentoID).then(function(data){
							$location.path('/medicamento');
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
						text: "Você não poderá recuperar os dados alterados do medicamento após cancelar.",
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
							$location.path('/medicamento');
							$route.reload();
						}
					});
			}else{
				$location.path('/medicamento');
			}
		}
		//--

  		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			if(medicamentoID > 0){
				MedicamentoService.Update($scope.form, medicamentoID).then(function(data){
					$location.path('/medicamento');
				})
			}else{
				MedicamentoService.Create($scope.form).then(function(data){
					$location.path('/medicamento');
				});
			}
		}
		//--
	}

	MedicamentoListagemController.$inject = ['$scope','$location', '$window', 'MedicamentoService'];

	function MedicamentoListagemController($scope, $location, $window, MedicamentoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		MedicamentoService.GetAll().then(function(data){
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
			MedicamentoService.PesquisarPorNome(config).then(function(data){
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

			MedicamentoService.Print(config).then(function(data){
					var file = new Blob([data], { type: 'application/pdf' });
					var fileURL = URL.createObjectURL(file);
					
					saveAs(file, 'medicamento.pdf'); //Faz o download
					
					$window.open(fileURL); //Abre em outra aba
				})
		}
		//--
	}
})();
