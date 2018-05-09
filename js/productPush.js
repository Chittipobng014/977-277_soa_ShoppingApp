document.addEventListener('init', function (event) {
    var page = event.target;
    if (page.id === 'product') {
        var id = parseInt(page.data.id);
        Service.getProductsById(page.data.id).then(function (message, datas) {
            var template = $('#productsPushTemplate').html();
            var rendered = Mustache.render(template, datas);
            $('#pushResult').append(rendered);
        })
    }
});