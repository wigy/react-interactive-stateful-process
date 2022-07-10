"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAxios = void 0;
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
/**
 * Helper hook to call API using axios.
 * @param props
 */
function useAxios(props) {
    const { token, url, receiver } = props;
    (0, react_1.useEffect)(() => {
        if (url === null) {
            receiver(null);
            return;
        }
        let gone = false;
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        (0, axios_1.default)({ method: 'GET', url, headers })
            .then(resp => !gone && receiver(resp.data))
            .catch(err => console.error('Axios:', err));
        return () => {
            gone = true;
        };
    }, [token, url, receiver]);
}
exports.useAxios = useAxios;
//# sourceMappingURL=useAxios.js.map