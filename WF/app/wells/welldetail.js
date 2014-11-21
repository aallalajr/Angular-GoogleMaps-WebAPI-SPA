(function () {
    'use strict';
    var controllerId = 'welldetail';
    angular.module('app').controller(controllerId, ['$routeParams', '$scope', '$window', 'common', 'datacontext', welldetail]);

    function welldetail($routeParams, $scope, $window, common, datacontext) {
        var uri = '/api/Well/';

        var vm = this;
        vm.cancel = cancel;
        vm.deleteWell = deleteWell;
        vm.goBack = goBack;
        vm.isSaving = false;
        vm.isNew = false;
        vm.map = {
            title: 'Location',
        };
        vm.save = save;
        vm.well = 0;
        vm.wellIdParameter = $routeParams.id;

        Object.defineProperty(vm, 'canSave', {
            get: canSave
        });

        function canSave() { return !vm.isSaving; }
        
        activate();

        function activate() {
            onDestroy();
            common.activateController(getRequestedWell(), controllerId);
        }
        
        function cancel() {
            datacontext.cancel();
        }
        
        function onDestroy() {
            $scope.$on('$destroy', function () {
                datacontext.cancel();
            });
        }
        
        function getRequestedWell() {
            var val = $routeParams.id;
            if (val == 'new') {
                vm.isNew = true;
                return vm.well;
            }
            
            return datacontext.getById(uri, val).then(function (data) {
                vm.well = data;
                getMap();
            }, function () {
                vm.well = undefined;
            });
        }
        
        function goBack() { $window.history.back(); }
        
        function getMap() {
            
            var mapOptions = {
                zoom: 13,
                center: { lat: vm.well.Latitude, lng: vm.well.Longitude }
            };
            
            var map = new google.maps.Map(document.getElementById('well-detail-map-canvas'), mapOptions);

            var bounds = new google.maps.LatLngBounds();
            var infowindow = new google.maps.InfoWindow();

            var latlng = new google.maps.LatLng(vm.well.Latitude, vm.well.Longitude);
            bounds.extend(latlng);

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: vm.well.Name
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(this.title);
                infowindow.open(map, this);
            });
        }
        
        function save() {
            vm.isSaving = true;
            if (vm.isNew) {
                return datacontext.create(uri, vm.well, "CreateWell").then(function(saveResult) {
                    vm.isSaving = false;
                    vm.isNew = false;
                }, function(error) {
                    vm.isSaving = false;
                    vm.isNew = false;
                });
            } else {
                return datacontext.save(uri, vm.well, "UpdateWell").then(function(saveResult) {
                    vm.isSaving = false;
                }, function(error) {
                    vm.isSaving = false;
                });
            }
        }

        function deleteWell() {
            return datacontext.deleteEntity(uri + vm.well.Id, "DeleteWell").then(function() {
                goback();
            }, function(error) {

            });
        }
    }
})();