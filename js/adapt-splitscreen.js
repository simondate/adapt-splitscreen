define(['coreJS/adapt', './SplitscreenView'], function(Adapt, SplitscreenView) {

    Adapt.on('pageView:preRender', function(pageView) {
    });

    Adapt.on('router:page', function(pageView) {
    });

    Adapt.on('pageView:postRender', function(pageView) {
        var pageModel = pageView.model;
        if (pageModel.has('_splitscreen') && pageModel.get('_splitscreen')._isEnabled) {
            new SplitscreenView({'model': pageModel});
        }
    });

});
