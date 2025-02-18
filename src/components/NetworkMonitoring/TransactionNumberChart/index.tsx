import { Box, Grid, useTheme } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { useSelector } from "react-redux";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import { API } from "src/commons/utils/api";
import { numberWithCommas } from "src/commons/utils/helper";
import { TooltipBody } from "src/components/commons/Layout/styles";
import NoRecord from "src/components/commons/NoRecord";
import FetchDataErr from "src/components/commons/FetchDataErr";

import {
  BoxInfo,
  ColorChart,
  InfoItem,
  Skeleton,
  StyledTransactionTypeItem,
  StyledTransactionTypes,
  Tab,
  Tabs,
  Title,
  TransactionContainer,
  ValueChart
} from "./styles";

export interface TransactionChartIF {
  date: string;
  simpleTransactions: number | null;
  smartContract: number | null;
  metadata: number | null;
}

type Time = "ONE_MONTH" | "THREE_MONTH" | "ONE_YEAR" | "THREE_YEAR" | "ALL_TIME";
export type TypeChart = "trx" | "simple" | "complex";
type Key = "simpleTransactions" | "smartContract" | "metadata";

const TransactionNumberChart: React.FC = () => {
  const { t } = useTranslation();
  const [rangeTime, setRangeTime] = useState<Time>("ONE_MONTH");
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const { isMobile } = useScreen();
  const optionsTime: Record<Time, { label: string; displayName: string }> = {
    ONE_MONTH: {
      label: t("time.1m"),
      displayName: t("option.tx.aMonth")
    },
    THREE_MONTH: {
      label: t("time.3m"),
      displayName: t("option.tx.threeMonth")
    },
    ONE_YEAR: {
      label: t("time.1y"),
      displayName: t("option.tx.aYear")
    },
    THREE_YEAR: {
      label: t("time.3y"),
      displayName: t("option.tx.threeYear")
    },
    ALL_TIME: {
      label: t("time.all_time"),
      displayName: t("option.tx.all_time")
    }
  };

  const { data, loading, error, statusError } = useFetch<TransactionChartIF[]>(
    `${API.TRANSACTION.GRAPH}/${rangeTime}`,
    undefined,
    false,
    blockKey
  );
  const getDisplayedValue = (list: Omit<TransactionChartIF, "date">[], key: Key) => {
    let sum = 0;
    if (list === null || list.length === 0) return "N/A";
    for (let i = 0; i < list.length; i++) {
      const val = list[i][key];
      if (val === null) {
        return "N/A";
      }
      sum += val;
    }
    return sum;
  };

  const dataOverview = [
    {
      key: "trx",
      title: <Box textAlign={"left"}>{t("glossary.metadata")}</Box>,
      value: getDisplayedValue(data || [], "metadata")
    },
    {
      key: "simple",
      title: <Box textAlign={"left"}>{t("glossary.smartContracts")}</Box>,
      value: getDisplayedValue(data || [], "smartContract")
    },
    { key: "complex", title: t("glossary.simpleTxs"), value: getDisplayedValue(data || [], "simpleTransactions") }
  ];

  const renderLoading = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={9}>
          <Skeleton variant="rectangular" height={400} style={{ borderRadius: 10 }} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
      </Grid>
    );
  };
  if (error && (statusError || 0) < 500)
    return (
      <TransactionContainer>
        <Grid item xs={12} sm={8} md={8} lg={9}>
          <Title>{t("drawer.transactionsHistory")}</Title>
        </Grid>
        <NoRecord />
      </TransactionContainer>
    );
  if (error && (statusError || 0) >= 500)
    return (
      <TransactionContainer>
        <Grid item xs={12} sm={8} md={8} lg={9}>
          <Title>{t("drawer.transactionsHistory")}</Title>
        </Grid>
        <FetchDataErr />
      </TransactionContainer>
    );
  return (
    <TransactionContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8} lg={9}>
          <Title>{t("drawer.transactionsHistory")}</Title>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <Box maxWidth={"260px"} mx={isMobile ? "auto" : "none"}>
            <Tabs display="flex" justifyContent="space-between" width={isMobile ? "100%" : "auto"}>
              {Object.keys(optionsTime).map((option) => {
                return (
                  <Tab
                    key={optionsTime[option as Time].label}
                    active={+(rangeTime === option)}
                    onClick={() => setRangeTime(option as Time)}
                  >
                    {optionsTime[option as Time].label}
                  </Tab>
                );
              })}
            </Tabs>
          </Box>
        </Grid>
      </Grid>
      {loading && renderLoading()}
      {!loading && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={9}>
            <Chart data={data} range={rangeTime} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <BoxInfo>
              <StyledTransactionTypes>{t("glossary.txTypes")}</StyledTransactionTypes>
              {dataOverview.map((item) => (
                <InfoItem key={item.key}>
                  <Box display={"flex"} alignItems={"center"} mb={1}>
                    <ColorChart type={item.key as TypeChart} />
                    <StyledTransactionTypeItem>{item.title}</StyledTransactionTypeItem>
                  </Box>

                  <ValueChart data-testid={item.key}>
                    {typeof item.value === "number" ? numberWithCommas(item.value) : item.value}
                  </ValueChart>
                </InfoItem>
              ))}
            </BoxInfo>
          </Grid>
        </Grid>
      )}
    </TransactionContainer>
  );
};

