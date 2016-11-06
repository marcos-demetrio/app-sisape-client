(function () {
	'use strict';

	angular
		.module('app', ['ngCookies', 'ngRoute', 'brasil.filters', 'ui.bootstrap', 'ui.mask', 'ngCpfCnpj'])
		.run(run)
		.controller('MenuController', MenuController)
		.directive('convertToNumber', ConvertToNumber)
		.value('API', 'http://localhost:8080/');//Desenvolviemnto
		//.value('API', 'http://localhost:8080/app-sisape-ws/');//Produção

	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
	
	function run($rootScope, $location, $cookieStore, $http) {
		$http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
		$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
		$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT';
		$http.defaults.headers.common['Access-Control-Allow-Credential'] = 'true';

		$rootScope.globals = $cookieStore.get('globals') || {};

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			// redirect to login page if not logged in and trying to access a restricted page
			var restrictedPage = $.inArray($location.path(), ['/login', '/esqueciminhasenha', '/cidadao/novo']) === -1;

			$rootScope.userLoggedIn = $rootScope.globals.currentUser;
			if (restrictedPage && ! $rootScope.userLoggedIn) {
				$location.path('/login');
			}

			$rootScope.criarMenu();

			if($rootScope.userLoggedIn){
				$rootScope.ajustarMenuUsuario($rootScope.userLoggedIn.id, $rootScope.userLoggedIn.tipoUsuario);
			}
		});

		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			$rootScope.title = current.$$route.title;
			$rootScope.urlLogin = $location.url() == '/login' || $location.url() == '/esqueciminhasenha';
		});

		$rootScope.inArray = function (item, array) {
			return array.indexOf(item) > -1;
		};

		$rootScope.ajustarMenuUsuario = function (id, tipoUsuario) {
			var url;

			switch (tipoUsuario) {
				case "C":
					url = '#/cidadao/';
					break;
				case "P":
					url = '#/profissional/';
					break;
			}

			$rootScope.meusDadosUrl = url + id + '/editar';
		}

		$rootScope.criarMenu = function () {
			$rootScope.listaMenuProcessos = [
				{tipoUsuario: ['S', 'G', 'P', 'C'], url: '#/agendamento', descricao: 'Agendar atendimento'},
				{tipoUsuario: ['S', 'G', 'P'], url: '#/fila', descricao: 'Fila de atendimentos'},
				{tipoUsuario: ['S', 'G', 'P'], url: '#/atendimento', descricao: 'Atendimento'},
				{tipoUsuario: ['S', 'G', 'P'], url: '#/prontuario', descricao: 'Acompanhamento'}
			];

			$rootScope.listaMenuCadastros = [
				{tipoUsuario: ['S', 'G'], url: '#/pais', descricao: 'País'},
				{tipoUsuario: ['S', 'G'], url: '#/estado', descricao: 'Estado'},
				{tipoUsuario: ['S', 'G'], url: '#/municipio', descricao: 'Município'},
				{tipoUsuario: ['S', 'G'], url: '#/cbo', descricao: 'CBO'},
				{tipoUsuario: ['S', 'G'], url: '#/cid', descricao: 'CID'},
				{tipoUsuario: ['S', 'G'], url: '#/medicamento', descricao: 'Medicamento'},
				{tipoUsuario: ['S', 'G'], url: '#/exame', descricao: 'Exame'},
				{tipoUsuario: ['S', 'G', 'P', 'C'], url: '#/cidadao', descricao: 'Cidadão'},
				{tipoUsuario: ['S'], url: '#/ubs', descricao: 'UBS'},
				{tipoUsuario: ['S', 'G'], url: '#/profissional', descricao: 'Profissional'},
				{tipoUsuario: ['S', 'G'], url: '#/lotacao', descricao: 'Profissional Lotação'},
				{tipoUsuario: ['S', 'G'], url: '#/agenda', descricao: 'Profissional Agenda'}
			];
			
			$rootScope.listaMenuRelatorios = [
				{tipoUsuario: ['S', 'G'], url: '#/relatorio/atendimento', descricao: 'Atendimentos'},
				{tipoUsuario: ['S', 'G'], url: '#/relatorio/adoecimento', descricao: 'Doenças por região'},
			];
		};
	}

	MenuController.$inject = ['$scope', '$location', 'AuthenticationService'];

	function MenuController($scope, $location, AuthenticationService) {
		$scope.logout = function logout() {
			AuthenticationService.ClearCredentials();
			$location.path('/login');
		};
	}

	ConvertToNumber.inject = [];

	function ConvertToNumber(){
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				ngModel.$parsers.push(function(val) {
					return parseInt(val, 10);
				});
				ngModel.$formatters.push(function(val) {
					return '' + val;
				});
			}
		};
	}
})();
