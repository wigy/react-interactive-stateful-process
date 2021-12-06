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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportFile = exports.ImportLine = void 0;
const icons_1 = require("@material-ui/icons");
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const _1 = require(".");
/**
 * Renderer for single line of a text file.
 * @param props
 * @returns
 */
const ImportLine = (props) => {
    const { segmentId, lineNumber, color, text, columns } = props;
    const hasColumns = Object.keys(columns).length > 0;
    const [open, setOpen] = (0, react_1.useState)(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.TableRow, { onClick: () => setOpen(!open) },
            react_1.default.createElement(core_1.TableCell, null, lineNumber),
            react_1.default.createElement(core_1.TableCell, { style: { backgroundColor: color } }),
            react_1.default.createElement(core_1.TableCell, null,
                react_1.default.createElement(core_1.Box, { sx: { fontFamily: 'Monospace' } }, text)),
            react_1.default.createElement(core_1.TableCell, null,
                hasColumns && !open && react_1.default.createElement(core_1.IconButton, { size: "small", onClick: () => setOpen(true) },
                    react_1.default.createElement(icons_1.ExpandMore, null)),
                hasColumns && open && react_1.default.createElement(core_1.IconButton, { size: "small", onClick: () => setOpen(false) },
                    react_1.default.createElement(icons_1.ExpandLess, null)))),
        open && hasColumns && (react_1.default.createElement(core_1.TableRow, null,
            react_1.default.createElement(core_1.TableCell, null),
            react_1.default.createElement(core_1.TableCell, null),
            react_1.default.createElement(core_1.TableCell, null,
                segmentId && react_1.default.createElement(core_1.Typography, { style: { color: 'white', backgroundColor: color } },
                    "Segment ID: ",
                    segmentId),
                react_1.default.createElement(_1.ConfigView, { config: columns })),
            react_1.default.createElement(core_1.TableCell, null)))));
};
exports.ImportLine = ImportLine;
/**
 * Line by line display for imported file.
 * @param props
 * @returns
 */
const ImportFile = (props) => {
    const [expanded, setExpanded] = react_1.default.useState(true);
    const { palette } = (0, core_1.useTheme)();
    const colors = [
        palette.primary.dark,
        palette.secondary.light,
        palette.primary.main,
        palette.secondary.dark,
        palette.primary.light,
        palette.secondary.main,
    ];
    const segmentIds = new Set();
    const segementNumbers = {};
    return (react_1.default.createElement(core_1.Accordion, { expanded: expanded, onChange: () => setExpanded(!expanded) },
        react_1.default.createElement(core_1.AccordionSummary, { expandIcon: react_1.default.createElement(icons_1.ExpandMore, null), id: `File ${props.name}` },
            react_1.default.createElement(core_1.Typography, { variant: "subtitle1" },
                react_1.default.createElement("strong", null, props.name))),
        react_1.default.createElement(core_1.AccordionDetails, null,
            react_1.default.createElement(core_1.TableContainer, { component: core_1.Paper },
                react_1.default.createElement(core_1.Table, { size: "small" },
                    react_1.default.createElement(core_1.TableBody, null, props.lines.map(line => {
                        let color = undefined;
                        if (line.segmentId) {
                            if (segementNumbers[line.segmentId] === undefined) {
                                segementNumbers[line.segmentId] = segmentIds.size;
                                segmentIds.add(line.segmentId);
                            }
                            color = colors[segementNumbers[line.segmentId] % colors.length];
                        }
                        return react_1.default.createElement(exports.ImportLine, { key: line.line, segmentId: line.segmentId, lineNumber: line.line + 1, columns: line.columns, color: color, text: line.text });
                    })))))));
};
exports.ImportFile = ImportFile;
