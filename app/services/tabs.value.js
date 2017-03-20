(function () {
    angular.module('app').value('navTabs', [
        {
            name: 'Conditions',
            state: 'parent.childA',
            enable: true,
            active: true
        },
        {
            name: 'Financials',
            state: 'parent.childB',
            enable: true,
            active: false
        },
        {
            name: 'FnS',
            state: 'parent.childC',
            enable: true,
            active: false
        }
    ]);
})();