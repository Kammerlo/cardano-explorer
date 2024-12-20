import { alpha, Box, Grid, MenuItem, Select, styled } from "@mui/material";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

import { CONFIRMATION_STATUS, TRANSACTION_STATUS } from "src/commons/utils/constants";
import breakpoints from "src/themes/breakpoints";

import CopyButton from "../CopyButton";
import { CommonSkeleton } from "../CustomSkeleton";
interface CardItemProps {
  length: number;
  wide?: number;
  itemonrow: number;
}

export const HeaderDetailContainer = styled(Box)`
  text-align: left;
`;

export const EpochDetail = styled(Box)`
  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

export const BackButton = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  @media screen and (max-width: ${breakpoints.values.md}px) {
    position: relative;
    top: 5px;
  }
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;

export const WrapHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start"
  }
}));

export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${(props) => props.theme.breakpoints.down("sm")} {
    justify-content: flex-start;
  }
`;

export const HeaderTitle = styled(Box)`
  overflow-wrap: anywhere;
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.secondary.main};
  font-size: 2.25rem;
  margin: 0.5rem 0;
  text-transform: capitalize;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 1.5rem;
  }
`;

export const HeaderTitleSkeleton = styled(CommonSkeleton)`
  height: 1em;
  width: 200px;
  max-width: 100%;
  border-radius: 4px;
`;

export const HeaderStatus = styled("small")<{ status?: TransactionStatus | IDataEpoch["status"] }>`
  color: ${({ status, theme }) => {
    switch (status) {
      case TRANSACTION_STATUS.FAILED:
        return theme.palette.error[700];
      case TRANSACTION_STATUS.SUCCESS:
        return theme.palette.success[800];
      case TRANSACTION_STATUS.PENDDING:
      case "IN_PROGRESS":
      case "SYNCING":
        return theme.isDark ? theme.palette.warning[100] : theme.palette.warning[800];
      case "FINISHED":
        return theme.palette.primary.main;
      default:
        return theme.palette.success[800];
    }
  }};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case TRANSACTION_STATUS.FAILED:
        return theme.palette.error[100];
      case TRANSACTION_STATUS.SUCCESS:
        return theme.palette.success[100];
      case TRANSACTION_STATUS.PENDDING:
      case "IN_PROGRESS":
      case "SYNCING":
        return theme.isDark ? theme.palette.warning[800] : theme.palette.warning[100];
      case "FINISHED":
        return theme.palette.primary[100];
      default:
        return theme.palette.success[100];
    }
  }};
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;

export const StakeKeyStatus = styled("small")<{ status?: StakeStatus }>`
  color: ${({ theme, status }) => {
    switch (status) {
      case "ACTIVE":
        return theme.palette.success[800];
      case "RETIRED":
      case "EXPIRED":
        return theme.palette.error[800];
      default:
        return theme.isDark ? theme.palette.warning[100] : theme.palette.secondary.light;
    }
  }};
  background-color: ${({ theme, status }) => {
    switch (status) {
      case "ACTIVE":
        return theme.palette.success[100];
      case "RETIRED":
      case "EXPIRED":
        return theme.palette.error[100];
      default:
        return theme.isDark ? theme.palette.warning[800] : alpha(theme.palette.secondary.light, 0.2);
    }
  }};
  text-transform: uppercase;
  font-weight: bold;
  font-size: var(--font-size-text-small);
  border-radius: 4px;
  height: 60%;
  padding: 8px 16px;
`;

export const SlotLeader = styled("p")`
  margin-top: 0px;
  display: flex;
`;

export const WrapLeaderValue = styled(Box)`
  display: block;
`;

export const SlotLeaderValue = styled("span")<{ sidebar?: boolean }>`
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.primary.main};
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  font-weight: bold;
`;

export const SlotLeaderTitle = styled("small")`
  font-family: var(--font-family-text);
  color: ${({ theme }) => theme.palette.secondary.light};
  align-self: center;
  margin-right: 8px;
  padding-top: 7px;
  white-space: nowrap;
`;

export const SlotLeaderCopy = styled(CopyButton)`
  margin-bottom: 3px;
`;

export const DetailsInfo = styled(Grid)<{ length: number; isclickable?: number }>`
  padding: 30px ${(props) => (props.length > 6 ? 25 : 15)}px;
  margin-top: 15px;
  background: ${(props) => props.theme.palette.secondary[0]};
  border-radius: 15px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    padding: 30px 25px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 20px 15px;
  }
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    box-shadow: ${({ theme, isclickable }) =>
      isclickable ? "1px 2px 15px 0px " + alpha(theme.palette.secondary.light, 0.25) : ""};
  }
`;

export const EpochNumber = styled(Link)<{ is_epoch: number }>(({ theme }) => ({
  fontWeight: "bold",
  color: `${theme.palette.secondary.main} !important`,
  margin: 0,
  fontSize: "1.5rem"
}));

export const EpochText = styled("small")`
  opacity: 0.8;
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const Icon = styled("img")`
  width: 25px;
  height: 25px;
`;

export const IconSkeleton = styled(CommonSkeleton)`
  width: 24px;
  height: 24px;
`;

export const DetailLabelSkeleton = styled(CommonSkeleton)`
  height: 1em;
  width: 50%;
  min-width: 100px;
  border-radius: 4px;
`;

export const DetailValueSkeleton = styled(CommonSkeleton)`
  height: 1em;
  width: 50%;
  min-width: 100px;
  border-radius: 4px;
`;

