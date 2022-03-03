"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonEditor = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const jsoneditor_1 = __importDefault(require("jsoneditor"));
require("jsoneditor/dist/jsoneditor.min.css");
/**
 * JSON editor for any JSON.
 * @param props
 * @returns
 */
const JsonEditor = (props) => {
    if (!props.visible) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const value = props.json;
    let editor;
    const createEditor = (ref) => {
        if (editor)
            return;
        const options = {
            mode: 'code',
            mainMenuBar: false,
            statusBar: true
        };
        editor = new jsoneditor_1.default(ref, options, value);
    };
    const onSave = async () => {
        try {
            const errors = await editor.validate();
            if (Object.keys(errors).length === 0) {
                const json = editor.get();
                await editor.destroy();
                props.onSave(json);
            }
        }
        catch (err) {
            console.error(err);
        }
    };
    const onCancel = async () => {
        await editor.destroy();
        props.onCancel();
    };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Dialog, { fullWidth: true, maxWidth: "xl", open: props.visible, PaperProps: { sx: { height: '90vh' } } },
            react_1.default.createElement(material_1.DialogTitle, null,
                react_1.default.createElement(react_i18next_1.Trans, null, props.title)),
            react_1.default.createElement(material_1.DialogContent, null,
                react_1.default.createElement("div", { className: "RISPSONEditor", style: { height: '75vh' }, ref: ref => createEditor(ref) })),
            react_1.default.createElement(material_1.DialogActions, null,
                react_1.default.createElement(material_1.Button, { id: "Cancel", variant: "outlined", onClick: () => onCancel() },
                    react_1.default.createElement(react_i18next_1.Trans, null, "Cancel")),
                react_1.default.createElement(material_1.Button, { id: "Save", variant: "outlined", onClick: () => onSave(), color: "primary" },
                    react_1.default.createElement(react_i18next_1.Trans, null, "Save")))));
};
exports.JsonEditor = JsonEditor;
//# sourceMappingURL=JsonEditor.js.map