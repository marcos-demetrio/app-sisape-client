(function () {
	'use strict';

	angular
		.module('app')
		.controller('CidadaoController', CidadaoController)
		.controller('CidadaoListagemController', CidadaoListagemController);

	CidadaoController.$inject = ['$scope', '$rootScope','$location', '$route', '$routeParams', '$window', 'CidadaoService', 'MunicipioService', 'TipoLogradouroService', 'CboService', 'UbsService'];

	function CidadaoController($scope, $rootScope, $location, $route, $routeParams, $window, CidadaoService, MunicipioService, TipoLogradouroService, CboService, UbsService) {

		//-- Controle Tabs
		$scope.tab = 1;
		$scope.setTab = function(newTab){
			$scope.tab = newTab;
		};
		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};
		//--

		//-- Carregar lista de UBS
		UbsService.GetAll().then(function(data){
			$scope.unidades = data;
		});
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
		var cidadaoID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (cidadaoID > 0);
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(cidadaoID > 0){
			CidadaoService.GetById(cidadaoID).then(function(data){
				$scope.form = data;

				var date = new Date();
				var str = data.dataNascimento;
				var dateArray = str.split("-");

				date.setFullYear(parseInt(dateArray[0]));
				date.setMonth(parseInt(dateArray[1])-1);  // months indexed as 0-11, substract 1
				date.setDate(parseInt(dateArray[2]));

				$scope.form.dataNascimento = date;
				$scope.form.dataNascimento = date;

				$scope.senhaBkp = $scope.form.senha;
				$scope.form.senha = '';
			});
		}
		//--

		var controleUrlRedirecionamento = '/login';

		if($rootScope.userLoggedIn){
			switch ($rootScope.userLoggedIn.tipoUsuario) {
				case "C":
					controleUrlRedirecionamento = '/inicio';
					break;
				default:
					controleUrlRedirecionamento = '/cidadao';
					break;
			}
		}

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			
			var senhaDigitada;
			if($rootScope.userLoggedIn){
				if($rootScope.userLoggedIn.tipoUsuario == 'C'){
					senhaDigitada = $scope.form.senha;
				}else{
					senhaDigitada = $scope.senhaBkp;
				}
			}
			
			var senhaNova = $scope.novaSenha || senhaDigitada;

			var fazUpdate = true;

			if($rootScope.userLoggedIn && $rootScope.userLoggedIn.tipoUsuario == 'C'){
				if(md5(senhaDigitada) != $rootScope.userLoggedIn.password){
					sweetAlert("Oops...", "A senha está incorreta!", "error");
					fazUpdate = false;
				}
			}

			if(fazUpdate){
				if($rootScope.userLoggedIn){
					if($rootScope.userLoggedIn.tipoUsuario == 'C'){
						senhaNova = md5(senhaNova);
					}
				}else{
					senhaNova = md5(senhaNova);
				}

				if($rootScope.userLoggedIn && $rootScope.userLoggedIn.tipoUsuario == 'C'){
					$rootScope.userLoggedIn.password = senhaNova;
				}
				$scope.form.senha = senhaNova;

				if(cidadaoID > 0){
					CidadaoService.Update($scope.form, cidadaoID).then(function(data){
						$location.path(controleUrlRedirecionamento);
					})
				}else{
					CidadaoService.Create($scope.form).then(function(data){
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
						text: "Você não poderá recuperar os dados alterados do cidadão após cancelar.",
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
					text: "Você não poderá recuperar o cidadão após excluir.",
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
						CidadaoService.Delete(cidadaoID).then(function(data){
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
	}

	CidadaoListagemController.$inject = ['$scope', '$location', '$window', 'CidadaoService'];

	function CidadaoListagemController($scope, $location, $window, CidadaoService) {
		$scope.listaVazia = true;
		$scope.itens = [];

		CidadaoService.GetAll().then(function(data){
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
			CidadaoService.PesquisarPorNomeCompleto(config).then(function(data){
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
			
			CidadaoService.Print(config).then(function(data){
					var file = new Blob([data], { type: 'application/pdf' });
					var fileURL = URL.createObjectURL(file);
					
					saveAs(file, 'cidadao.pdf'); //Faz o download
					
					$window.open(fileURL); //Abre em outra aba
				})
		}
		//--
	}
})();
