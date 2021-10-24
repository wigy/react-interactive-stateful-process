"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
const react_1 = __importDefault(require("react"));
const base64_arraybuffer_1 = require("base64-arraybuffer");
const core_1 = require("@material-ui/core");
const react_i18next_1 = require("react-i18next");
/**
 * An file uploader utility.
 * @param props.onUpload A function handling the resulting file upload data.
 */
const FileUploader = (props) => {
    let uploads = [];
    /**
     * Helper to read a selected file in.
     * @param file
     * @returns
     */
    const readFileFromInput = (file) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function () { resolve(reader.result); };
            reader.readAsArrayBuffer(file);
        });
    });
    /**
     * Helper to post process selected files.
     * @param binary
     * @param file
     */
    const collectUploadedFile = (binary, file) => {
        uploads.push({
            name: file.name,
            type: file.type,
            encoding: 'base64',
            data: (0, base64_arraybuffer_1.encode)(binary)
        });
    };
    /**
     * Handler of the file selection event for the file input component.
     * @param event
     */
    const onFileChange = (event) => __awaiter(void 0, void 0, void 0, function* () {
        uploads = [];
        for (const file of Array.from(event.target.files)) {
            const binary = yield readFileFromInput(file).catch(function (reason) {
                console.log(`Error during upload ${reason}`);
                return null;
            });
            if (binary) {
                collectUploadedFile(binary, file);
            }
            event.target.value = '';
        }
        props.onUpload(uploads);
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { id: "file-uploader-input", type: "file", multiple: !!props.multiple, hidden: true, onChange: (e) => onFileChange(e) }),
        react_1.default.createElement("label", { htmlFor: "file-uploader-input" },
            react_1.default.createElement(core_1.Button, { component: "span", color: props.color, variant: props.variant },
                react_1.default.createElement(react_i18next_1.Trans, null, "Upload")))));
};
exports.FileUploader = FileUploader;
