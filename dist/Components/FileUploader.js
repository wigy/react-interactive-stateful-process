"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const base64_arraybuffer_1 = require("base64-arraybuffer");
const material_1 = require("@mui/material");
const react_i18next_1 = require("react-i18next");
const icons_material_1 = require("@mui/icons-material");
/**
 * An file uploader utility.
 * @param props.onUpload A function handling the resulting file upload data.
 */
const FileUploader = (props) => {
    const [uploading, setUploading] = (0, react_1.useState)(false);
    let uploads = [];
    /**
     * Helper to read a selected file in.
     * @param file
     * @returns
     */
    const readFileFromInput = async (file) => {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function () { resolve(reader.result); };
            reader.readAsArrayBuffer(file);
        });
    };
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
    const onUpload = async () => {
        if (props.onUpload) {
            props.onUpload(uploads);
        }
        else {
            if (!props.uploadUrl) {
                throw new Error('Upload URL is compulsory if no onUpload() callback defined.');
            }
            setUploading(true);
            await axios_1.default.post(props.uploadUrl, { files: uploads }).then(resp => {
                setUploading(false);
                props.onSuccess && props.onSuccess(resp);
            }).catch(err => {
                setUploading(false);
                props.onError && props.onError(err);
            });
        }
    };
    /**
     * Handler of the file selection event for the file input component.
     * @param event
     */
    const onFileChange = async (event) => {
        uploads = [];
        if (event.target.files) {
            for (const file of Array.from(event.target.files)) {
                const binary = await readFileFromInput(file).catch(function (reason) {
                    console.log(`Error during upload ${reason}`);
                    return null;
                });
                if (binary) {
                    collectUploadedFile(binary, file);
                }
                event.target.value = '';
            }
        }
        onUpload();
    };
    const noIcon = props.icon !== undefined && !props.icon;
    const noText = props.text !== undefined && !props.text;
    const text = props.text || react_1.default.createElement(react_i18next_1.Trans, null, "Upload");
    const icon = noIcon ? undefined : (props.icon || react_1.default.createElement(icons_material_1.UploadFile, null));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { id: "file-uploader-input", disabled: !!props.disabled, type: "file", multiple: !!props.multiple, hidden: true, onChange: (e) => onFileChange(e) }),
        react_1.default.createElement("label", { htmlFor: "file-uploader-input" },
            noText &&
                react_1.default.createElement(material_1.Button, { component: "span", disabled: uploading || !!props.disabled, color: props.color }, icon),
            !noText &&
                react_1.default.createElement(material_1.Button, { component: "span", disabled: uploading || !!props.disabled, startIcon: icon, color: props.color, variant: props.variant }, text))));
};
exports.FileUploader = FileUploader;
//# sourceMappingURL=FileUploader.js.map