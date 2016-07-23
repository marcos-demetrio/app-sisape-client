(function () {
	'use strict';

	angular
		.module('app', ['ngRoute', 'ngCookies', 'ui.router'])
		.config(config)
		.run(run);

	config.$inject = ['$routeProvider', '$locationProvider', '$stateProvider'];
	function config($routeProvider, $locationProvider, $stateProvider) {
		$routeProvider
			.when('/login', {
				controller: 'LoginController',
				templateUrl: 'views/login/login.view.html',
				controllerAs: 'vm',
				title: 'SISAPE - Acesso'
			})

			.when('/paciente/novo', {
				controller: 'PacienteController',
				templateUrl: 'views/view.html',
				//controllerAs: 'vm',
				title: 'Paciente'
			})

			.otherwise({ redirectTo: '/login' });

		$stateProvider
			.state('paciente', {
				url: "/paciente/novo",
				views: {
					"viewMenu": { template: "Paciente Menu" },
					"view": { templateUrl: 'views/paciente/paciente.view.html' }
				}
			})
	}

	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
	function run($rootScope, $location, $cookieStore, $http) {
		// keep user logged in after page refresh
		$rootScope.globals = $cookieStore.get('globals') || {};
		if ($rootScope.globals.currentUser) {
				$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
				// redirect to login page if not logged in and trying to access a restricted page
				var restrictedPage = $.inArray($location.path(), ['/login', '/paciente/novo']) === -1;
				var loggedIn = $rootScope.globals.currentUser;
				if (restrictedPage && !loggedIn) {
						$location.path('/login');
				}
		});
	}
})();
