import { createTheme } from '@material-ui/core'
import { blue, teal } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: blue[400],
    },
    secondary: {
      main: teal[500],
    },
  },
})

export default theme
