import { Tab, Tabs, styled, alpha } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const ModalTitle = styled("div")({
  fontWeight: "var(--font-weight-bold)",
  fontSize: "var(--font-size-title)",
  color: "var(--text-color)",
  marginBottom: 30,
});

export const TextUserInfo = styled("span")({
  fontWeight: 500,
  fontSize: "var(--font-size-text)",
  color: "var(--text-color)",
  margin: "0px 3px",
  display: "inline-block",
});

export const TextTx = styled("span")`
  font-weight: 400;
  font-size: 14px;
  color: #667085;
`;

export const CustomTab = styled("span")`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  text-transform: none;
  margin-left: 5px;
`;

export const TextAmountReward = styled("span")`
  margin-right: 5px;
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    gap: 50px;
    @media screen and (max-width: 1023px) {
      gap: 30px;
    }
  }
`;

export const StyledTab = styled(Tab)`
  color: ${props => props.theme.palette.grey[400]};
  padding: 0;
  &.Mui-selected {
    color: ${props => props.theme.palette.text.primary};
  }
`;

export const TabLabel = styled("h3")`
  text-transform: none;
  color: inherit;
`;

export const Status = styled("span")<{ status: WalletActivityIF["status"] }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  padding: 7.5px 11.5px;
  border-radius: 2px;
  text-transform: uppercase;
  color: ${({ status, theme }) =>
    status === "SUCCESS"
      ? theme.palette.success.main
      : status === "FAIL"
      ? theme.palette.error.main
      : theme.palette.warning.main};
  background-color: ${({ status, theme }) =>
    status === "SUCCESS"
      ? alpha(theme.palette.success.main, 0.1)
      : status === "FAIL"
      ? alpha(theme.palette.error.main, 0.1)
      : alpha(theme.palette.warning.main, 0.1)};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: var(--font-family-text);
  color: ${props => props.theme.palette.secondary.main} !important;
  font-weight: var(--font-weight-normal);
  &:hover {
    font-family: var(--font-family-text);
    color: ${props => props.theme.palette.secondary.main};
  }
`;

export const OverviewIcon = styled(Box)`
  border-radius: 49px;
  background: ${props => props.theme.palette.green[600_10]};
  width: 29px;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Amount = styled(Box)<{ type: "REWARD_RECEIVED" | "REWARD_WITHDRAWN" }>(({ type, theme }) => ({
  color: type === "REWARD_RECEIVED" ? theme.palette.success.main : theme.palette.error.main,
  display: "flex",
  alignItems: "center",
  gap: 5,
}));
