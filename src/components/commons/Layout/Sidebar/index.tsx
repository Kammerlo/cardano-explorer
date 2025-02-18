import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSessionStorage, useWindowSize } from "react-use";
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import moment from "moment";

import {
  DarkModeMobile,
  LightModeMobile,
  LogoDarkmodeFullIcon,
  LogoDarkmodeShortIcon,
  LogoFullIcon,
  LogoIcon
} from "src/commons/resources";
import { setTheme } from "src/stores/theme";
import { RootState } from "src/stores/types";

import SidebarMenu from "./SidebarMenu";
import { HeaderTop, LogoLink, NavBarLogo, NavbarContainer, WrapButtonSelect } from "./styles";

const Sidebar: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { theme } = useSelector(({ theme }: RootState) => theme);
  const [loading, setLoading] = useState(false);
  const { height } = useWindowSize();

  const zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zoneNameShort = moment.tz(zoneName).format("z");
  const [timezoneLS, setTimezoneLS] = useSessionStorage("timezone", window.navigator.language);
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");

  const hanldeSetUserTimezone = async (tz: string) => {
    setLoading(true);
  };

  useEffect(() => {
    if (selectedTimeZone.toLowerCase() !== "utc") {
      sessionStorage.setItem("timezone", window.navigator.language);
    }
  }, [window.navigator.language]);

  const handleChange = async (tz: string) => {
    setSelectedTimeZone(tz);
    setTimezoneLS(tz);
    window.location.reload();
  };

  const muiTheme = useTheme();
  const getLogo = (): string => {
    if (theme === "light") {
      if (sidebar) {
        return LogoFullIcon.toString();
      } else {
        return LogoIcon.toString();
      }
    } else {
      if (sidebar) {
        return LogoDarkmodeFullIcon.toString();
      } else {
        return LogoDarkmodeShortIcon.toString();
      }
    }
  };
  return (
    <NavbarContainer vh={height}>
      <HeaderTop>
        <LogoLink to="/" open={sidebar ? 1 : 0}>
          <NavBarLogo src={getLogo()} sidebar={+sidebar} alt="logo cardano" />
        </LogoLink>
      </HeaderTop>
      <SidebarMenu />

      <WrapButtonSelect>
        <ButtonGroup fullWidth={true} variant="outlined" aria-label="outlined primary button group">
          <Box
            component={Button}
            textTransform={"capitalize"}
            onClick={() => {
              if (selectedTimeZone !== window.navigator.language) {
                handleChange(window.navigator.language);
              }
            }}
            disabled={zoneNameShort === "UTC" || loading}
            color={
              window.navigator.language === selectedTimeZone
                ? muiTheme.palette.primary.main
                : muiTheme.palette.secondary.light
            }
            bgcolor={
              window.navigator.language === selectedTimeZone
                ? muiTheme.isDark
                  ? muiTheme.palette.secondary[0]
                  : muiTheme.palette.primary[200]
                : "transparent"
            }
            border={`2px solid ${
              window.navigator.language === selectedTimeZone
                ? muiTheme.palette.primary.main
                : muiTheme.palette.primary[200]
            } `}
            sx={{
              "&:hover": {
                background:
                  window.navigator.language === selectedTimeZone ? muiTheme.palette.primary[200] : "transparent",
                border: `${window.navigator.language === selectedTimeZone ? "2px" : "1px"} solid ${
                  muiTheme.palette.primary.main
                }`
              },
              "&:disabled": {
                color: muiTheme.palette.primary[200],
                border: `${window.navigator.language === selectedTimeZone ? "2px" : "1px"} solid ${
                  muiTheme.palette.primary[200]
                }`
              }
            }}
            borderRadius={"8px"}
            fontSize={16}
          >
            <Box maxWidth={"100px"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
              {zoneNameShort.indexOf("+") != -1 ? zoneName : zoneNameShort}
            </Box>
          </Box>

          <Box
            component={Button}
            textTransform={"capitalize"}
            onClick={() => {
              if (selectedTimeZone !== "UTC") {
                handleChange("UTC");
              }
            }}
            disabled={loading}
            fontSize={16}
            borderRadius={"8px"}
            color={selectedTimeZone === "UTC" ? muiTheme.palette.primary.main : muiTheme.palette.secondary.light}
            bgcolor={
              selectedTimeZone === "UTC"
                ? muiTheme.isDark
                  ? muiTheme.palette.secondary[0]
                  : muiTheme.palette.primary[200]
                : "transparent"
            }
            border={`2px solid ${
              selectedTimeZone === "UTC" ? muiTheme.palette.primary.main : muiTheme.palette.primary[200]
            } `}
            sx={{
              "&:hover": {
                background: selectedTimeZone === "UTC" ? muiTheme.palette.primary[200] : "transparent",
                border: `${selectedTimeZone === "UTC" ? "2px" : "1px"} solid ${muiTheme.palette.primary.main}`
              }
            }}
            borderLeft={`2px solid ${
              selectedTimeZone === "UTC" ? muiTheme.palette.primary.main : muiTheme.palette.primary.main
            } !important`}
          >
            UTC
          </Box>
        </ButtonGroup>
      </WrapButtonSelect>

      <WrapButtonSelect>
        <ButtonGroup fullWidth={true} variant="outlined" aria-label="outlined primary button group">
          <Box
            component={Button}
            textTransform={"capitalize"}
            onClick={() => {
              setTheme("light");
            }}
            color={muiTheme.isDark ? muiTheme.palette.secondary.light : muiTheme.palette.primary.main}
            bgcolor={muiTheme.isDark ? "transparent" : muiTheme.palette.primary[200]}
            border={`2px solid ${muiTheme.isDark ? muiTheme.palette.primary[100] : muiTheme.palette.primary.main} `}
            borderRadius={"8px"}
            fontSize={16}
            sx={{
              "&:hover": {
                background: muiTheme.isDark ? "transparent" : muiTheme.palette.primary[200],
                border: `2px solid ${muiTheme.palette.primary.main}`
              }
            }}
          >
            <Box
              component={LightModeMobile}
              mr={"4px"}
              fill={muiTheme.isDark ? muiTheme.palette.secondary.light : muiTheme.palette.primary.main}
            />
            Light
          </Box>
          <Box
            component={Button}
            textTransform={"capitalize"}
            onClick={() => {
              setTheme("dark");
            }}
            fontSize={16}
            color={muiTheme.isDark ? muiTheme.palette.primary.main : muiTheme.palette.secondary.light}
            bgcolor={muiTheme.isDark ? muiTheme.palette.secondary[0] : "transparent"}
            border={`2px solid ${muiTheme.isDark ? muiTheme.palette.primary.main : muiTheme.palette.primary[200]} `}
            borderRadius={"8px"}
            borderLeft={`2px solid ${
              muiTheme.isDark ? muiTheme.palette.primary.main : muiTheme.palette.primary.main
            } !important`}
          >
            <Box
              component={DarkModeMobile}
              mr={"4px"}
              fill={muiTheme.isDark ? muiTheme.palette.primary.main : muiTheme.palette.secondary.light}
            />
            Dark
          </Box>
        </ButtonGroup>
      </WrapButtonSelect>
    </NavbarContainer>
  );
};

export default Sidebar;
