(function () {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider) {

		$routeProvider
			.otherwise({
				redirectTo: '/404'
			})

			.when('/404', {
				templateUrl: 'views/404.html'
			})

			.when('/403', {
				templateUrl: 'views/403.html'
			})

			.when('/inicio', {
				templateUrl: 'views/inicio/view.html',
				controller: 'InicioController',
				title: 'Início'
			})

			.when('/login', {
				templateUrl: 'views/login/view-login.html',
				controller: 'LoginController',
				title: 'Login'
			})

			.when('/esqueciminhasenha', {
				templateUrl: 'views/login/view-esqueci-minha-senha.html',
				controller: 'LoginController',
				title: 'Esqueci Minha Senha'
			})

			.when('/cidadao', {
				templateUrl: 'views/cidadao/listagem.html',
				controller: 'CidadaoListagemController',
				title: 'Pesquisa de cidadão'
			})

			.when('/cidadao/:id/editar', {
				templateUrl: 'views/cidadao/view.html',
				controller: 'CidadaoController',
				title: 'Cadastro de cidadão'
			})

			.when('/cidadao/novo', {
				templateUrl: 'views/cidadao/view.html',
				controller: 'CidadaoController',
				title: 'Cadastro de cidadão'
			})

			.when('/pais', {
				templateUrl: 'views/pais/listagem.html',
				controller: 'PaisListagemController',
				title: 'Pesquisa de país'
			})

			.when('/pais/:id/editar', {
				templateUrl: 'views/pais/view.html',
				controller: 'PaisController',
				title: 'Cadastro de país'
			})

			.when('/pais/novo', {
				templateUrl: 'views/pais/view.html',
				controller: 'PaisController',
				title: 'Cadastro de país'
			})

			.when('/estado', {
				templateUrl: 'views/estado/listagem.html',
				controller: 'EstadoListagemController',
				title: 'Pesquisa de estado'
			})

			.when('/estado/:id/editar', {
				templateUrl: 'views/estado/view.html',
				controller: 'EstadoController',
				title: 'Cadastro de estado'
			})

			.when('/estado/novo', {
				templateUrl: 'views/estado/view.html',
				controller: 'EstadoController',
				title: 'Cadastro de estado'
			})

			.when('/municipio', {
				templateUrl: 'views/municipio/listagem.html',
				controller: 'MunicipioListagemController',
				title: 'Pesquisa de município'
			})

			.when('/municipio/:id/editar', {
				templateUrl: 'views/municipio/view.html',
				controller: 'MunicipioController',
				title: 'Cadastro de município'
			})

			.when('/municipio/novo', {
				templateUrl: 'views/municipio/view.html',
				controller: 'MunicipioController',
				title: 'Cadastro de município'
			})

			.when('/cbo', {
				templateUrl: 'views/cbo/listagem.html',
				controller: 'CboListagemController',
				title: 'Pesquisa de CBO'
			})

			.when('/cbo/:id/editar', {
				templateUrl: 'views/cbo/view.html',
				controller: 'CboController',
				title: 'Cadastro de CBO'
			})

			.when('/cbo/novo', {
				templateUrl: 'views/cbo/view.html',
				controller: 'CboController',
				title: 'Cadastro de CBO'
			})

			.when('/cid', {
				templateUrl: 'views/cid/listagem.html',
				controller: 'CidListagemController',
				title: 'Pesquisa de CID'
			})

			.when('/cid/:id/editar', {
				templateUrl: 'views/cid/view.html',
				controller: 'CidController',
				title: 'Cadastro de CID'
			})

			.when('/cid/novo', {
				templateUrl: 'views/cid/view.html',
				controller: 'CidController',
				title: 'Cadastro de CID'
			})

			.when('/ubs', {
				templateUrl: 'views/unidade-basica-saude/listagem.html',
				controller: 'UbsListagemController',
				title: 'Pesquisa de UBS'
			})

			.when('/ubs/:id/editar', {
				templateUrl: 'views/unidade-basica-saude/view.html',
				controller: 'UbsController',
				title: 'Cadastro de UBS'
			})

			.when('/ubs/novo', {
				templateUrl: 'views/unidade-basica-saude/view.html',
				controller: 'UbsController',
				title: 'Cadastro de UBS'
			})
			
			.when('/profissional', {
				templateUrl: 'views/profissional/listagem.html',
				controller: 'ProfissionalListagemController',
				title: 'Pesquisa de Profissional'
			})

			.when('/profissional/:id/editar', {
				templateUrl: 'views/profissional/view.html',
				controller: 'ProfissionalController',
				title: 'Cadastro de Profissional'
			})

			.when('/profissional/novo', {
				templateUrl: 'views/profissional/view.html',
				controller: 'ProfissionalController',
				title: 'Cadastro de Profissional'
			})
			
			.when('/lotacao', {
				templateUrl: 'views/profissional-lotacao/listagem.html',
				controller: 'ProfissionalLotacaoListagemController',
				title: 'Pesquisa de Lotação'
			})

			.when('/lotacao/:id/editar', {
				templateUrl: 'views/profissional-lotacao/view.html',
				controller: 'ProfissionalLotacaoController',
				title: 'Cadastro de Lotação'
			})

			.when('/lotacao/novo', {
				templateUrl: 'views/profissional-lotacao/view.html',
				controller: 'ProfissionalLotacaoController',
				title: 'Cadastro de Lotação'
			})
			
			.when('/agenda', {
				templateUrl: 'views/profissional-agenda/view.html',
				controller: 'ProfissionalAgendaController',
				title: 'Cadastro de Agenda'
			})

			.when('/agendamento', {
				templateUrl: 'views/agendamento/listagem.html',
				controller: 'AgendamentoListagemController',
				title: 'Pesquisa de Agendamentos'
			})

			.when('/agendamento/:id/editar', {
				templateUrl: 'views/agendamento/view.html',
				controller: 'AgendamentoController',
				title: 'Cadastro de Agendamento'
			})

			.when('/agendamento/novo', {
				templateUrl: 'views/agendamento/view.html',
				controller: 'AgendamentoController',
				title: 'Cadastro de Agendamento'
			})

			.when('/atendimento', {
				templateUrl: 'views/atendimento/listagem.html',
				controller: 'AtendimentoListagemController',
				title: 'Pesquisa de Atendimento'
			})

			.when('/atendimento/:id/editar', {
				templateUrl: 'views/atendimento/view.html',
				controller: 'AtendimentoController',
				title: 'Cadastro de Atendimento'
			})

			.when('/atendimento/:idgendaemnto', {
				templateUrl: 'views/atendimento/view.html',
				controller: 'AtendimentoController',
				title: 'Realizar Atendimento'
			})

			.when('/atendimento/novo', {
				templateUrl: 'views/atendimento/view.html',
				controller: 'AtendimentoController',
				title: 'Cadastro de Atendimento'
			})

			.when('/medicamento', {
				templateUrl: 'views/medicamento/listagem.html',
				controller: 'MedicamentoListagemController',
				title: 'Pesquisa de Medicamento'
			})

			.when('/medicamento/:id/editar', {
				templateUrl: 'views/medicamento/view.html',
				controller: 'MedicamentoController',
				title: 'Cadastro de Medicamento'
			})

			.when('/medicamento/novo', {
				templateUrl: 'views/medicamento/view.html',
				controller: 'MedicamentoController',
				title: 'Cadastro de Medicamento'
			})

			.when('/fila', {
				templateUrl: 'views/fila-atendimento/listagem.html',
				controller: 'FilaAtendimentoController',
				title: 'Fila de atendimentos'
			})
			
			.when('/exame', {
				templateUrl: 'views/exame/listagem.html',
				controller: 'ExameListagemController',
				title: 'Pesquisa de Exame'
			})

			.when('/exame/:id/editar', {
				templateUrl: 'views/exame/view.html',
				controller: 'ExameController',
				title: 'Cadastro de Exame'
			})

			.when('/exame/novo', {
				templateUrl: 'views/exame/view.html',
				controller: 'ExameController',
				title: 'Cadastro de Exame'
			})
			
			.when('/relatorio/atendimento', {
				templateUrl: 'views/atendimento/rel-atendimento.html',
				controller: 'AtendimentoController',
				title: 'Relatório de Atendimento'
			})

			.when('/relatorio/adoecimento', {
				templateUrl: 'views/atendimento/rel-adoecimento.html',
				controller: 'AtendimentoController',
				title: 'Relatório de Adoecimento'
			})

			.when('/prontuario', {
				templateUrl: 'views/prontuario/view.html',
				controller: 'ProntuarioController',
				title: 'Prontuário do cidadão'
			})
	}
})();