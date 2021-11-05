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
    (0, react_1.useEffect)(() => {
        axios_1.default.get(props.url)
            .then(resp => props.receiver(resp.data))
            .catch(err => console.error('Axios:', err));
    }, [props.url]);
}
exports.useAxios = useAxios;