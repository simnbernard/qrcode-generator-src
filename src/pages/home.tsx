import {
  AppBar,
  Box,
  Button,
  Container,
  createMuiTheme,
  createStyles,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  makeStyles,
  MuiThemeProvider,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import QRCode from "qrcode.react";
import { useCallback, useMemo, useState } from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import { darkTheme, lightTheme } from "../theme";
import { useTranslation } from "react-i18next";

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

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const [value, setValue] = useState<string>();
  const [qrContent, setQrContent] = useState<string>();
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFF");
  const [color, setColor] = useState<string>("#000");
  const [size, setSize] = useState<number>(1024);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const customTheme = useMemo(
    () => createMuiTheme(prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  const handleClose = useCallback(() => setQrContent(undefined), [
    setQrContent,
  ]);

  return (
    <MuiThemeProvider theme={customTheme}>
      <CssBaseline />
      <AppBar position="relative" elevation={0} color="inherit">
        <Toolbar>
          <CenterFocusStrongIcon fontSize="large" />
          <div className={classes.grow} />
          <a href="https://www.linkedin.com/in/simonbernard94/" target="blank">
            <LinkedInIcon color="primary" />
          </a>
        </Toolbar>
      </AppBar>
      <Divider />
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label={t("content")}
              onChange={(e) => setValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              value={backgroundColor}
              label={t("backgroundColor")}
              variant="outlined"
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              value={color}
              label={t("color")}
              variant="outlined"
              onChange={(e) => setColor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              value={size}
              type="number"
              label={t("size")}
              variant="outlined"
              onChange={(e) => setSize(+e.target.value)}
            />
          </Grid>
        </Grid>
        <Box mt={2} textAlign="center">
          <Typography variant="subtitle1">Preview</Typography>
          <QRCode
            value="https://www.youtube.com/watch?v=RV6aLIQgmYg"
            bgColor={backgroundColor}
            fgColor={color}
            size={150}
            renderAs="svg"
            includeMargin={true}
          />
        </Box>
        <Box mt={2} textAlign="center">
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => setQrContent(value)}
            disabled={!Boolean(value)}
          >
            {t("generate")}
          </Button>
        </Box>
      </Container>
      <Dialog
        onClose={handleClose}
        open={Boolean(qrContent)}
        maxWidth={false}
        fullScreen={isMobile}
      >
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
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default Home;
