import { Collapse, ListItem } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import { footerMenus, menus } from "src/commons/menus";
import { isExternalLink } from "src/commons/utils/helper";
import { RootState } from "src/stores/types";
import { setSidebar } from "src/stores/user";

import FooterMenu from "../FooterMenu";
import {
  FooterMenuContainer,
  IconMenu,
  Menu,
  MenuIcon,
  MenuText,
  SidebarMenuContainer,
  StyledDivider,
  SubMenu,
  SubMenuText,
  itemStyle
} from "./styles";

const SidebarMenu: React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();
  const pathname = history.location.pathname;
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const specialPath = useSelector(({ system }: RootState) => system.specialPath);
  const { isTablet } = useScreen();

  const isActiveMenu = (href: string, isSpecialPath?: boolean): boolean => {
    if ((href === "/" && pathname.includes("reset-password")) || (href === "/" && pathname.includes("verify-email")))
      return true;
    if (href === pathname) return true;
    if (pathname.split("/").length > 2 && href.includes(pathname.split("/")[1])) {
      if (isSpecialPath) return href === specialPath;
      return true;
    }
    return false;
  };

  const currentActive = useMemo(() => {
    const active = menus.findIndex(
      ({ href, children }) =>
        (href && isActiveMenu(href)) ||
        children?.find(({ href, isSpecialPath }) => href && isActiveMenu(href, isSpecialPath))
    );
    if (active + 1) return `menu-${active}`;

    const footerActive = footerMenus.findIndex(
      ({ href, children }) =>
        (href && isActiveMenu(href)) ||
        children?.find(({ href, isSpecialPath }) => href && isActiveMenu(href, isSpecialPath))
    );
    if (footerActive + 1) return `footer-${footerActive}`;

    return "";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, specialPath]);

  const [active, setActive] = useState<string | null>(currentActive);

  useEffect(() => {
    setActive(sidebar ? active || currentActive : null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebar, specialPath, pathname]);

  useEffect(() => {
    if (pathname === "/") setActive(null);
  }, [pathname, setActive]);

  useEffect(() => {
    if (!sidebar && !isTablet) setSidebar(true);
    else if (sidebar && isTablet) setSidebar(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTablet]);

  useEffect(() => {
    if (isTablet) setSidebar(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = (item: string) => {
    setActive(!sidebar || item !== active ? item : currentActive);
    if (!sidebar) setSidebar(true);
  };
  return (
    <SidebarMenuContainer>
      <Menu>
        {menus.map((item, index) => {
          const { href, key, children, icon, tooltip } = item;
          const title = t(key || "");
          const tooltipTitle = `${!sidebar ? `${title}${title && tooltip ? `: ` : ``}` : ``}${tooltip || ``}`;
          if (item.hidden) return <></>;
          return (
            <React.Fragment key={"Top" + index}>
              {href ? (
                <ListItem
                  key={"Top" + index}
                  onClick={() => setActive(null)}
                  data-testid={`menu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                  {...(isExternalLink(href)
                    ? { component: "a", href, target: "_blank" }
                    : { component: Link, to: href })}
                  sx={(theme) => ({
                    ...itemStyle(theme, sidebar),
                    ...(isActiveMenu(href)
                      ? {
                          backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
                          color: (theme) => theme.palette.secondary[0]
                        }
                      : { color: (theme) => theme.palette.secondary.light }),
                    fontWeight: "bold !important",
                    ":hover": isActiveMenu(href)
                      ? {
                          backgroundColor: `${theme.palette.primary.dark}  !important`
                        }
                      : { backgroundColor: `${theme.palette.primary[200]} !important` }
                  })}
                >
                  {icon ? (
                    <MenuIcon src={icon.toString()} alt={title} iconOnly={+!sidebar} active={+isActiveMenu(href)} />
                  ) : null}
                  <MenuText primary={title} open={+sidebar} active={+isActiveMenu(href)} />
                </ListItem>
              ) : (
                <ListItem
                  key={"Top" + index}
                  component={"div"}
                  data-testid={`menu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                  onClick={() => children?.length && handleOpen(`menu-${index}`)}
                  sx={(theme) => ({
                    ...itemStyle(theme, sidebar),
                    ...(`menu-${index}` === currentActive
                      ? {
                          backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
                          color: (theme) => theme.palette.secondary[0]
                        }
                      : { color: (theme) => theme.palette.secondary.light }),
                    fontWeight: "bold !important",
                    ":hover":
                      `menu-${index}` === currentActive
                        ? {
                            backgroundColor: `${theme.palette.primary.dark} !important`
                          }
                        : { backgroundColor: `${theme.palette.primary[200]} !important` }
                  })}
                >
                  {icon ? (
                    <MenuIcon
                      src={icon.toString()}
                      alt={title}
                      iconOnly={+!sidebar}
                      active={+(`menu-${index}` === currentActive)}
                    />
                  ) : null}
                  <MenuText
                    primary={title}
                    open={+sidebar}
                    active={+(`menu-${index}` === currentActive)}
                    disable={+!!tooltipTitle}
                  />

                  {sidebar && children?.length ? (
                    <IconMenu>
                      {`menu-${index}` === active ? <BiChevronUp size={18} /> : <BiChevronDown size={18} />}
                    </IconMenu>
                  ) : null}
                </ListItem>
              )}
              {children?.length ? (
                <Collapse in={`menu-${index}` === active} timeout="auto" unmountOnExit>
                  <SubMenu disablePadding>
                    {children.map((subItem, subIndex) => {
                      const { href, icon, isSpecialPath, key } = subItem;
                      const title = t(key || "");
                      if (subItem.hidden) return <></>;
                      return href ? (
                        <ListItem
                          data-testid={`submenu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                          key={"Child" + subIndex}
                          {...(isExternalLink(href)
                            ? { component: "a", href, target: "_blank" }
                            : { component: Link, to: href })}
                          sx={(theme) => ({
                            ...itemStyle(theme, sidebar),
                            ...(isActiveMenu(href, isSpecialPath)
                              ? {
                                  backgroundColor: (theme) => `${theme.palette.primary[200]} !important`,
                                  color: (theme) => `${theme.palette.secondary.main} !important`
                                }
                              : { color: (theme) => theme.palette.secondary.light }),
                            paddingLeft: "70px",
                            [theme.breakpoints.down("md")]: {
                              paddingLeft: "60px"
                            },
                            ":hover": isActiveMenu(href, isSpecialPath)
                              ? {
                                  color: `#fff !important`
                                }
                              : {
                                  backgroundColor: (theme) => `${theme.palette.primary[200]} !important`
                                }
                          })}
                        >
                          {icon ? (
                            <MenuIcon
                              src={icon.toString()}
                              alt={title}
                              iconOnly={+!sidebar}
                              active={+isActiveMenu(href, isSpecialPath)}
                            />
                          ) : null}
                          <SubMenuText primary={title} open={+sidebar} active={+isActiveMenu(href, isSpecialPath)} />
                        </ListItem>
                      ) : null;
                    })}
                  </SubMenu>
                </Collapse>
              ) : null}
            </React.Fragment>
          );
        })}
        <StyledDivider sidebar={+sidebar} />
        {footerMenus.map((item, index) => {
          const { href, key, children, icon } = item;
          const title = t(key || "");
          return (
            <React.Fragment key={"Footer" + index}>
              {href ? (
                <ListItem
                  key={"Footer" + index}
                  {...(isExternalLink(href)
                    ? { component: "a", href, target: "_blank" }
                    : { component: Link, to: href })}
                  sx={(theme) => ({
                    ...itemStyle(theme, sidebar),
                    ...(isActiveMenu(href)
                      ? {
                          backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
                          color: (theme) => `${theme.palette.secondary[0]} !important`
                        }
                      : { color: (theme) => theme.palette.secondary.light }),
                    ":hover": isActiveMenu(href)
                      ? {
                          backgroundColor: `${theme.palette.primary.dark} !important`
                        }
                      : { backgroundColor: `${theme.palette.primary[200]} !important` }
                  })}
                >
                  {icon ? (
                    <MenuIcon src={icon.toString()} alt={title} iconOnly={+!sidebar} active={+isActiveMenu(href)} />
                  ) : null}
                  <MenuText primary={title} open={+sidebar} active={+isActiveMenu(href)} />
                </ListItem>
              ) : (
                <ListItem
                  key={"Footer" + index}
                  onClick={() => handleOpen(`footer-${index}`)}
                  sx={(theme) => ({
                    ...itemStyle(theme, sidebar),
                    ...(`footer-${index}` === active
                      ? {
                          backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
                          color: (theme) => theme.palette.secondary[0]
                        }
                      : { color: (theme) => theme.palette.secondary.light }),
                    fontWeight: "bold !important",
                    ":hover":
                      `footer-${index}` === active
                        ? {
                            backgroundColor: `${theme.palette.primary.dark} !important`
                          }
                        : { backgroundColor: `${theme.palette.primary[200]} !important` }
                  })}
                >
                  {icon ? (
                    <MenuIcon
                      src={icon.toString()}
                      alt={title}
                      iconOnly={+!sidebar}
                      active={+(`footer-${index}` === active)}
                    />
                  ) : null}
                  <MenuText primary={title} open={+sidebar} active={+(`footer-${index}` === active)} />
                  {sidebar &&
                    (children?.length ? (
                      <IconMenu>
                        {`footer-${index}` === active ? <BiChevronUp size={18} /> : <BiChevronDown size={18} />}
                      </IconMenu>
                    ) : null)}
                </ListItem>
              )}
              {children?.length ? (
                <Collapse in={`footer-${index}` === active} timeout="auto" unmountOnExit>
                  <SubMenu disablePadding>
                    {children.map((subItem, subIndex) => {
                      const { href, key, icon } = subItem;
                      const title = t(key || "");
                      return href ? (
                        <ListItem
                          key={"FooterChild" + subIndex}
                          {...(isExternalLink(href)
                            ? { component: "a", href, target: "_blank" }
                            : { component: Link, to: href })}
                          sx={(theme) => ({
                            ...itemStyle(theme, sidebar),
                            ...(isActiveMenu(href)
                              ? { backgroundColor: (theme) => `${theme.palette.primary[200]} !important` }
                              : {}),
                            paddingLeft: "70px",
                            [theme.breakpoints.down("md")]: {
                              paddingLeft: "60px"
                            },
                            ":hover": {
                              backgroundColor: `${theme.palette.primary[200]} !important`
                            }
                          })}
                        >
                          {icon ? (
                            <MenuIcon
                              src={icon.toString()}
                              alt={title}
                              iconOnly={+!sidebar}
                              active={+isActiveMenu(href)}
                            />
                          ) : null}
                          <SubMenuText primary={title} open={+sidebar} active={+isActiveMenu(href)} />
                        </ListItem>
                      ) : null;
                    })}
                  </SubMenu>
                </Collapse>
              ) : null}
            </React.Fragment>
          );
        })}
      </Menu>
      <FooterMenuContainer>
        <FooterMenu />
      </FooterMenuContainer>
    </SidebarMenuContainer>
  );
};

export default withRouter(SidebarMenu);
