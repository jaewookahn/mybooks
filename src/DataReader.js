export default class DataReader {
    
    constructor(api_root) {
        this.api_root = api_root;
    }

    xhr = (method, url, data) => {
        let currentTime = new Date().getTime().toString();

        localStorage.setItem("timeStored", currentTime);

        let request = new XMLHttpRequest();

        return new Promise(function(resolve, reject) {
            request.onreadystatechange = function() {
                if(request.readyState !== 4) return;

                if(request.status >= 200 && request.status < 300) {
                    resolve(request.response === '' ? '' : request.response);
                }
                else {
                    reject({
                        status: request.status,
                        statusText: request.statusText,
                        response: request.response,
                        responseText: request.responseText
                    })
                }
            };
            request.open(method, url, true);
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(data));
        })
    };

    xhr_sync = (method, url, data) => {
        let currentTime = new Date().getTime().toString();
        localStorage.setItem("timeStored", currentTime);

        let request = new XMLHttpRequest();

        request.open(method, url, false);
        request.setRequestHeader("Accept", "application/json");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));

        if(request.status >= 200 && request.status < 300) {
            if(request.responseText === '') {
                return JSON.parse('true')
            }
            return request.responseText;
        } else {
            return null;
        }
    };

    getCSVData = (filename) => {
        return this.xhr('GET', this.api_root + '/' + filename);

    }
}