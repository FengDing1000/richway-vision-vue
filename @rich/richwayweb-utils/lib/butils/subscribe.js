function Event() {
    const global = this;


    let Event;


    const _default = `default`;
    Event = (function () {
        let _listen;


        let _trigger;


        let _remove;


        const _slice = Array.prototype.slice;


        const _shift = Array.prototype.shift;


        const _unshift = Array.prototype.unshift;


        const namespaceCache = {};


        let _create;


        let find;


        const each = function (ary, fn) {
            let ret;
            for (let i = 0, l = ary.length; i < l; i++) {
                const n = ary[i];
                ret = fn.call(n, i, n);
            }
            return ret;
        };
        _listen = function (key, fn, cache) {
            if (!cache[key]) {
                cache[key] = [];
            }
            cache[key].push(fn);
        };
        _remove = function (key, cache, fn) {
            if (cache[key]) {
                if (fn) {
                    for (let i = cache[key].length; i >= 0; i--) {
                        if (cache[key] === fn) {
                            cache[key].splice(i, 1);
                        }
                    }
                } else {
                    cache[key] = [];
                }
            }
        };
        _trigger = function () {
            const cache = _shift.call(arguments);


            const key = _shift.call(arguments);


            const args = arguments;


            const _self = this;


            let ret;


            const stack = cache[key];
            if (!stack || !stack.length) {
                return;
            }
            return each(stack, function () {
                return this.apply(_self, args);
            });
        };
        _create = function (namespace) {
            var namespace = namespace || _default;
            const cache = {};


            let offlineStack = [];
            // 离线事件

            const ret = {
                listen(key, fn, last) {
                    _listen(key, fn, cache);
                    if (offlineStack === null) {
                        return;
                    }
                    if (last === `last`) {
                    } else {
                        each(offlineStack, function () {
                            this();
                        });
                    }
                    offlineStack = null;
                },
                one(key, fn, last) {
                    _remove(key, cache);
                    this.listen(key, fn, last);
                },
                remove(key, fn) {
                    _remove(key, cache, fn);
                },
                trigger() {
                    let fn;


                    let args;


                    const _self = this;
                    _unshift.call(arguments, cache);
                    args = arguments;
                    fn = function () {
                        return _trigger.apply(_self, args);
                    };
                    if (offlineStack) {
                        return offlineStack.push(fn);
                    }
                    return fn();
                }
            };
            return namespace
                ? (namespaceCache[namespace] ? namespaceCache[namespace]
                    : namespaceCache[namespace] = ret)
                : ret;
        };
        return {
            create: _create,
            one(key, fn, last) {
                const event = this.create();
                event.one(key, fn, last);
            },
            remove(key, fn) {
                const event = this.create();
                event.remove(key, fn);
            },
            listen(key, fn, last) {
                const event = this.create();
                event.listen(key, fn, last);
            },
            trigger() {
                const event = this.create();
                event.trigger.apply(this, arguments);
            }
        };
    }());
    return Event;
}

module.exports = () => Event();
