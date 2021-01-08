import { ThemeOptions } from "@material-ui/core";
import { cloneDeep, merge } from "lodash";

const common = {
  primary: {
    main: "#58A6FF",
  },
};

const dark = {
  palette: {
    type: "dark",
    background: { paper: "#151B22", default: "#0D1117" },
  },
};

const light = {
  palette: {
    type: "light",
    background: { paper: "#FFF", default: "#FAFAFA" },
  },
};

export const darkTheme = merge(cloneDeep(common), dark) as ThemeOptions;
export const lightTheme = merge(cloneDeep(common), light) as ThemeOptions;
