(function () {
	'use strict';

	angular
		.module('app')
		.controller('UbsController', UbsController)
		.controller('UbsListagemController', UbsListagemController);

	UbsController.$inject = ['$scope', '$timeout', '$location', '$route', '$routeParams', '$window', 'UbsService', 'MunicipioService', 'TipoEstabelecimentoUbsService'];

	function UbsController($scope, $timeout, $location, $route, $routeParams, $window, UbsService, MunicipioService, TipoEstabelecimentoUbsService) {
		
		//-- Controle Tabs Principal
		$scope.tab = 1;
		$scope.setTab = function(newTab){
			$scope.tab = newTab;
		};
		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};
		//--
		
		//-- Controle Tabs Parâmetros
		$scope.tabParmto = 1;
		$scope.setTabParmto = function(newTab){
			$scope.tabParmto = newTab;
		};
		$scope.isSetTabParmto = function(tabNum){
			return $scope.tabParmto === tabNum;
		};
		//--
		
		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var ubsID = ($routeParams.id) ? parseInt($routeParams.id) : 0;

		$scope.editandoCadastro = (ubsID > 0);
		//--

		//-- Carregar lista de municipios
		MunicipioService.GetAll().then(function(data){
			$scope.municipios = data;
		});
		//--
		
		//-- Carregar lista de tipos de estabelecimento
		TipoEstabelecimentoUbsService.GetAll().then(function(data){
			$scope.tiposEstabelecimento = data;
		});
		//--
		
		//-- Caso esteja editando, obtem os dados do cadastro
		if(ubsID > 0){
			UbsService.GetById(ubsID).then(function(data){
				if(data.parametroUbs != undefined){
					var dateArray = [];
					if(data.parametroUbs.horarioMatutinoInicio != null){
						dateArray = data.parametroUbs.horarioMatutinoInicio.split(":");

						data.parametroUbs.horarioMatutinoInicio = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(data.parametroUbs.horarioMatutinoFim != null){
						dateArray = data.parametroUbs.horarioMatutinoFim.split(":");

						data.parametroUbs.horarioMatutinoFim = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(data.parametroUbs.horarioVespertinoInicio != null){
						dateArray = data.parametroUbs.horarioVespertinoInicio.split(":");

						data.parametroUbs.horarioVespertinoInicio = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(data.parametroUbs.horarioVespertinoFim != null){
						dateArray = data.parametroUbs.horarioVespertinoFim.split(":");

						data.parametroUbs.horarioVespertinoFim = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(data.parametroUbs.horarioNoturnoInicio != null){
						dateArray = data.parametroUbs.horarioNoturnoInicio.split(":");

						data.parametroUbs.horarioNoturnoInicio = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}

					if(data.parametroUbs.horarioNoturnoFim != null){
						dateArray = data.parametroUbs.horarioNoturnoFim.split(":");

						data.parametroUbs.horarioNoturnoFim = new Date(2016, 1, 1, parseInt(dateArray[0]), parseInt(dateArray[1]), parseInt(dateArray[2]));
					}
				}
					
					
					
				/*	data.parametroUbs.horarioMatutinoInicio	= new Date('01/01/2016 ' + data.parametroUbs.horarioMatutinoInicio || '00:00:00');
					data.parametroUbs.horarioMatutinoFim		= new Date('01/01/2016 ' + data.parametroUbs.horarioMatutinoFim || '00:00:00');
					data.parametroUbs.horarioVespertinoInicio	= new Date('01/01/2016 ' + data.parametroUbs.horarioVespertinoInicio || '00:00:00');
					data.parametroUbs.horarioVespertinoFim		= new Date('01/01/2016 ' + data.parametroUbs.horarioVespertinoFim || '00:00:00');
					data.parametroUbs.horarioNoturnoInicio		= new Date('01/01/2016 ' + data.parametroUbs.horarioNoturnoInicio || '00:00:00');
					data.parametroUbs.horarioNoturnoFim			= new Date('01/01/2016 ' + data.parametroUbs.horarioNoturnoFim || '00:00:00');*/
			//	}
				
				$scope.form = data;
				
				/*$scope.form.parametroUbs.horarioMatutinoInicio		= new Date('01/01/2016 ' + data.parametroUbs.horarioMatutinoInicio);
				$scope.form.parametroUbs.horarioMatutinoFim			= new Date('01/01/2016 ' + data.parametroUbs.horarioMatutinoFim);
				$scope.form.parametroUbs.horarioVespertinoInicio	= new Date('01/01/2016 ' + data.parametroUbs.horarioVespertinoInicio);
				$scope.form.parametroUbs.horarioVespertinoFim		= new Date('01/01/2016 ' + data.parametroUbs.horarioVespertinoFim);
				$scope.form.parametroUbs.horarioNoturnoInicio		= new Date('01/01/2016 ' + data.parametroUbs.horarioNoturnoInicio);
				$scope.form.parametroUbs.horarioNoturnoFim			= new Date('01/01/2016 ' + data.parametroUbs.horarioNoturnoFim);*/
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
			if(ubsID > 0){
				UbsService.Update($scope.form, ubsID).then(function(data){
					$location.path('/ubs');
				})
			}else{			
				UbsService.Create($scope.form).then(function(data){
					$location.path('/ubs');
				});
			}
		}
		//--
		
		//-- Limpa dados do campo caso desmarque a opção no checkbox semNumero
		$scope.ClickCheckBoxSemNumero = function() {
			$window.document.getElementById('numero').focus();

			$scope.form.numero = null;
		};
		//--
		
		//-- Limpa dados do campo caso desmarque a opção no checkbox dos horáriios
		$scope.setFocusHorario = function(idHorarioInicio, idHorarioFim) {
			$timeout(function() {
				$(idHorarioInicio).focus();
				
				$(idHorarioInicio).val("");
				$(idHorarioFim).val("");
			}, 100);
		};
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
			return status == true;
		}
		//--
	}
})();
