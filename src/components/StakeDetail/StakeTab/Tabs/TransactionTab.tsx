import { Box, useTheme } from "@mui/material";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { DownRedUtxoDarkmode, TooltipIcon, TransferIcon, UpGreenUtxoDarkmode } from "src/commons/resources";
import receiveImg from "src/commons/resources/images/receiveImg.svg";
import sendImg from "src/commons/resources/images/sendImg.svg";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownTokens, { TokenLink } from "src/components/commons/DropdownTokens";
import Table, { Column } from "src/components/commons/Table";
import { useScreen } from "src/commons/hooks/useScreen";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { Img, StyledContainer, StyledLink } from "./styles";

const TransactionTab: React.FC<{ stakeAddress?: string; tabActive: TabStakeDetail }> = ({
  stakeAddress,
  tabActive
}) => {
  return (
    <TransactionListFull
      tabActive={tabActive}
      url={tabActive === "transactions" ? `${API.STAKE.DETAIL}/${stakeAddress}/txs` : ""}
      showTitle={false}
    />
  );
};

interface TransactionListFullProps {
  underline?: boolean;
  url: string;
  selected?: string | null;
  showTitle?: boolean;
  tabActive: TabStakeDetail;
}

const TransactionListFull: React.FC<TransactionListFullProps> = ({
  underline = false,
  url,
  selected,
  showTitle = true,
  tabActive
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transaction>(url, { ...pageInfo, tabActive });
  const theme = useTheme();
  const { isMobile } = useScreen();

  const onClickRow = (e: React.MouseEvent<Element, globalThis.MouseEvent>, r: Transaction) => {
    if (e.target instanceof HTMLAnchorElement || (e.target instanceof Element && e.target.closest("a"))) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transaction>[] = [
    {
      title: t("glossary.txHash"),
      key: "hash",
      minWidth: 120,

      render: (transaction) => {
        const type = transaction?.balance >= 0 ? "up" : "down";
        const isTransferType = transaction?.tokens.some((t) => {
          return (t.quantity < 0 && transaction?.balance >= 0) || (t.quantity >= 0 && transaction?.balance < 0);
        });
        return (
          <Box display={"flex"} alignItems={"center"}>
            {isTransferType ? (
              <Box width={40} ml={"2px"} mr={"8px"}>
                <TransferIcon style={{ scale: "1.15" }} />
              </Box>
            ) : (
              <Box width={50} display={transaction?.balance !== null ? "" : "none"}>
                <Img
                  src={
                    type !== "up"
                      ? theme.isDark
                        ? DownRedUtxoDarkmode
                        : receiveImg
                      : theme.isDark
                      ? UpGreenUtxoDarkmode
                      : sendImg
                  }
                  alt="send icon"
                />
              </Box>
            )}
            <CustomTooltip title={transaction.hash}>
              <StyledLink to={details.transaction(transaction.hash)}>{getShortHash(transaction.hash)}</StyledLink>
            </CustomTooltip>
          </Box>
        );
      }
    },
    {
      title: t("glossary.createdAt"),
      key: "created_at",
      minWidth: 120,
      render: (r) => (
        <DatetimeTypeTooltip>
          <Box display="inline-flex" alignItems="center">
            <Box mr={1}>{formatDateTimeLocal(r.time || "")}</Box>
          </Box>
        </DatetimeTypeTooltip>
      )
    },
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: 50,
      render: (r) => (
        <StyledLink to={details.block(r.blockNo || r.blockHash)}>{r.blockNo || getShortHash(r.blockHash)}</StyledLink>
      )
    },
    {
      title: t("glossary.epoch"),
      key: "epochNo",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>
    },
    {
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div>{t("glossary.slot")}</div>
          <CustomTooltip title={t("common.explainSlot")}>
            <p>
              <TooltipIcon />
            </p>
          </CustomTooltip>
        </Box>
      ),
      key: "epochSlotNo",
      minWidth: "50px"
    },
    {
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div>{t("glossary.absoluteSlot")}</div>
          <CustomTooltip title={t("common.absoluteSlot")}>
            <p>
              <TooltipIcon />
            </p>
          </CustomTooltip>
        </Box>
      ),
      key: "slot",
      minWidth: "100px"
    },
    {
      title: t("fees"),
      key: "fee",
      minWidth: 120,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.fee)}</Box>
          <ADAicon />
        </Box>
      )
    },
    {
      title: t("glossary.adaAmount"),
      minWidth: 120,
      key: "totalOutput",
      render: (transaction) => {
        const isUp = transaction?.balance >= 0;
        let colorTheme: string;
        if (isUp) {
          colorTheme = theme.palette.success[800];
          if (theme.mode === "dark") {
            colorTheme = theme.palette.success[700];
          }
        } else {
          colorTheme = theme.palette.error[700];
        }
        return (
          <Box display="inline-flex" alignItems="center">
            {transaction?.balance ? (
              <>
                <Box mr={1} color={colorTheme}>
                  {!isUp ? `` : `+`}
                  {formatADAFull(transaction.balance)}
                </Box>
                <ADAicon />
              </>
            ) : null}
          </Box>
        );
      }
    },
    {
      title: t("glossary.Token"),
      minWidth: 250,
      key: "totalOutput",
      render: (transaction) => {
        const type = transaction?.balance >= 0 ? "up" : "down";
        let tokens: Token[] = [];
        if (transaction.tokens && transaction.tokens.length > 0) {
          tokens = transaction.tokens.map((token) => ({
            assetId: token.fingerprint,
            assetQuantity: token.quantity,
            assetName: token.displayName
          }));
        }
        return (
          <Box
            display={"flex"}
            alignItems={"center"}
            maxWidth={{ xs: isMobile ? "100%" : "200px", md: "250px" }}
            flexWrap="wrap"
          >
            {transaction.tokens && transaction.tokens.length === 1 && <TokenLink isSuccess={true} token={tokens[0]} />}
            {transaction.tokens && transaction.tokens.length > 1 && (
              <DropdownTokens isSuccess={true} tokens={tokens} type={type} hideInputLabel hideMathChar />
            )}
          </Box>
        );
      }
    }
  ];

  return (
    <StyledContainer>
      <Card title={showTitle ? t("tab.transactions") : ""} underline={underline}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ count: fetchData.total, title: "Total Transactions" }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.replace({ search: stringify({ page, size }) }, history.location.state)
          }}
          onClickRow={onClickRow}
          rowKey="hash"
          selected={selected}
          className="transactions-table"
        />
      </Card>
    </StyledContainer>
  );
};

export default TransactionTab;
