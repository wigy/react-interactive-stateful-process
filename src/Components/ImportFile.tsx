import { ExpandMore} from '@material-ui/icons';
import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from '@material-ui/core'
import { TextFileLine } from 'interactive-elements'
import React from 'react'

export type ImportLineProps = {
  line: number
  text: string
  color?: string
}

/**
 * Renderer for single line of a text file.
 * @param props
 * @returns
 */
export const ImportLine = (props: ImportLineProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell>{props.line}</TableCell>
      <TableCell style={{ backgroundColor: props.color }}></TableCell>
      <TableCell><Box sx={{ fontFamily: 'Monospace' }}>{props.text}</Box></TableCell>
    </TableRow>
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
                return <ImportLine key={line.line} line={line.line + 1} color={color} text={line.text} />
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>

    </Accordion>
  )
}