export default TransactionNumberChart;

const toPercent = (decimal: number) => `${(decimal * 100).toFixed()}%`;
const formatTimeX = (date: Time) => {
  switch (date) {
    case "ONE_MONTH":
    case "THREE_MONTH":
      return "MM/DD";
    case "ONE_YEAR":
    case "THREE_YEAR":
    case "ALL_TIME":
      return "MM/YY";
    default:
      break;
  }
};

const getLabel = (date: string, range: Time) => {
  switch (range) {
    case "ONE_MONTH":
    case "THREE_MONTH":
      return moment(date, "YYYY-MM-DDTHH:mm:ssZ").format("DD MMM");
    case "ONE_YEAR":
    case "THREE_YEAR":
    case "ALL_TIME":
      return moment(date, "YYYY-MM-DDTHH:mm:ssZ").format("MMM YYYY");

    default:
      break;
  }
};

const formatX = (date: string, range: Time) => moment(date, "YYYY-MM-DDTHH:mm:ssZ").format(formatTimeX(range));

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio);
};

const renderTooltipContent = (o: TooltipProps<string | number | (string | number)[], string | number>, range: Time) => {
  const { payload = [], label } = o;
  const nameTooltips = {
    metadata: "Metadata",
    smartContract: "Smart contracts",
    simpleTransactions: "Simple transactions"
  };
  const total = (payload || []).reduce(
    (result: number, entry: Payload<string | number | (string | number)[], string | number>) => {
      if (typeof entry.value === "number") {
        return result + entry.value;
      }
      return result;
    },
    0
  );
  return (
    <Box key={label}>
      <TooltipBody textAlign={"left"}>
        <Box color={({ palette }) => palette.secondary.main} textAlign={"center"}>
          {getLabel(label, range)}
        </Box>
        {(payload || [])
          .map(
            (
              entry: Payload<string | number | (string | number)[], string | number> & { fill?: string },
              index: number
            ) => {
              return (
                <Box key={`item-${index}`} mt={1}>
                  <Box fontSize={"0.75rem"} color={({ palette }) => palette.secondary.light}>{`${
                    nameTooltips[entry.name as keyof typeof nameTooltips]
                  }`}</Box>
                  <Box display={"flex"} alignItems={"center"} mt={1}>
                    <Box width={"20px"} height={"20px"} bgcolor={entry.color} borderRadius={"4px"} mr={1} />
                    <Box fontWeight={"bold"} color={({ palette }) => palette.secondary.main}>
                      {`${numberWithCommas(entry.value as number)} (${getPercent(entry.value as number, total)})`}
                    </Box>
                  </Box>
                </Box>
              );
            }
          )
          .reverse()}
      </TooltipBody>
    </Box>
  );
};

const Chart = ({ data, range }: { data: TransactionChartIF[] | null; range: Time }) => {
  const theme = useTheme();
  const { isLanrgeScreen } = useScreen();
  const { theme: themeMode } = useSelector(({ theme }: RootState) => theme);
  if (!data) return <></>;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        height={500}
        width={500}
        data={data}
        stackOffset="expand"
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id="colorMetadata" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSmartContracts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSimpleTransactions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FACC15" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          tick={{ fill: themeMode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800] }}
          dataKey="date"
          tickFormatter={(date: string) => formatX(date, range)}
          minTickGap={isLanrgeScreen ? 15 : 3}
        />
        <YAxis
          tick={{ fill: themeMode === "light" ? theme.palette.secondary.light : theme.palette.secondary[800] }}
          tickFormatter={toPercent}
        />
        <CartesianGrid horizontal={true} vertical={false} />
        <Tooltip content={(o) => renderTooltipContent(o, range)} />
        <Area
          type="monotone"
          dataKey="simpleTransactions"
          stroke="#FACC15"
          fillOpacity={1}
          stackId="1"
          fill="url(#colorSimpleTransactions)"
        />
        <Area
          type="monotone"
          dataKey="smartContract"
          stroke="#3B82F6"
          fillOpacity={1}
          stackId="1"
          fill="url(#colorSmartContracts)"
        />
        <Area
          type="monotone"
          stackId="1"
          dataKey="metadata"
          stroke="#14B8A6"
          fillOpacity={1}
          fill="url(#colorMetadata)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
