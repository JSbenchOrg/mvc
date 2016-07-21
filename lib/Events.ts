export class Events {
    public channels: {[key: string]: Function};
    public eventNumber: number;

    public trigger(eventName: string, data: any): void {
        for (let topic in this.channels) {
            if (this.channels.hasOwnProperty(topic)) {
                if (topic.split('-', 2).join('-') === eventName) {
                    this.channels[topic](data) !== false || this.off(topic);
                }
            }
        }
    }

    public on(eventName: string, callback: Function): void {
        this.channels[eventName + --this.eventNumber] = callback;
    };

    public off(topic: string) {
        delete this.channels[topic];
    };
}

