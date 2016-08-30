(function () {
	'use strict';

	angular
		.module('app', ['ngCookies', 'ui.router', 'ui.bootstrap', 'angular-confirm', 'ui.mask', 'ngCpfCnpj'])
		.run(run)
		.value('API', 'http://localhost:8080/');//Desenvolviemnto
		//.value('API', 'http://localhost:8080/app-sisape-ws/');//Produção

	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
	function run($rootScope, $location, $cookieStore, $http) {
		$http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
		$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
		$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT';
		$http.defaults.headers.common['Access-Control-Allow-Credential'] = 'true';


		// keep user logged in after page refresh
		/*$rootScope.globals = $cookieStore.get('globals') || {};
		if ($rootScope.globals.currentUser) {
				$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		}*/

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
				// redirect to login page if not logged in and trying to access a restricted page
			/*	var restrictedPage = $.inArray($location.path(), ['/login', '/paciente/novo', '/paciente/listagem']) === -1;
				var loggedIn = $rootScope.globals.currentUser;
				if (restrictedPage && !loggedIn) {
						$location.path('/login');
				}*/
		});
	}
})();
