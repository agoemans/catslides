var NotifyHelper = function(){
    var handlers = {};
    return {
        register: function(handler){
            handlers[handler.name] = handler;
            handler.notifyHelper = this;
        },
        notify: function(receiver){
            var handler = handlers[receiver];
            receiver.onClick();
        },
        sendClickEvent: function(receiver){
            console.log('navigator helper send click events');
            for (key in handlers) {
                if (handlers[key].name === receiver) {
                    var handler = handlers[key];
                    handler.onClick();
                }
            }
        }
    }
};
