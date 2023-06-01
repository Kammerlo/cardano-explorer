import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { details } from "../../../commons/routers";
import { getShortHash, getShortWallet, numberWithCommas } from "../../../commons/utils/helper";
import { CustomSelect, OptionSelect } from "./styles";
import { useScreen } from "../../../commons/hooks/useScreen";
import CustomTooltip from "../CustomTooltip";

interface IDropdownTokens {
  tokens: Token[];
  type?: "up" | "down" | undefined;
  hideInputLabel?: boolean;
  hideMathChar?: boolean;
}

const DropdownTokens: React.FC<IDropdownTokens> = ({ tokens, type = "down", hideInputLabel, hideMathChar }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const history = useHistory();
  const isSend = tokens[0].assetQuantity < 0;
  const theme = useTheme();
  const handleClickItem = (link: string) => {
    history.push(link);
  };
  const { isMobile } = useScreen();
  return (
    <CustomSelect
      sx={{
        minWidth: isMobile ? "100%" : "250px"
      }}
      onOpen={() => setOpenDropdown(true)}
      onClose={() => setOpenDropdown(false)}
      value={"default"}
      IconComponent={() =>
        openDropdown ? (
          <BiChevronUp size={30} style={{ paddingRight: 10, fontSize: "20px" }} />
        ) : (
          <BiChevronDown size={30} style={{ paddingRight: 10, fontSize: "20px" }} />
        )
      }
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: 2,
            marginTop: 0.5,
            "&::-webkit-scrollbar": {
              width: "5px"
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent"
            },
            "&::-webkit-scrollbar-thumb": {
              background: "transparent"
            },
            "&:hover": {
              "&::-webkit-scrollbar-thumb": {
                background: theme.palette.grey[300]
              },
              "&::-webkit-scrollbar-track": {
                background: theme.palette.grey[100]
              }
            }
          }
        }
      }}
    >
      <OptionSelect sx={{ display: "none" }} value="default">
        {" "}
        {!hideInputLabel ? (isSend ? "Sent " : "Received ") : ""}Token
      </OptionSelect>
      {tokens.map((token, idx) => {
        const isNegative = token.assetQuantity <= 0;
        const tokenName = token.assetName || token.assetId;
        const shortTokenName = token.assetName ? getShortHash(tokenName) : getShortWallet(tokenName);
        const isTokenNameLong = tokenName.length > 20;
        return (
          <OptionSelect key={idx} onClick={() => handleClickItem(details.token(token?.assetId))}>
            <Box>
              {isTokenNameLong ? (
                <CustomTooltip title={tokenName} placement="top">
                  <Box>{shortTokenName}</Box>
                </CustomTooltip>
              ) : (
                tokenName
              )}
            </Box>
            <Box fontWeight={"bold"} fontSize={"14px"}>
              {isNegative || hideMathChar ? "" : "+"}
              {`${numberWithCommas(token.assetQuantity) || ""}`}
            </Box>
          </OptionSelect>
        );
      })}
    </CustomSelect>
  );
};

export default DropdownTokens;
