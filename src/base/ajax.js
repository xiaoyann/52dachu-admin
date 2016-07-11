import ajax from 'ajax';
import {Loading} from 'foundation';

export default function(options) {
    const onSuccess     = options.success;
    const onError       = options.error;
    const onComplete    = options.complete;
    
    options.success = function(response) {
        if (parseInt(response.retcode) === 2000000) {
            return onSuccess.call(options.context, response.data);
        } else {
            return onError.call(options.context, response.msg);
        }
    };

    options.complete = function() {
        Loading.hide();
        if (onComplete) {
            return onComplete.call(options.context);
        }
    };

    if (options.showLoading !== false) Loading.show();

    return ajax(options);
}