import { ExpandMore} from '@material-ui/icons';
import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core'
import { TextFileLine } from 'interactive-elements'
import React from 'react'

export type ImportLineProps = {
  line: number
  text: string
}

export const ImportLine = (props: ImportLineProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell>{props.line}</TableCell>
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

  return (
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMore />} id={`File ${props.name}`}>
        <Typography variant="subtitle1"><strong>{props.name}</strong></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              {props.lines.map(line => <ImportLine line={line.line + 1} text={line.text}/>)}
            </TableBody>
          </Table>
          </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}
