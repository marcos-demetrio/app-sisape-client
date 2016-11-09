(function () {
	'use strict';

	angular
		.module('app')
		.controller('ProfissionalController', ProfissionalController)
		.controller('ProfissionalListagemController', ProfissionalListagemController);

	ProfissionalController.$inject = ['$scope', '$rootScope', '$location', '$route', '$routeParams', '$window', 'ProfissionalService', 'MunicipioService', 'TipoLogradouroService', 'CboService'];

	function ProfissionalController($scope, $rootScope, $location, $route, $routeParams, $window, ProfissionalService, MunicipioService, TipoLogradouroService, CboService) {
		//-- Controle Tabs
		$scope.tab = 1;
		$scope.setTab = function(newTab){
			$scope.tab = newTab;
		};
		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};
		//--

		//-- Carregar lista de municípios
		MunicipioService.GetAll().then(function(data){
			$scope.municipios = data;
		});
		//--

		//-- Carregar lista de tipos de logradouro
		TipoLogradouroService.GetAll().then(function(data){
			$scope.tiposLogradouro = data;
		});
		//--

		//-- Carregar lista de CBO's
		CboService.GetAll().then(function(data){
			$scope.listaCbo = data;
		});
		//--

		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var profissionalID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (profissionalID > 0);
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(profissionalID > 0){
			ProfissionalService.GetById(profissionalID).then(function(data){
				$scope.form = data;

				var date = new Date();
				var str = data.dataNascimento;
				var dateArray = str.split("-");

				date.setFullYear(parseInt(dateArray[0]));
				date.setMonth(parseInt(dateArray[1])-1);  // months indexed as 0-11, substract 1
				date.setDate(parseInt(dateArray[2]));

				$scope.form.dataNascimento = date;

				var dateRegistro = new Date();
				var strRegistro = data.dataRegistro;
				var dateArrayRegistro = strRegistro.split("-");

				dateRegistro.setFullYear(parseInt(dateArrayRegistro[0]));
				dateRegistro.setMonth(parseInt(dateArrayRegistro[1])-1);  // months indexed as 0-11, substract 1
				dateRegistro.setDate(parseInt(dateArrayRegistro[2]));

				$scope.form.dataRegistro = dateRegistro;
			});
		}
		//--

		var controleUrlRedirecionamento;

		switch ($rootScope.userLoggedIn.tipoUsuario) {
			case "P":
				controleUrlRedirecionamento = '/inicio';
				break;
			default:
				controleUrlRedirecionamento = '/profissional';
				break;
		}

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){

			var fazUpdate = true;
			var senhaAntiga = '';
			var senhaNova = '';

			senhaAntiga	= ($scope.form.senha || '');
			senhaNova	= ($scope.novaSenha || '');

			if($rootScope.userLoggedIn && $rootScope.userLoggedIn.tipoUsuario == 'P'){
				if(md5(senhaAntiga) != $rootScope.userLoggedIn.password){
					sweetAlert("Oops...", "A senha está incorreta!", "error");
					fazUpdate = false;
				}
			}

			var senhaGravar = (senhaNova || senhaAntiga);

			senhaGravar = md5(senhaGravar);

			if(fazUpdate){
				$rootScope.userLoggedIn.password = senhaGravar;
				$scope.form.senha = senhaGravar;

				if($rootScope.userLoggedIn.tipoUsuario == 'G'){
					$scope.form.tipoUsuario = 'P';
				}

				if(profissionalID > 0){
					ProfissionalService.Update($scope.form, profissionalID).then(function(data){
						$location.path(controleUrlRedirecionamento);
					})
				}else{
					ProfissionalService.Create($scope.form).then(function(data){
						$location.path(controleUrlRedirecionamento);
					});
				}
			}
		}
		//--

		//-- Cancela operação no cadastro, se alterou alguma informação, faz a confirmação
		$scope.cancelar = function(dirty) {
			if(dirty){
				swal({   
						title: "Tem certeza?",
						text: "Você não poderá recuperar os dados alterados do profissional após cancelar.",
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
							$location.path(controleUrlRedirecionamento);
							$route.reload();
						}
					});
			}else{
				$location.path(controleUrlRedirecionamento);
			}
  		}
  		//--

  		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function () {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o profissional após excluir.",
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
						ProfissionalService.Delete(profissionalID).then(function(data){
							$location.path(controleUrlRedirecionamento);
							$route.reload();
						});
					}
				});
		}
		//--

		//-- Limpa dados do campo caso desmarque a opção no checkbox
		$scope.ClickCheckBoxNumeroCartaoNacionalSaude = function(id) {
			$window.document.getElementById('numeroCartaoNacionalSaude').focus();

			$scope.form.numeroCartaoNacionalSaude = null;
		};
		//--

		//-- Limpa dados do campo caso desmarque a opção no checkbox
		$scope.ClickCheckBoxSemNumero = function() {
			$window.document.getElementById('numero').focus();

			$scope.form.numero = null;
		};
		//--

		//-- Campo Data
		$scope.popup2 = {
			opened: false
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};
		//--

		//-- Campo Data
		$scope.popup3 = {
			opened: false
		};

		$scope.open3 = function() {
			$scope.popup3.opened = true;
		};
		//--
	}

	ProfissionalListagemController.$inject = ['$scope', '$rootScope', '$location', '$window', 'ProfissionalService'];

	function ProfissionalListagemController($scope, $rootScope, $location, $window, ProfissionalService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		ProfissionalService.GetAll().then(function(data){
			if($rootScope.userLoggedIn.tipoUsuario == 'G'){
				for (var i = data.length - 1; i >= 0; i--) {
					if(data[i].tipoUsuario == 'S'){
						data.splice(i, 1);
					}
				};
			}

			$scope.itens = data;

			$scope.totalItens = $scope.itens.length;

			$scope.listaVazia = $scope.itens.length === 0;
		});

		//--Pesquisa
		$scope.Pesquisar = function (){
			var parameters = {
				nome : $scope.keyword
			};

			var config = {
				params : parameters
			};

			$scope.itens = [];
			ProfissionalService.PesquisarPorNome(config).then(function(data){
				if($rootScope.userLoggedIn.tipoUsuario == 'G'){
					for (var i = data.length - 1; i >= 0; i--) {
						if(data[i].tipoUsuario == 'S'){
							data.splice(i, 1);
						}
					};
				}

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

			ProfissionalService.Print(config).then(function(data){
					$location.path('/profissional');
				})
		}
		//--
	}
})();
