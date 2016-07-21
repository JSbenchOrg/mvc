import {Events} from './Events';
import {Util} from './Util';

export class Model implements Events {
    public id: string;
    protected attributes: {[key: string]: any};

    // Begin Events class.
    public channels: {[key: string]: Function} = {};
    public eventNumber: number = 0;
    public trigger: (eventName: string, data: any) => void;
    public on: (eventName: string, callback: Function) => void;
    public off: (topic: string) => void;
    // End Events class.

    constructor(attributes: {[key: string]: any}) {
        this.id = Util.uniqueId('model');
        this.attributes = attributes || {};
    }

    public set(attributes: {[key: string]: any}) {
        Util.extend(this.attributes, attributes);
        this.change(attributes);
    }

    public get(attributeName: string): any {
        return this.attributes[attributeName];
    }

    public change(attributes: {[key: string]: any}) {
        this.trigger(this.id + 'update', attributes);
    }

    public toJSON() {
        return Util.clone(this.attributes);
    }
}

Util.applyMixins(Model, [Events]);
