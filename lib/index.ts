import {Model} from './Model';
import {View} from './View';
import {Controller} from './Controller';

var homeModel = new Model({
    title: 'This is the title',
    updateTitle: function() {
        homeModel.set({title: homeModel.get('title') + ' UPDATED'});
    }
});

var homeView = new View({
    el: '#index',
    template: Handlebars.compile('<h1 id="title">{{title}}</h1>'),
    render: function (data: any) {
        console.log('View about to render.', data);
        document.getElementById('title').innerText = data.title;
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
    },
    init: function() {
        this.view.observe(this.model);
        return this;
    }
});

(<any>homeController.init());
