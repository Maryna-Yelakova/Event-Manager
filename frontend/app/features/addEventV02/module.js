(function() {
    angular.module("em.addEvent.v02", ["textAngular"]).config(function($provide) {
        $provide.decorator('taOptions', ['$delegate', function(taOptions) {
            taOptions.toolbar = [
                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol'],
                ['html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount']
            ];
            return taOptions;
        }]);
    });
})();
