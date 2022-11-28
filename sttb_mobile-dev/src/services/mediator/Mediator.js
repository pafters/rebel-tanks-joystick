class Mediator {
    constructor({ EVENTS = {}, TRIGGERS = {} }) {
        this.events   = {}; // about events
        this.triggers = {}; // about triggers
        this.EVENTS   = EVENTS;
        this.TRIGGERS = TRIGGERS;
        // init events and triggers
        Object.keys(this.EVENTS  ).forEach(key => this.events[this.EVENTS[key]] = []);
        Object.keys(this.TRIGGERS).forEach(key => this.triggers[this.TRIGGERS[key]] = () => { return null; });
    }

    /**********/
    /* EVENTS */
    /**********/
    // get event types
    getEventTypes() {
        return this.EVENTS;
    }

    // subscribe event
    subscribe(name, func) {
        if (this.events[name] && func instanceof Function) {
            this.events[name].push(func);
        }
    }

    unsubscribe(name, _func) {
        if (!(this.events[name] && _func instanceof Function)) {
            return;
        }
        const handlerEntry = this.events[name]
            .map((func, i) => ([func, i]))
            .filter(([func]) => func === _func)[0];
        if (handlerEntry) {
            this.events[name].splice(handlerEntry[1], 1);
        }
    }

    // call event
    call(name, data) {
        if (this.events[name]) {
            this.events[name].forEach(event => {
                if (event instanceof Function) { 
                    event(data);
                }
            });
        }
    }

    /************/
    /* TRIGGERS */
    /************/
    // get trigger types
    getTriggerTypes() {
        return this.TRIGGERS;
    }

    // set trigger
    set(name, func) {
        if (name && func instanceof Function) {
            this.triggers[name] = func;
        }
    }

    // get trigger value
    get(name, data) {
        return (this.triggers[name] && this.triggers[name] instanceof Function) ? this.triggers[name](data) : null;
    }
}

export default Mediator;