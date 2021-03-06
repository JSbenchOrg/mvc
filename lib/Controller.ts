import {Events} from './Events';
import {Util} from './Util';
import {Model} from './Model';
import {View} from './View';

export class Controller implements Events {
    public id: string;
    public model: Model;
    public view: View;
    public events: {[key: string]: string};
    // public init: () => this;
    [key: string]: any;

    // Begin Events class.
    public channels: {[key: string]: Function} = {};
    public eventNumber: number = 0;
    public trigger: (eventName: string, data: any) => void;
    public on: (eventName: string, callback: Function) => void;
    public off: (topic: string) => void;
    // End Events class.

    constructor(options:  {[key: string]: any}) {
        this.id = Util.uniqueId('controller');

        // Add custom keys as properties of the class.
        Util.extend(this, options);
    }

    protected addEvents(): void {
        var parts: string[];
        var selector: string;
        var eventType: string;

        Util.each(this.events, (eventName: string, method: string) => {
            parts = eventName.split('.');
            selector = parts[0];
            eventType = parts[1];
            console.log(Util.domSelector(selector));
            Util.each(Util.domSelector(selector), ($node: HTMLElement) => {
                console.log($node);
                $node.addEventListener(eventType, this[method].bind(this));
            });
        });
    }

    public init(): Controller {
        // Render the view with the default model values.
        this.view.render(this.model.toJSON());

        // Update the view when model changes.
        this.view.observe(this.model);

        // Add events to DOM elements.
        if (this.events) {
            this.addEvents();
        }

        return this;
    }
}

Util.applyMixins(Controller, [Events]);
