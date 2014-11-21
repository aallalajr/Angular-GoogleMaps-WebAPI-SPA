(function () {
    'use strict';

    var app = angular.module('app');

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
    };

    var config = {
        docTitle: 'Wells and Fields: ',
        events: events,
        version: '2.1.0'
    };

    app.value('config', config);

    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
    }]);
    //#endregion
})();