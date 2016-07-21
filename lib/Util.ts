export class Util {
    public static uniqueId(prefix: string): string {
            var charSet = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var len = 8;
            var randomString = '';
            for (var i = 0; i < len; i++) {
                var randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz, randomPoz + 1);
            }
            return `${prefix}-${randomString}`;
    }

    public static extend(from: any, to: any): Object {
            var i: string;
            for (i in to) {
                if (to.hasOwnProperty(i)) {
                    from[i] = to[i];
                }
            }

            return from;
    }

    public static clone(obj: Object): Object {
        return (<any>Object).clone(obj);
    }

    public static each(obj: any, callback: Function) {
        if ((<any[]>obj).length) {
            return [].forEach.call(obj, callback);
        } else {
            return Object.keys(<Object>obj).forEach(function(key: string) {
                callback(key, obj[key]);
            });
        }
    }

    public static domSelector(selector: string): NodeListOf<Element> {
        return document.querySelectorAll(selector);
    }

    public static applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
}
