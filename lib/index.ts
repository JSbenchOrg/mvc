import {Model} from './Model';
import {View} from './View';
import {Controller} from './Controller';
import {Util} from './Util';

var homeModel = new Model({
    title: 'This is the default title',
    updateTitle: function() {
        homeModel.set({title: homeModel.get('title') + ' UPDATED'});
    }
});

var homeView = new View({
    el: '#index',
    template: Handlebars.compile('<h1 id="title">{{title}}</h1>'),
    // @todo: Internalize this method.
    // On first pass. Modify the whole container via innerHTML.
    // On consecutive passes only modify the areas updated.
    render: function (data: any) {
        console.log('View about to render with data:', data);
        // document.getElementById('title').innerText = data.title;
        Util.domGetElem(this.el).innerHTML = this.template(data);
    },
    observe: function(model: Model) {
        model.on(model.id + 'update', this.render.bind(this));
        return this;
    }
});

var homeController = new Controller({
    model: homeModel,
    view: homeView,
    events: {
        '#title.click': 'updateTitle'
    },
    updateTitle: function () {
        this.model.attributes.updateTitle();
        return this;
    }
});

(<any>homeController.init());
