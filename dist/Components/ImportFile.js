"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportFile = exports.ImportLine = void 0;
const icons_1 = require("@material-ui/icons");
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
/**
 * Renderer for single line of a text file.
 * @param props
 * @returns
 */
const ImportLine = (props) => {
    return (react_1.default.createElement(core_1.TableRow, null,
        react_1.default.createElement(core_1.TableCell, null, props.line),
        react_1.default.createElement(core_1.TableCell, { style: { backgroundColor: props.color } }),
        react_1.default.createElement(core_1.TableCell, null,
            react_1.default.createElement(core_1.Box, { sx: { fontFamily: 'Monospace' } }, props.text))));
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
                        return react_1.default.createElement(exports.ImportLine, { key: line.line, line: line.line + 1, color: color, text: line.text });
                    })))))));
};
exports.ImportFile = ImportFile;
