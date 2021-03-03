export class HTTPRequest {
    public static Get(url: string): Promise<any> {
        return new Promise<any>(function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.responseType = "json";
            request.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            };
            request.onerror = function () {
                reject(new Error("XMLHttpRequest Error: " + this.statusText));
            };
            request.open("GET", url);
            request.send();
        });
    }
}