export const BlockDefault = styled("span")`
  font-size: var(--font-size-text);
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-weight: var(--font-weight-normal);
  opacity: 0.5;
  margin: 0;
  margin-top: 0.25rem;
`;

export const ConfirmStatus = styled("small")<{ status?: keyof typeof CONFIRMATION_STATUS }>`
  color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.HIGH:
        return theme.palette.success[800];
      case CONFIRMATION_STATUS.MEDIUM:
        return theme.palette.warning[800];
      default:
        return theme.palette.error[700];
    }
  }};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.HIGH:
        return theme.palette.success[100];
      case CONFIRMATION_STATUS.MEDIUM:
        return theme.palette.warning[100];
      default:
        return theme.palette.error[100];
    }
  }};
  margin-left: 10px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;

export const InfoIcon = styled(FiInfo)`
  margin-bottom: -2px;
  margin-left: 2px;
`;

export const ProgressLiner = styled("div")<{ progress: number }>`
  position: relative;
  width: 100%;
  background: ${(props) => alpha(props.theme.palette.common.black, 0.2)};
  height: 12px;
  margin-bottom: 10px;
  border-radius: 12px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.progress || 0}%;
    height: 100%;
    border-radius: 12px;
    background: ${(props) => props.theme.palette.gradient[4]};
  }
`;

export const ProgressStatus = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const ProgressStatusText = styled("h4")`
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const ProgressPercent = styled("h4")`
  color: ${(props) => props.theme.palette.warning.main};
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const CardItem = styled(Grid)<CardItemProps>(({ theme, length, wide, itemonrow }) => ({
  width: "max-content",
  padding: length > 6 ? "20px 25px" : "0px 15px",
  borderLeft: `1px solid ${theme.palette.primary[200]}`,
  borderBottom: `1px solid ${theme.palette.primary[200]}`,
  ":first-of-type": {
    borderLeft: "none"
  },
  ...(length > 6
    ? {
        borderBottomWidth: 1,
        [theme.breakpoints.up("lg")]: {
          [`:nth-of-type(${itemonrow}n+1)`]: {
            borderLeftWidth: 0,
            paddingLeft: 0
          },
          [`:nth-last-of-type(-n + ${itemonrow})`]: {
            borderBottom: "none !important",
            [`:nth-of-type(${itemonrow}n + 1)`]: {
              "&~div": {
                borderBottomWidth: 0,
                paddingTop: 20,
                paddingBottom: 0
              }
            }
          }
        }
      }
    : {
        borderBottomWidth: 0,
        [theme.breakpoints.down("lg")]: {
          padding: "20px 25px"
        },
        [theme.breakpoints.down("sm")]: {
          padding: "20px 15px",
          ":nth-of-type(even)": {
            paddingRight: "0 !important"
          }
        }
      }),
  [theme.breakpoints.between("md", "lg")]: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    [`:nth-of-type(${length === 4 ? 4 : 3}n + 1)`]: {
      borderLeftWidth: 0,
      paddingLeft: 0
    },
    [`:nth-last-of-type(-n + ${length === 4 ? 4 : 3})`]: {
      [`:nth-of-type(${length === 4 ? 4 : 3}n + 1)`]: {
        borderBottomWidth: 0,
        "&~div": {
          borderBottomWidth: 0,
          paddingTop: 20,
          paddingBottom: 0
        }
      }
    }
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    [`:nth-of-type(2n + ${wide ? 2 : 1})`]: {
      borderLeftWidth: 0,
      paddingLeft: 0
    },
    ":nth-last-of-type(-n + 2)": {
      [`:nth-of-type(2n + ${wide ? 2 : 1})`]: {
        borderBottomWidth: 0,
        "&~div": {
          borderBottomWidth: 0,
          paddingTop: 20,
          paddingBottom: 0
        }
      }
    }
  },
  [theme.breakpoints.down("sm")]: {
    ":nth-of-type(even)": {
      paddingRight: wide ? 15 : "0 !important",
      paddingLeft: 3
    },
    ":nth-of-type(odd)": {
      paddingLeft: wide ? 15 : "0 !important",
      paddingRight: 3
    }
  }
}));

export const ValueCard = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "1rem",
  fontWeight: "bold",
  wordBreak: "break-word"
}));

export const AllowSearchButton = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 35,
  height: 35,
  backgroundColor: theme.mode === "light" ? theme.palette.primary[100] : theme.palette.secondary[100],
  top: -10,
  right: 0,
  borderRadius: 4,
  cursor: "pointer",
  "& path": {
    stroke: theme.palette.secondary.light
  }
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  position: "absolute",
  top: -10,
  left: 0,
  right: 0,
  zIndex: 101,
  backgroundColor: theme.palette.secondary[0],
  color: theme.palette.secondary.main,
  borderRadius: 8,
  height: 35,
  fieldset: {
    border: "none"
  },
  "& .MuiSelect-icon": {
    color: theme.palette.secondary.main
  }
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  ":hover": {
    background: theme.palette.primary[200]
  },
  "&:after": {
    content: `""`,
    display: "none"
  },
  [theme.breakpoints.down(355)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100dvw",
    height: "unset",
    position: "relative",
    "&:after": {
      display: "block",
      width: "calc(100% - 60px)",
      height: 1,
      background: theme.palette.border.hint,
      position: "absolute",
      bottom: 0,
      left: 14
    },
    "&:last-child:after": {
      display: "none"
    }
  }
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  marginBottom: 10
}));
