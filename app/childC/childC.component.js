(function () {

    'use strict';

    angular.module('app').component('childC', {
        templateUrl: './childC/childC.html',
        controller: 'childCCtrl'
    });

    angular.module('app').controller('childCCtrl', Ctrl);

    Ctrl.$inject = ['$state'];

    function Ctrl($state) {
        var vm = this;

        vm.$onInit = function () { };

        vm.openGrandChild = function () {
            $state.go('parent.childC.grandChild');
        };

    };
})();