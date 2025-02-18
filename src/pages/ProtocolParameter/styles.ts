import { styled, Box, Button, Accordion, AccordionSummary as AccordionSummaryMUI } from "@mui/material";

export const BackButton = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;

export const FilterContainer = styled(Box)(({ theme }) => ({
  width: 300,
  backgroundColor: theme.palette.secondary[0],
  zIndex: 15,
  position: "absolute",
  top: "calc(100% + 10px)",
  right: 0,
  borderRadius: theme.spacing(1),
  boxShadow: "rgba(189, 197, 209, 0.2) 0px 0.5rem 1.2rem",
  [theme.breakpoints.down("md")]: {
    left: "0"
  },
  [theme.breakpoints.down("sm")]: {
    width: 265
  },
  ":hover": {
    backgroundColor: theme.palette.secondary[0]
  },
  ":after": {
    content: "''",
    display: "block",
    background: theme.palette.secondary[0],
    zIndex: 9,
    position: "absolute",
    top: "-6px",
    right: "32px",
    width: "14px",
    height: "16px",
    transform: "rotate(45deg)",
    [theme.breakpoints.down("md")]: {
      right: "0",
      left: "32px"
    }
  }
}));

export const ButtonFilter = styled(Button)(({ theme }) => ({
  display: "inline-block",
  textTransform: "capitalize",
  textAlign: "left",
  color: theme.palette.common.black,
  height: 40,
  pading: "12px 0"
}));

export const AccordionContainer = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "left",
  width: "100%",
  backgroundColor: theme.palette.secondary[0]
}));
export const AccordionSummary = styled(AccordionSummaryMUI)(() => ({
  padding: "0 8px !important",
  textAlign: "left"
}));

export const ApplyFilterButton = styled(Button)(({ theme }) => ({
  width: "100%",
  textTransform: "capitalize",
  fontWeight: "bold",
  fontSize: 16,
  color: theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[100],
  background: theme.palette.primary.main,
  ":hover": {
    background: theme.palette.primary.dark
  },
  ":disabled": {
    background: theme.palette.secondary[600],
    color: theme.palette.secondary[100]
  }
}));

export const UpdatableParameters = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  ".title": {
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "left",
    [`@media screen and (max-width: ${theme.breakpoints.values.sm}px)`]: {
      width: "50%"
    }
  }
}));

export const ColumnProtocol = styled(Box)<{ isLink: number; to: string }>(({ isLink, theme }) => ({
  padding: "24px 20px",
  maxWidth: 200,
  overflow: "hidden",
  whiteSpace: "nowrap",
  minHeight: "16px",
  textOverflow: "ellipsis",
  display: "block",
  background: isLink ? theme.palette.success[100] : "transparent",
  color: isLink ? `${theme.palette.success[800]} !important` : `${theme.palette.secondary.light} !important`,
  fontWeight: isLink ? "bold" : "normal"
}));

export const StyledDropdownItem = styled("label")`
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const TextDescription = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  whiteSpace: "nowrap"
}));

export const SubTitleList = styled("li")`
  font-size: var(--font-size-text-small);
  color: ${(props) => props.theme.palette.secondary.light};
  text-align: left;
  white-space: "pre-wrap";
  list-style-type: none !important;
  margin-bottom: 12px;
`;

export const Header = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.secondary.main,
  fontSize: "2.25rem",
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem"
  }
}));

export const ContainerHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
