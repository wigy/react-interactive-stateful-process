import { ExpandLess, ExpandMore} from '@material-ui/icons';
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from '@material-ui/core'
import { TextFileLine } from 'interactive-elements'
import React, { useState } from 'react'
import { ConfigView } from '.';

export type ImportLineProps = {
  lineNumber: number
  columns: Record<string, string>
  text: string
  segmentId?: string
  color?: string
}

/**
 * Renderer for single line of a text file.
 * @param props
 * @returns
 */
export const ImportLine = (props: ImportLineProps): JSX.Element => {
  const { segmentId, lineNumber, color, text, columns } = props
  const hasColumns = Object.keys(columns).length > 0
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell>{lineNumber}</TableCell>
        <TableCell style={{ backgroundColor: color }}></TableCell>
        <TableCell><Box sx={{ fontFamily: 'Monospace' }}>{text}</Box></TableCell>
        <TableCell>
          { hasColumns && !open && <IconButton size="small" onClick={() => setOpen(true)}><ExpandMore/></IconButton> }
          { hasColumns && open && <IconButton size="small" onClick={() => setOpen(false)}><ExpandLess/></IconButton> }
        </TableCell>
      </TableRow>
      { open && hasColumns && (
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            { segmentId && <Typography style={{ color: 'white', backgroundColor: color }}>Segment ID: {segmentId}</Typography> }
            <ConfigView config={columns}/>
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      )
    }
    </>
  )
}

export type ImportFileProps = {
  name: string
  lines: TextFileLine[]
}

/**
 * Line by line display for imported file.
 * @param props
 * @returns
 */
export const ImportFile = (props: ImportFileProps): JSX.Element => {

  const [expanded, setExpanded] = React.useState(true);
  const { palette } = useTheme()
  const colors = [
    palette.primary.dark,
    palette.secondary.light,
    palette.primary.main,
    palette.secondary.dark,
    palette.primary.light,
    palette.secondary.main,
  ]
  const segmentIds: Set<string> = new Set()
  const segementNumbers: Record<string, number> = {}

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>

      <AccordionSummary expandIcon={<ExpandMore />} id={`File ${props.name}`}>
        <Typography variant="subtitle1"><strong>{props.name}</strong></Typography>
      </AccordionSummary>

      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              {props.lines.map(line => {
                let color: string | undefined = undefined
                if (line.segmentId) {
                  if (segementNumbers[line.segmentId] === undefined) {
                    segementNumbers[line.segmentId] = segmentIds.size
                    segmentIds.add(line.segmentId)
                  }
                  color = colors[segementNumbers[line.segmentId] % colors.length]
                }
                return <ImportLine key={line.line} segmentId={line.segmentId} lineNumber={line.line + 1} columns={line.columns} color={color} text={line.text} />
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>

    </Accordion>
  )
}
