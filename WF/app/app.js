(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        
        // Custom modules 
        'common',
        'common.bootstrap',

        // 3rd Party Modules
        'ui.bootstrap'
    ]);
    
    app.run(['$route', function ($route) {
        $(".sidebar").simpleSidebar({
            settings: {
                opener: "#open-sb",
                wrapper: ".wrapper",
                animation: {
                    easing: "easeOutQuint"
                }
            },
            sidebar: {
                align: "left",
                width: 200,
                closingLinks: 'a',
            }
        });
    }]);
})();