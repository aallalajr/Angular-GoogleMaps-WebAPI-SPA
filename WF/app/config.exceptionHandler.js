(function () {
    'use strict';
    
    var app = angular.module('app');

    app.config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', 'config', extendExceptionHandler]);
    }]);
    
    function extendExceptionHandler($delegate, config) {
        var appErrorPrefix = config.appErrorPrefix;
        return function (exception, cause) {
            $delegate(exception, cause);
            if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) { return; }
        };
    }
})();