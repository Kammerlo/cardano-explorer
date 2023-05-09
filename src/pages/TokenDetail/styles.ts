import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "30px 0 40px",
  [theme.breakpoints.down("sm")]: {
    "& > div": {
      padding: "0 16px",
    },
    "& > div:nth-of-type(3)": {
      paddingRight: "0px",
    },
    "& > div:nth-of-type(n+3)": {
      paddingLeft: "16px !important",
    },
    "& h2": {
      paddingLeft: "0px",
    },
  },
}));
