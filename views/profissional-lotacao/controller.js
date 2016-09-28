(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProfissionalLotacaoController', ProfissionalLotacaoController)
		.controller('ProfissionalLotacaoListagemController', ProfissionalLotacaoListagemController);

	ProfissionalLotacaoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'ProfissionalLotacaoService', 'UbsService', 'ProfissionalService', 'CboService'];

	function ProfissionalLotacaoController($scope, $location, $route, $routeParams, ProfissionalLotacaoService, UbsService, ProfissionalService, CboService) {

		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var lotacaoID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (lotacaoID > 0);
		//--

		//-- Carregar lista de UBS
		UbsService.GetAll().then(function(data){
			$scope.unidades = data;
		});
		//--
		
		//-- Carregar lista de Profissionais
		ProfissionalService.GetAll().then(function(data){
			$scope.profissionais = data;
		});
		//--
		
		//-- Carregar lista de CBO's
		CboService.GetAll().then(function(data){
			$scope.cbos = data;
		});
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(lotacaoID > 0){
			ProfissionalLotacaoService.GetById(lotacaoID).then(function(data){
				$scope.form = data;
			});
		}
		//--

		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar a lotação após excluir.",
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
						ProfissionalLotacaoService.Delete(lotacaoID).then(function(data){
							$location.path('/lotacao');
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
						text: "Você não poderá recuperar os dados alterados da lotação após cancelar.",
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
							$location.path('/lotacao');
							$route.reload();
						}
					});
			}else{
				$location.path('/lotacao');
			}
		}
		//--

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			var pais = angular.fromJson($scope.form.pais);

			$scope.form.pais = pais;

			if(lotacaoID > 0){
				ProfissionalLotacaoService.Update($scope.form, lotacaoID).then(function(data){
					$location.path('/lotacao');
				})
			}else{			
				ProfissionalLotacaoService.Create($scope.form).then(function(data){
					$location.path('/lotacao');
				});
			}
		}
		//--
	}

	ProfissionalLotacaoListagemController.$inject = ['$scope', '$location', '$window', 'ProfissionalLotacaoService'];

	function ProfissionalLotacaoListagemController($scope, $location, $window, ProfissionalLotacaoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		ProfissionalLotacaoService.GetAll().then(function(data){
			$scope.itens = data;
			$scope.totalItens = $scope.itens.length;

			$scope.listaVazia = $scope.itens.length === 0;
		});
	}
})();
