(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['$location', '$scope', 'common', 'datacontext', dashboard]);

    function dashboard($location, $scope, common, datacontext) {

        var vm = this;

        vm.gotoWell = gotoWell;
        vm.wells = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getWells()];
            common.activateController(promises, controllerId);
        }
        
        function getMap() {
            var map = new google.maps.Map(document.getElementById('dashboard-map-canvas'));

            var bounds = new google.maps.LatLngBounds();
            var infowindow = new google.maps.InfoWindow();

            for (var i in vm.wells) {
                var latlng = new google.maps.LatLng(vm.wells[i].Latitude, vm.wells[i].Longitude);
                bounds.extend(latlng);
                var image = vm.wells[i].Id < 5 ? 'content/Images/oilwell.png' : null;
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: vm.wells[i].Name,
                    icon: image
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(this.title);
                    infowindow.open(map, this);
                });
                
                google.maps.event.addListener(marker, 'dblclick', function () {
                    gotoWell(vm.wells[i]);
                });
                
                marker.setMap(map);
            }
            map.fitBounds(bounds);
        }
        
        function getWells() {
            datacontext.getAll('/api/Well/').then(function (data) {
                vm.wells = data;
                getMap();
            }, function () {
                vm.wells = undefined;
            });
            
            return vm.wells;
        }

        function gotoWell(well) {
            if (well && well.Id) {
                console.log(well.Id);
                $location.path('/well/' + well.Id);
            }
        }
    }
})();