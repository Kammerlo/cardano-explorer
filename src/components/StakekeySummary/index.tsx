import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, CircularProgress, IconButton, styled, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { FetchReturnType } from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { details } from "src/commons/routers";
import { DownloadGreenIcon } from "src/commons/resources";
import { formatDateLocal, formatDateTimeLocal } from "src/commons/utils/helper";
import { IReportStaking, IStakeKeySummary } from "src/types/report";

import Table, { Column } from "../commons/Table";
import CustomIcon from "../commons/CustomIcon";
import CustomTooltip from "../commons/CustomTooltip";
import { StyledBox } from "./styles";
import DatetimeTypeTooltip from "../commons/DatetimeTypeTooltip";

export const EVENTS: { [key in keyof IReportStaking]?: string } = {
  eventDelegation: "Delegation",
  eventDeregistration: "Deregistration",
  eventRegistration: "Registration",
  eventRewards: "Rewards",
  eventWithdrawal: "Withdrawal"
};

export function getEventList(data: IReportStaking) {
  return Object.entries(EVENTS)
    .map(([key, value]) => (data[key as keyof typeof data] ? value : null))
    .filter((item) => item);
}

export function getEventType(data: string[]) {
  const events = {
    eventDelegation: false,
    eventDeregistration: false,
    eventRegistration: false,
    eventRewards: false,
    eventWithdrawal: false
  };
  for (const key in events) {
    events[key as keyof typeof events] = data.includes(EVENTS[key as keyof typeof EVENTS]?.toUpperCase() || "");
  }
  return events;
}

interface IStakekeySummaryProps {
  fetchData: FetchReturnType<IStakeKeySummary>;
  pagination: { page: number; size: number };
  onSort?: (sort?: string) => void;
  onPagination?: ({ page, size }: { page: number; size: number }) => void;
}

const StakekeySummary: React.FC<IStakekeySummaryProps> = ({ fetchData, onSort, pagination, onPagination }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const theme = useTheme();
  const [downloadingReport, setDownloadingReport] = useState<number>();

  const downloadFn = async (reportId: number, fileName: string, typeExport: "CSV" | "EXCEL" = "EXCEL") => {
    setDownloadingReport(reportId);
  };

  const columns: Column<IReportStaking>[] = [
    {
      title: t("createdAt"),
      key: "id",
      sort({ columnKey, sortValue }) {
        onSort?.(sortValue ? `${columnKey},${sortValue}` : "");
      },
      render(data) {
        return <DatetimeTypeTooltip>{formatDateTimeLocal(data.createdAt)}</DatetimeTypeTooltip>;
      }
    },
    {
      key: "name",
      title: t("common.reportName"),
      maxWidth: "300px",
      render(data) {
        return (
          <CustomTooltip title={`${data.reportName}`.replaceAll("-", " ")}>
            <StyledBox>{`${data.reportName}`.replaceAll("-", " ")}</StyledBox>
          </CustomTooltip>
        );
      }
    },
    {
      key: "date",
      title: t("common.dateRange"),
      render(data) {
        return `${formatDateLocal(data.fromDate)} - ${formatDateLocal(data.toDate)}`;
      }
    },
    {
      key: "transfer",
      title: t("common.adaTransfers"),
      render(data) {
        return data.isADATransfer ? "Yes" : "No";
      }
    },
    {
      key: "event",
      title: t("report.events"),
      maxWidth: "200px",
      render(data) {
        return getEventList(data).join(", ");
      }
    },
    {
      title: t("common.exportingReport"),
      key: "status",
      minWidth: "100px",
      render(data) {
        return <Status status={data.status}>{data?.status.replace("_", " ")}</Status>;
      }
    },
    {
      key: "download",
      title: "",
      maxWidth: "50px",
      minWidth: "50px",
      render(data) {
        return (
          <Box width="100%" textAlign="right">
            {downloadingReport === data.id ? (
              <CircularProgress size={22} color="primary" />
            ) : data.status === "GENERATED" ? (
              <Box
                component={IconButton}
                textTransform={"capitalize"}
                onClick={() => downloadFn(data.id, data.reportName)}
              >
                <Box>
                  <CustomIcon icon={DownloadGreenIcon} fill={theme.palette.success[700]} width={24} />
                </Box>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        );
      }
    }
  ];
  const { page, size } = pagination;
  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: t("report.stakeAddressSummary"), count: fetchData.total }}
        onClickRow={(e, row) => history.push(details.generated_staking_detail(row.id))}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => onPagination?.({ page: page - 1, size })
        }}
        showTabView
      />
    </Box>
  );
};

export default StakekeySummary;

const Status = styled("span")<{ status: string }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  padding: 7.5px 11.5px;
  border-radius: 2px;
  text-transform: uppercase;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "EXPIRED":
      case "FAILED":
        return theme.palette.error[100];
      case "GENERATED":
        return theme.palette.success[100];
      case "IN_PROGRESS":
        return theme.isDark ? theme.palette.warning[800] : theme.palette.warning[100];
      default:
        return theme.palette.success[100];
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "EXPIRED":
      case "FAILED":
        return theme.palette.error[800];
      case "GENERATED":
        return theme.palette.success[800];
      case "IN_PROGRESS":
        return theme.isDark ? theme.palette.warning[100] : theme.palette.warning[800];
      default:
        return theme.palette.success[800];
    }
  }};
`;
