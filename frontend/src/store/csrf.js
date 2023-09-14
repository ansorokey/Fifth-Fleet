// extracts the xsrf-token cookie value
import Cookies from 'js-cookie';

// Our server will only accept get requests from outside sources
// to do anything besides get, a valid XSRF token must be provided in the request
export async function csrfFetch(url, options = {}) {
    // set the method to whatever is provided or default to GET
    options.method = options.method || 'GET';

    // set the headers to whatever is provided or default to empty object
    options.headers = options.headers || {};

    // when the method is not a sinmple get, we need headers
    if (options.method.toUpperCase() !== 'GET') {
        // set the content type to provided or default to application json
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application-json';

        // Grabs the value of the xsrf token
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    // run a normal fetch using passed in options
    const res = await window.fetch(url, options);

    // Throw an error
    if (res.status >= 400) {
        throw res;
    }

    // return the promise
    return res;
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
