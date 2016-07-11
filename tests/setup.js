import jsdom from 'jsdom';

if (typeof document !== 'undefined') {
    return;
}

const html = '<!doctype html><html><body></body></html>';

global.document = jsdom(html);
global.window = document.defaultView;
global.navigator = global.window.navigator;
