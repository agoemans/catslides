var NotifyHelper = function(){
    var handlers = {};
    return {
        register: function(handler){
            handlers[handler.name] = handler;
            handler.notifyHelper = this;
        },
        onSlideEvent: function(receiver, mssg){
            //used for updating text etc. after event
            for (key in handlers) {
                if (handlers[key].name === receiver) {
                    var handler = handlers[key];
                    handler.onSlideComplete(mssg);
                }
            }
        },
        sendClickEvent: function(receiver, mssg){
            //used for click events
            for (key in handlers) {
                if (handlers[key].name === receiver) {
                    var handler = handlers[key];
                    handler.onClick(mssg);
                }
            }
        }
    }
};
