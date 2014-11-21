(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['$q', 'common', '$http', datacontext]);

    function datacontext($q, common, $http) {

        var service = {
            getAll: getAll,
            getById: getById,
            save: save,
            create: create,
            cancel: cancel,
            deleteEntity: deleteEntity,
        };

        return service;

        function cancel() {
            console.log('cancel');
        }
        
        function getAll(url) {
            var deferred = $q.defer();
            $http.get(url).success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getById(url, id) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'Get',
                params: { id: id }
            }).success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function save(uri, model, commandType) {
            var deferred = $q.defer();
            var config = {
                headers: {
                    "CommandType": commandType
                }
            };

            $http.put(uri, model, config).success(function (data, status, headers) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject(data);
            });
            return deferred.promise;
        }
        
        function create(uri, model, commandType) {
            var deferred = $q.defer();
            var config = {
                headers: {
                    "CommandType": commandType
                }
            };

            $http.post(uri, model, config).success(function (data, status, headers) {
                console.log(status);
                console.log(headers);
            }).error(function () {
                deferred.reject(data);
            });
            return deferred.promise;
        }

        function deleteEntity(url, commandType) {
            var deferred = $q.defer();
            var config = {
                headers: {
                    "CommandType": commandType
                }
            };

            $http.delete(url, config).success(function (data, status, headers) {
                console.log(status);
                console.log(headers);
            }).error(function () {
                
            });
            return deferred.promise;
        }
    }
})();