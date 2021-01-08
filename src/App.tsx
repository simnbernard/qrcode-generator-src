import {
  AppBar,
  Box,
  Button,
  Container,
  createStyles,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  MuiThemeProvider,
  TextField,
  Theme,
  Toolbar,
  useTheme,
} from "@material-ui/core";
import QRCode from "qrcode.react";
import { useCallback, useState } from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      paddingTop: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
    },
  });
});

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState<string>();
  const [qrContent, setQrContent] = useState<string>();
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFF");
  const [color, setColor] = useState<string>("#000");
  const [size, setSize] = useState<number>(1024);

  const handleClose = useCallback(() => setQrContent(undefined), [
    setQrContent,
  ]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" elevation={0}>
        <Toolbar>
          <CenterFocusStrongIcon fontSize="large" />
          <div className={classes.grow} />
          <IconButton color="inherit">
            <a
              href="https://www.linkedin.com/in/simonbernard94/"
              target="blank"
            >
              <LinkedInIcon />
            </a>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Content"
              onChange={(e) => setValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              value={backgroundColor}
              label="Background color"
              variant="outlined"
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              value={color}
              label="Color"
              variant="outlined"
              onChange={(e) => setColor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              value={size}
              type="number"
              label="Size"
              variant="outlined"
              onChange={(e) => setSize(+e.target.value)}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => setQrContent(value)}
            disabled={!Boolean(value)}
          >
            Generate
          </Button>
        </Box>
      </Container>
      <Dialog onClose={handleClose} open={Boolean(qrContent)} maxWidth={false}>
        <DialogContent>
          {qrContent && (
            <QRCode
              value={qrContent}
              bgColor={backgroundColor}
              fgColor={color}
              size={size}
              renderAs="canvas"
              includeMargin={true}
            />
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            disableElevation
            variant="text"
            color="primary"
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default App;
