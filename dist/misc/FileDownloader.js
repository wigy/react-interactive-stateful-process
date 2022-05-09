"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadUrl = void 0;
/**
 * Download and save given URL as a file.
 * @param url
 * @param token
 */
const downloadUrl = (url, token) => {
    const headers = token ? { Authorization: 'Bearer ' + token } : {};
    fetch(url, {
        method: 'GET',
        headers: new Headers(headers)
    })
        .then(response => response.blob())
        .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.download = 'koe.file';
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
};
exports.downloadUrl = downloadUrl;
//# sourceMappingURL=FileDownloader.js.map