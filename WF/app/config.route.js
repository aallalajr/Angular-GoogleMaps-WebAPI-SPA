(function () {
    'use strict';

    var app = angular.module('app');

    app.constant('routes', getRoutes());

    app.config(['$routeProvider', 'routes', routeConfigurator]);
    
    function routeConfigurator($routeProvider, routes) {
        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    title: 'dashboard',
                    templateUrl: 'app/dashboard/dashboard.html',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-tachometer"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }, {
                url: '/well/:id',
                config: {
                    title: 'well',
                    templateUrl: 'app/wells/welldetail.html',
                    settings: { }
                }
            }
        ];
    }
})();