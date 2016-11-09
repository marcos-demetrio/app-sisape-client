(function () {
	'use strict';

	angular
		.module('app')
		.controller('AtendimentoController', AtendimentoController)
		.controller('AtendimentoListagemController', AtendimentoListagemController)
		.controller('AtendimentoRelatorioController', AtendimentoRelatorioController)
		.controller('AdoecimentoRelatorioController', AdoecimentoRelatorioController);

	AtendimentoController.$inject = ['$scope', '$location', '$route', '$routeParams', 'AtendimentoService', 'ProfissionalLotacaoService', 'AgendamentoService', 'CidService', 'ExameService', 'MedicamentoService'];

	function AtendimentoController($scope, $location, $route, $routeParams, AtendimentoService, ProfissionalLotacaoService, AgendamentoService, CidService, ExameService, MedicamentoService) {
		//-- Controle Tabs
			$scope.tab = 1;
		$scope.setTab = function(newTab){
			$scope.tab = newTab;
		};
		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};
		//--

		//-- Controle Panels do prontuário
		$scope.panel = [];
		
		$scope.collapsePanel = function(panelNum){
			$scope.panel[panelNum].collapsed = !$scope.panel[panelNum].collapsed;
		};
		$scope.isPanelCollapsed = function(panelNum){
			return $scope.panel[panelNum].collapsed;
		};
		//--

		//-- Controle tab do prontuário
		$scope.panel = [];
		
		$scope.setTabPrintuario = function(index, tabNum){
			$scope.panel[index].tabSelected = tabNum;
		};
		$scope.isTab = function(index, tabNum){
			return $scope.panel[index].tabSelected === tabNum;
		};
		//--
 
		//-- Inicializa formulário
		if($scope.form == null){
				$scope.form = {};
			}
		
		if($scope.form.atendimentoSintoma == null){
			$scope.form.atendimentoSintoma = [];
		}

		if($scope.form.atendimentoMedicamento == null){
			$scope.form.atendimentoMedicamento = [];
		}

		if($scope.form.atendimentoExame == null){
			$scope.form.atendimentoExame = [];
		}
		//--

		//-- Campo Data
		$scope.popup2 = {
			opened: false
		};
 
		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};
		//--
 
		//-- Pegar a variável 'id' vinda da url, se for maior que zero esta editando, senão está inserindo
		var atendimentoID = ($routeParams.id) ? parseInt($routeParams.id) : 0;
 
		$scope.editandoCadastro = (atendimentoID > 0);
		//--

		//-- Pegar a variável 'idgendaemnto' vinda da url, e setar o agendamento
		var agendamentoID = ($routeParams.idgendaemnto) ? parseInt($routeParams.idgendaemnto) : 0;
 		//--

		//-- Busca o agendamento
		if(agendamentoID > 0){
			AgendamentoService.GetById(agendamentoID).then(function(data){
				$scope.form.agendamento = data;

				if($scope.form.agendamento.profissionalLotacao){
					$scope.form.profissionalLotacao = $scope.form.agendamento.profissionalLotacao;
				}

				$scope.OnChangeCidadao($scope.form.agendamento.cidadao);

				$scope.mudouAgendamento();
			});
		}
		//--

		//-- Carregar lista de Profissionais
		ProfissionalLotacaoService.GetAll().then(function(data){
			$scope.profissionais = data;
		});
		//--

		//-- Caso esteja editando, obtem os dados do cadastro
		if(atendimentoID > 0){
			AtendimentoService.GetById(atendimentoID).then(function(data){
				$scope.form = data;
 
				var date = new Date();
				var str = data.dataAtendimento;
				var dateArray = str.split("-");
 
				date.setFullYear(parseInt(dateArray[0]));
				date.setMonth(parseInt(dateArray[1])-1);  // months indexed as 0-11, substract 1
				date.setDate(parseInt(dateArray[2]));
 
				$scope.form.dataAtendimento = date;

				var hora = new Date($scope.form.horaAtendimento);
				hora.setSeconds(0);

				$scope.form.horaAtendimento = hora;
			});
		}
		//--

		//-- Carregar lista de Agendamento
		AgendamentoService.GetAll().then(function(data){
			$scope.agendamentos = data;
		});
			//--

		//-- Carregar lista de CID's
		CidService.GetAll().then(function(data){
			$scope.listaCid = data;
		});
		//--

		//-- Carregar lista de Exame's
		ExameService.GetAll().then(function(data){
			$scope.listaExame = data;
		});
		//--

		//-- Carregar lista de Medicamento's
		MedicamentoService.GetAll().then(function(data){
			$scope.listaMedicamento = data;
		});
		//--

		//-- Inicia variaveis do prontuário
		$scope.listaVazia = true;
		$scope.atendimentos = [];
		//--

		//-- Ao selecionar um cidadão
		$scope.OnChangeCidadao = function(cidadao) {
			AtendimentoService.GetByCidadao(cidadao.i_cidadao).then(function(data){
				$scope.atendimentos = data;

				for (var i = data.length - 1; i >= 0; i--) {
					$scope.panel.push({
						collapsed: false,
						tabSelected: 1	
					});
				};

				$scope.listaVazia = $scope.atendimentos.length === 0;
			});
		}
		//--

		//-- Adicionar sintoma
		$scope.adicionarSintoma = function() {
			var sintoma = {
				i_cid: null
			}

			$scope.form.atendimentoSintoma.push(sintoma);
		}
		//--

		$scope.sintomasExcluidos = [];

		//-- Excluir sintoma, não faz a confirmação
		$scope.excluirSintoma = function(item, index) {
			if(item.i_sequencial > 0){
				$scope.sintomasExcluidos.push({
					itemSintoma: item
				});
			}

			$scope.form.atendimentoSintoma.splice(index, 1);
		}
		//--

		//-- Adicionar medicamento
		$scope.adicionarMedicamento = function() {
			var medicamento = {
				medicamento: null,
				posologia: ''
			}

			$scope.form.atendimentoMedicamento.push(medicamento);
		}
		//--

		$scope.medicamentosExcluidos = [];

		//-- Excluir medicamento, não faz a confirmação
		$scope.excluirMedicamento = function(item, index) {
			if(item.i_sequencial > 0){
				$scope.medicamentosExcluidos.push({
					itemMedicamento: item
				});
			}

			$scope.form.atendimentoMedicamento.splice(index, 1);
		}
		//--

		//-- Adicionar exame
		$scope.adicionarExame = function() {
			var exame = {
				exame: null
			}

			$scope.form.atendimentoExame.push(exame);
		}
		//--

		$scope.examesExcluidos = [];

		//-- Excluir exame, não faz a confirmação
		$scope.excluirExame = function(item, index) {
			if(item.i_sequencial > 0){
				$scope.examesExcluidos.push({
					itemExame: item
				});
			}

			$scope.form.atendimentoExame.splice(index, 1);
		}
		//--

		//-- Excluir exame, não faz a confirmação
		$scope.mudouAgendamento = function() {
			var date = new Date();
			var str = $scope.form.agendamento.dataAgendamento;
			var dateArray = str.split("-");

			date.setFullYear(parseInt(dateArray[0]));
			date.setMonth(parseInt(dateArray[1])-1);  // months indexed as 0-11, substract 1
			date.setDate(parseInt(dateArray[2]));

			$scope.form.dataAtendimento = date;

			$scope.form.horaAtendimento = new Date($scope.form.agendamento.horaAgendamento);
		}
		//--

		//-- Gravar os dados do cadastro no banco de dados
		$scope.update = function(){
			if(atendimentoID > 0){
				AtendimentoService.Update($scope.form, atendimentoID).then(function(data){
					var id = 0;

					for (var i = $scope.sintomasExcluidos.length - 1; i >= 0; i--) {
						id = $scope.sintomasExcluidos[i].itemSintoma.i_sequencial;

						AtendimentoService.DeleteSintoma(id).then(function(data){

						});
					};

					for (var i = $scope.medicamentosExcluidos.length - 1; i >= 0; i--) {
						id = $scope.medicamentosExcluidos[i].itemMedicamento.i_sequencial;

						AtendimentoService.DeleteMedicamento(id).then(function(data){

						});
					};

					for (var i = $scope.examesExcluidos.length - 1; i >= 0; i--) {
						id = $scope.examesExcluidos[i].itemExame.i_sequencial;

						AtendimentoService.DeleteExame(id).then(function(data){

						});
					};

					$location.path('/fila');
				})
			}else{
				AtendimentoService.Create($scope.form).then(function(data){
					$location.path('/fila');
				});
			}
		}
		//--


		//-- Excluir cadastro, faz a confirmação
		$scope.excluir = function() {
			swal({   
					title: "Tem certeza?",
					text: "Você não poderá recuperar o atendimento após excluir.",
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
						AtendimentoService.Delete(atendimentoID).then(function(data){
							$location.path('/fila');
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
						text: "Você não poderá recuperar os dados alterados do atendimento após cancelar.",
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
							$location.path('/fila');
							$route.reload();
						}
					});
			}else{
				$location.path('/fila');
			}
		}
		//--

		//-- Imprimir Atestado
		$scope.imprimirAtestado = function() {
			
		}
		//--

		//-- Imprimir Receita
		$scope.imprimirReceita = function() {
			
		}
		//--

		//-- Imprimir Exames
		$scope.imprimirExames = function() {
			
		}
		//--

		//-- Calcular IMC
		$scope.calcularIMC = function() {
			var altura = $scope.form.altura;
			var peso = $scope.form.peso;
			var imc = peso / (altura * altura);

			$scope.form.imc = imc;

			$scope.descricaoIMC = $scope.getDescricaoIMC(imc);
		}
		//--

		//-- Retornar descrição IMC
		$scope.getDescricaoIMC = function(imc) {
			var descricaoIMC = '';

			switch(true){
				case imc < 18.5:
					descricaoIMC = 'Baixo peso';
					break;
				case imc >= 18.5 && imc < 25:
					descricaoIMC = 'Peso adequado';
					break;
				case imc >= 25 && imc < 30:
					descricaoIMC = 'Sobrepeso';
					break;
				case imc >= 30:
					descricaoIMC = 'Obesidade';
					break;
			}

			return descricaoIMC;
		}
		//--
	}
	
	
	AtendimentoListagemController.$inject = ['$scope','$location', '$window', 'AtendimentoService'];
	
	function AtendimentoListagemController($scope, $location, $window, AtendimentoService) {
		$scope.listaVazia = true;
		$scope.itens = [];
	
		$scope.atualizarAtendimentos = function(){
			AtendimentoService.GetAll().then(function(data){
				$scope.itens = data;
				$scope.totalItens = $scope.itens.length;
	
				$scope.listaVazia = $scope.itens.length === 0;
			});
		}
	
		$scope.atualizarAtendimentos();
		}

	AtendimentoRelatorioController.$inject = ['$scope', '$rootScope','$location', '$window', 'AtendimentoService', 'UbsService', 'ProfissionalService', 'CidadaoService'];

	function AtendimentoRelatorioController($scope, $rootScope, $location, $window, AtendimentoService, UbsService, ProfissionalService, CidadaoService) {
		$scope.listaVazia = true;
		$scope.itens = [];
		
		$scope.filtro = 'VAZIO';
		
		//-- Carregar lista de Ubs
		UbsService.GetAll().then(function(data){
			$scope.ubss = data;
		});
		//--
		
		//-- Carregar lista de Profissional
		ProfissionalService.GetAll().then(function(data){
			if($rootScope.userLoggedIn.tipoUsuario == 'G'){
				for (var i = data.length - 1; i >= 0; i--) {
					if(data[i].tipoUsuario == 'S'){
						data.splice(i, 1);
					}
				};
			}

			$scope.profissionais = data;
		});
		//--
		
		//-- Carregar lista de Cidadao
		CidadaoService.GetAll().then(function(data){
			$scope.cidadaos = data;
		});
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
		AtendimentoService.GetAll().then(function(data){
			$scope.itens = data;
			$scope.totalItens = $scope.itens.length;

			$scope.listaVazia = $scope.itens.length === 0;
		});

		//-- Pesquisa
		$scope.AtendimentoRelatorioPesquisar = function (){
			switch ($scope.filtro) {
				case "VAZIO":
					$scope.itens = [];
					AtendimentoService.GetAll().then(function(data){
						$scope.itens = data;
						$scope.totalItens = $scope.itens.length;

						$scope.listaVazia = $scope.itens.length === 0;
					});
					break;
					
				case "UBS":
					$scope.itens = [];
					AtendimentoService.AtendimentoRelatorioPesquisarPorUbs($scope.unidadeBasicaSaude.i_unidade_basica_saude).then(function(data){
						$scope.itens = data;

						$scope.listaVazia = $scope.itens.length === 0;
					});
					
					break;
					
				case "PROFISSIONAL":
					$scope.itens = [];
					AtendimentoService.AtendimentoRelatorioPesquisarPorProfissional($scope.profissional.i_profissional).then(function(data){
						$scope.itens = data;

						$scope.listaVazia = $scope.itens.length === 0;
					});

					break;

				case "CIDADAO":
					$scope.itens = [];
					AtendimentoService.AtendimentoRelatorioPesquisarPorCidadao($scope.cidadao.i_cidadao).then(function(data){
						$scope.itens = data;

						$scope.listaVazia = $scope.itens.length === 0;
					});
					
					break;
					
				case "DATA_ATENDIMENTO":
					var parameters = {
						aDataInicio : $scope.dataAtendimentoInicio,
						aDataFinal : $scope.dataAtendimentoFinal
					};

					var config = {
						params : parameters
					};

					$scope.itens = [];
					AtendimentoService.AtendimentoRelatorioPesquisarPorDataAtendimento(config).then(function(data){
						$scope.itens = data;

						$scope.listaVazia = $scope.itens.length === 0;
					});
					
					break;
			}
		}
		//--

		//-- Limpar
		$scope.AtendimentoRelatorioLimpar = function (){
			$scope.filtro = 'VAZIO';
			$scope.unidadeBasicaSaude = null;
			$scope.profissional = null;
			$scope.cidadao = null;
			$scope.dataAtendimentoInicio = null;
			$scope.dataAtendimentoFinal = null;
			$window.document.getElementById('filtro').focus();
		}
		//--
		
		//-- Imprimir
		$scope.AtendimentoRelatorioImprimir = function (){
			switch ($scope.filtro) {
				case "VAZIO":
					$scope.itens = [];
					AtendimentoService.Print().then(function(data){
						$location.path('/relatorio/atendimento');
					});
					break;
					
				case "UBS":
					$scope.itens = [];
					AtendimentoService.PrintAtendimentoRelatorioPesquisarPorUbs($scope.unidadeBasicaSaude.i_unidade_basica_saude).then(function(data){
						$location.path('/relatorio/atendimento');
					});
					break;
					
				case "PROFISSIONAL":
					$scope.itens = [];
					AtendimentoService.PrintAtendimentoRelatorioPesquisarPorProfissional($scope.profissional.i_profissional).then(function(data){
						$location.path('/relatorio/atendimento');
					});
					break;

				case "CIDADAO":
					$scope.itens = [];
					AtendimentoService.PrintAtendimentoRelatorioPesquisarPorCidadao($scope.cidadao.i_cidadao).then(function(data){
						$location.path('/relatorio/atendimento');
					});
					break;
					
				case "DATA_ATENDIMENTO":
					var parameters = {
						aDataInicio : $scope.dataAtendimentoInicio,
						aDataFinal : $scope.dataAtendimentoFinal
					};

					var config = {
						params : parameters
					};

					$scope.itens = [];
					AtendimentoService.PrintAtendimentoRelatorioPesquisarPorDataAtendimento(config).then(function(data){
						$location.path('/relatorio/atendimento');
					});
					break;
			}
		}
		//--
	}

	AdoecimentoRelatorioController.$inject = ['$scope','$location', '$window', 'AtendimentoService', 'UbsService', 'MunicipioService'];

	function AdoecimentoRelatorioController($scope, $location, $window, AtendimentoService, UbsService, MunicipioService) {
		$scope.listaVazia = true;
		$scope.itens = [];
		
		$scope.filtro = 'VAZIO';
		
		//-- Carregar lista de Ubs
		UbsService.GetAll().then(function(data){
			$scope.ubss = data;
		});
		//--

		//-- Carregar lista de Cidadao
		MunicipioService.GetAll().then(function(data){
			$scope.municipios = data;
		});
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
		AtendimentoService.GeAdoecimentotAll().then(function(data){
			for (var i = data.length - 1; i >= 0; i--) {
				data[i].codigoCid = data[i].atendimentoSintoma[i].cid.codigoCid;
				data[i].descricaoCid = data[i].atendimentoSintoma[i].cid.descricao;
			};
			
			$scope.itens = data;
			
			$scope.totalItens = $scope.itens.length;

			$scope.listaVazia = $scope.itens.length === 0;
		});

		//-- Pesquisa
		$scope.AtendimentoRelatorioPesquisar = function (){
			switch ($scope.filtro) {
				case "VAZIO":
					$scope.itens = [];
					AtendimentoService.GeAdoecimentotAll().then(function(data){
						for (var i = data.length - 1; i >= 0; i--) {
							data[i].codigoCid = data[i].atendimentoSintoma[i].cid.codigoCid;
							data[i].descricaoCid = data[i].atendimentoSintoma[i].cid.descricao;
						};
							
						$scope.itens = data;
						
						$scope.totalItens = $scope.itens.length;

						$scope.listaVazia = $scope.itens.length === 0;
						});
					break;
					
				case "MUNICIPIO":
					$scope.itens = [];
					AtendimentoService.AdoecimentoRelatorioPesquisarPorMunicipio($scope.municipio.i_municipio).then(function(data){
						for (var i = data.length - 1; i >= 0; i--) {
							data[i].codigoCid = data[i].atendimentoSintoma[i].cid.codigoCid;
							data[i].descricaoCid = data[i].atendimentoSintoma[i].cid.descricao;
						};
						
						$scope.itens = data;
						
						$scope.totalItens = $scope.itens.length;

						$scope.listaVazia = $scope.itens.length === 0;
					});
					
					break;
					
				case "UBS":
					$scope.itens = [];
					AtendimentoService.AdoecimentoRelatorioPesquisarPorUbs($scope.unidadeBasicaSaude.i_unidade_basica_saude).then(function(data){
						for (var i = data.length - 1; i >= 0; i--) {
							data[i].codigoCid = data[i].atendimentoSintoma[i].cid.codigoCid;
							data[i].descricaoCid = data[i].atendimentoSintoma[i].cid.descricao;
						};
						
						$scope.itens = data;
						
						$scope.totalItens = $scope.itens.length;

						$scope.listaVazia = $scope.itens.length === 0;
					});
					
					break;
					
				case "PERIODO":
					var parameters = {
						aDataInicio : $scope.dataInicio,
						aDataFinal : $scope.dataFinal
					};

					var config = {
						params : parameters
					};

					$scope.itens = [];
					AtendimentoService.AdoecimentoRelatorioPesquisarPorPeriodo(config).then(function(data){
						for (var i = data.length - 1; i >= 0; i--) {
							data[i].codigoCid = data[i].atendimentoSintoma[i].cid.codigoCid;
							data[i].descricaoCid = data[i].atendimentoSintoma[i].cid.descricao;
						};
						
						$scope.itens = data;
						
						$scope.totalItens = $scope.itens.length;

						$scope.listaVazia = $scope.itens.length === 0;
					});
					
					break;
			}
		}
		//--

		//-- Limpar
		$scope.AtendimentoRelatorioLimpar = function (){
			$scope.filtro = 'VAZIO';
			$scope.municipio = null;
			$scope.unidadeBasicaSaude = null;
			$scope.dataAtendimentoInicio = null;
			$scope.dataAtendimentoFinal = null;
			$window.document.getElementById('filtro').focus();
		}
		//--
		
		//-- Imprimir
		$scope.AtendimentoRelatorioImprimir = function (){
			var parameters = {
				nome : $scope.nomeCbo,
				codigoCbo : $scope.codigoCbo
			};

			var config = {
				params : parameters
			};
			
			AtendimentoService.Print(config).then(function(data){
					$location.path('/cbo');
				})
		}
		//--
	}
})();