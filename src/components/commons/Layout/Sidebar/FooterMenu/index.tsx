import { List, ListItem, Theme, styled } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { RiShareLine } from "react-icons/ri";
import { useSelector } from "react-redux";

import { socials } from "src/commons/menus";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { RootState } from "src/stores/types";
import { setSidebar } from "src/stores/user";
import { ThemeType } from "src/types/theme";

export const Menu = styled(List)<{ open: number; bottom: number; thememode: ThemeType }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 20px);
  height: 60px;
  display: ${({ bottom }) => (bottom ? "none" : "flex")};
  justify-content: space-evenly;
  align-items: center;
  gap: 15px;
  flex-direction: row;
  padding: 0px 10px;
  z-index: 1305;
  background: ${({ theme, bottom, thememode }) =>
    bottom ? "none" : thememode === "light" ? theme.palette.primary[100] : theme.palette.secondary[100]};
  border-top: 1px solid ${(props) => props.theme.palette.primary[200]};
  ${({ theme }) => theme.breakpoints.down("md")} {
    border-top: 0px;
    position: relative;
    justify-content: center;
    padding: 10px 20px 20px;
    height: auto;
    z-index: 1;
    display: ${({ bottom }) => (bottom ? "flex" : "none")};
  }
`;
export const StyledListItem = styled(ListItem)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: sidebar ? "flex" : "none",
  [theme.breakpoints.down("md")]: {
    display: "flex"
  }
}));
export const MenuIcon = styled("img")`
  width: 16px;
  height: auto;
`;

type CustomSX = (theme: Theme, sidebar?: number, bottom?: number) => SystemStyleObject<Theme>;

const itemStyle: CustomSX = (theme, sidebar, bottom) => ({
  display: bottom ? "none" : sidebar ? "flex" : "none",
  justifyContent: "center",
  alignItems: "center",
  width: 30,
  height: 30,
  cursor: "pointer",
  borderRadius: 30,
  padding: 0,
  color: `${theme.palette.secondary.light} !important`,
  background: theme.mode === "light" ? theme.palette.primary[100] : theme.palette.secondary[0],
  border: `1px solid ${theme.palette.primary[200]}`,
  [theme.breakpoints.down("md")]: {
    display: bottom ? "flex" : sidebar ? "flex" : "none"
  },
  "&:hover": {
    background: theme.mode === "light" ? theme.palette.primary[100] : theme.palette.secondary[0],
    color: `${theme.palette.secondary.main} !important`,
    img: {
      filter: "brightness(0.75)"
    }
  }
});

const expandStyle: CustomSX = (theme, sidebar, bottom) => ({
  display: bottom ? "none" : sidebar ? "none" : "flex",
  justifyContent: "center",
  alignItems: "center",
  color: `${theme.palette.primary.main} !important`,
  fontSize: 30,
  width: 40,
  height: 40,
  cursor: "pointer",
  borderRadius: 40,
  padding: 0,
  [theme.breakpoints.down("md")]: {
    display: bottom ? "none" : sidebar ? "flex" : "none"
  }
});

type TProps = {
  bottom?: boolean;
};
const FooterMenu = ({ bottom = false }: TProps) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { theme } = useSelector(({ theme }: RootState) => theme);
  return (
    <Menu open={+sidebar} bottom={+bottom} thememode={theme}>
      {socials.map((item, index) => {
        const { href, title, icon: Icon } = item;
        return (
          <ListItem
            key={"FooterMenu" + index}
            component="a"
            href={href}
            target="_blank"
            rel="noreferrer"
            title={title}
            sx={(theme) => itemStyle(theme, +sidebar, +bottom)}
          >
            {typeof Icon === "string" ? <MenuIcon src={Icon} alt={title} /> : <Icon size={16} />}
          </ListItem>
        );
      })}

      <CustomTooltip placement="right" title="Expand">
        <ListItem
          key={"FooterMenuExpand"}
          component="a"
          target="_blank"
          rel="noreferrer"
          sx={(theme) => expandStyle(theme, +sidebar, +bottom)}
          onClick={() => setSidebar(true)}
        >
          <RiShareLine />
        </ListItem>
      </CustomTooltip>
    </Menu>
  );
};

export default FooterMenu;
