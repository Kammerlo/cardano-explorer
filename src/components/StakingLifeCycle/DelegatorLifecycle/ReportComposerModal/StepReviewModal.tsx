import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress, Stack, useTheme } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import { lists } from "src/commons/routers";
import { getPoolEventType } from "src/components/PoolLifecycle";
import { getEventType } from "src/components/StakekeySummary";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { formatTypeDate, formatTypeDateTime } from "src/commons/utils/helper";

import { ReportType } from "./FilledInfoModal";
import {
  Container,
  OverViewItem,
  OverViewValue,
  StyledBackButton,
  StyledButton,
  StyledStack,
  TextLabelReview,
  TextOverFlow,
  TextRequired,
  TextValueReview
} from "./styles";

import { IPropsModal, STEPS } from ".";

const StepReviewModal: React.FC<IPropsModal> = ({ open, handleCloseModal, params, gotoStep }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const history = useHistory();
  const { isMobile } = useScreen();
  const timeZone = localStorage.getItem("userTimezone")
    ? `${localStorage.getItem("userTimezone")}` === "utc"
      ? "UTC"
      : localStorage.getItem("userTimezone") || "UTC"
    : sessionStorage.getItem("timezone")?.replace(/"/g, "") || "UTC";
  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const start = params?.dateRange ? params?.dateRange[0] : null;
      const end = params?.dateRange ? params?.dateRange[1] : null;
      let defaultReportName = `Report_stake_${params?.address}_${moment(start).format("MM/DD/yyyy")}_${moment(
        end
      ).format("MM/DD/yyyy")}`;
      let response;
      if (isPoolReport) {
        defaultReportName = `Report_pool_${params?.address}_${params?.epochRange[0]}_${params?.epochRange[1]}`;
        const paramsStakeKeyReport = {
          ...getPoolEventType(params?.eventsKey),
          poolId: params?.address,
          reportName: params?.reportName || defaultReportName,
          isPoolSize: params?.poolSize === "YES",
          isFeesPaid: params?.feesPaid === "YES",
          event: params?.eventsKey,
          epochRanges: params?.epochRange,
          timePattern: formatTypeDateTime(),
          zoneOffset: timeZone == "UTC" ? 0 : moment().utcOffset(),
          dateFormat: formatTypeDate().replace("Date format ", "")
        };
      } else {
        const events = params?.eventsKey?.map((event: string) => ({ type: event }));
        const paramsStakeKeyReport = {
          timePattern: formatTypeDateTime(),
          dateFormat: formatTypeDate().replace("Date format ", ""),
          zoneOffset: timeZone == "UTC" ? 0 : moment().utcOffset(),
          stakeKey: params?.address,
          reportName: params?.reportName || defaultReportName,
          fromDate: moment(start).format("yyyy/MM/DD hh:mm:ss"),
          toDate: moment(end).format("yyyy/MM/D hh:mm:ss"),
          isADATransfer: params?.adaTransfers === "YES",
          isFeesPaid: params?.feesPaid === "YES",
          ...getEventType(events?.map((item: { type: string }) => item.type) || [])
        };
      }

      handleCloseModal();
      setTimeout(() => {
        history.push(lists.dashboard(isPoolReport ? "pool-reports" : "stake-key-reports"));
      }, 2000);
    } catch (err) {
      handleCloseModal();
    }
    setLoading(false);
  };

  const [start, end] = params?.dateRange || [];
  const [epochStart, epochEnd] = params?.epochRange || [];
  const EVENTS_NAME = [
    {
      label: t("common.all"),
      value: "SELECT_ALL"
    },
    {
      label: t("common.registration"),
      value: "REGISTRATION",
      type: ReportType.StakeKeyReport
    },

    {
      label: t("common.rewards"),
      value: "REWARDS",
      type: ReportType.StakeKeyReport
    },
    {
      label: t("slc.delegation"),
      value: "DELEGATION",
      type: ReportType.StakeKeyReport
    },
    {
      label: t("common.withDrawFunds"),
      value: "WITHDRAWAL",
      type: ReportType.StakeKeyReport
    },
    {
      label: t("slc.deregistration"),
      value: "DEREGISTRATION",
      type: ReportType.StakeKeyReport
    },
    {
      label: t("slc.registrationCertificate"),
      value: "registration",
      type: ReportType.PoolReport
    },
    {
      label: t("common.poolUpdate"),
      value: "pool_update",
      type: ReportType.PoolReport
    },
    {
      label: t("common.reard"),
      value: "reward",
      type: ReportType.PoolReport
    },
    {
      label: t("common.deregistration"),
      value: "deregistration",
      type: ReportType.PoolReport
    }
  ];
  const events = EVENTS_NAME.filter(({ value }) => params?.eventsKey?.includes(value))
    .map(({ label }) => label)
    .join(", ");

  const isPoolReport = params?.reportType === ReportType.PoolReport;

  const list = [
    {
      label: t("report.name"),
      value: (
        <CustomTooltip title={`${params?.reportName}`.replaceAll("-", " ")}>
          <TextOverFlow>{`${params?.reportName}`.replaceAll("-", " ")}</TextOverFlow>
        </CustomTooltip>
      )
    },
    {
      label: isPoolReport ? t("common.epochRange") : t("filter.daterange"),
      value: (
        <TextOverFlow>
          {isPoolReport
            ? `${t("common.Epoch")} ${epochStart} -  ${t("common.Epoch")} ${epochEnd}`
            : `${moment(start).format("MM/DD/yyyy")} - ${moment(end).format("MM/DD/yyyy")}`}
        </TextOverFlow>
      )
    },
    {
      label: isPoolReport ? t("common.poolID") : t("common.stakeAddressDetails"),
      value: (
        <CustomTooltip title={params?.address}>
          <TextOverFlow>{params?.address}</TextOverFlow>
        </CustomTooltip>
      )
    },
    {
      label: isPoolReport ? t("glossary.poolSize") : t("common.adaTransfers"),
      value: <TextOverFlow>{isPoolReport ? params?.poolSize : params?.adaTransfers}</TextOverFlow>
    },
    {
      label: isPoolReport ? t("common.poolReportByEvent") : t("common.stakingLCEvent"),
      value: <TextOverFlow sx={{ whiteSpace: "normal" }}>{events}</TextOverFlow>
    }
  ];
  return (
    <CustomModal open={open} onClose={handleCloseModal} title={t("report.composer")} width={500}>
      <Container>
        <TextRequired>{t("slc.reportDoubleCheck")}</TextRequired>
        <Stack data-testid="checking-report-content" marginBottom="35px">
          {list.map(({ label, value }) => {
            return (
              <OverViewItem key={label}>
                <OverViewValue>
                  <TextLabelReview>{label}</TextLabelReview>
                  <TextValueReview>{value} </TextValueReview>
                </OverViewValue>
              </OverViewItem>
            );
          })}
        </Stack>
        <StyledStack direction={"row"} display={"flex"} alignContent={"space-between"} gap={"20px"}>
          <StyledBackButton
            data-testid="double-check-button"
            sx={{ fontSize: isMobile ? 14 : 16 }}
            width={isMobile ? 120 : 100}
            onClick={() => gotoStep?.(STEPS.step1)}
          >
            {t("slc.btn.doubleCheck")}
          </StyledBackButton>
          <StyledButton
            data-testid="compose-button"
            disabled={loading}
            onClick={handleGenerateReport}
            sx={{ fontSize: isMobile ? 14 : 16, background: theme.isDark ? theme.palette.primary.main : "" }}
          >
            {loading && <CircularProgress color="info" size={20} />}
            {t("common.generateReport")}
          </StyledButton>
        </StyledStack>
      </Container>
    </CustomModal>
  );
};

export default StepReviewModal;
