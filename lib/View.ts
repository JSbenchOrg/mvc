import {Events} from './Events';
import {Util} from './Util';
import {Model} from "./Model";

export class View implements Events {
    protected id: string;
    public observe: (model: Model) => void;
    public init: () => void;
    public render: (data: any) => void;

    // Begin Events class.
    public channels: {[key: string]: Function} = {};
    public eventNumber: number = 0;
    public trigger: (eventName: string, data: any) => void;
    public on: (eventName: string, callback: Function) => void;
    public off: (topic: string) => void;
    // End Events class.

    constructor(options: {[key: string]: any}) {
        this.id = Util.uniqueId('view');
        Util.extend(this, options);
    }
}

Util.applyMixins(View, [Events]);
