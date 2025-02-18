import { Box, CircularProgress, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import useFetch from "src/commons/hooks/useFetch";
import { ChartMode, TableMode } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { ROLE_ELEVATED_GEN_REPORT } from "src/commons/utils/constants";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import ReportComposerModal from "src/components/StakingLifeCycle/DelegatorLifecycle/ReportComposerModal";
import SPOLifecycleComponent from "src/components/StakingLifeCycle/SPOLifecycle";
import PoolDetailContext from "src/components/StakingLifeCycle/SPOLifecycle/PoolDetailContext";
import Tabular from "src/components/StakingLifeCycle/SPOLifecycle/Tablular";
import CustomTooltip from "src/components/commons/CustomTooltip";
import NoRecord from "src/components/commons/NoRecord";
import { TruncateSubTitleContainer } from "src/components/share/styled";
import FetchDataErr from "src/components/commons/FetchDataErr";

import {
  AddressLine,
  BoxContainerStyled,
  BoxItemStyled,
  BoxSwitchContainer,
  ButtonReport,
  ButtonSwitch,
  Label,
  LabelSwitch,
  LifeCycleHeader,
  LifeCycleTitle,
  ReportButtonContainer,
  StakeId,
  StyledContainer,
  SwitchGroup
} from "./styles";

interface Params {
  poolId: string;
  mode: ViewMode;
  tab: SPOStep;
}

export interface IReportLimit {
  isLimitReached: boolean;
  limitPer24hours: number;
}

const MODES: ViewMode[] = ["timeline", "tabular"];

const SPOLifecycle = () => {
  const { t } = useTranslation();
  const { poolId = "", mode = "timeline", tab = "registration" } = useParams<Params>();
  const { data: dataReportLimit } = useFetch<IReportLimit>(API.REPORT.REPORT_LIMIT);

  useEffect(() => {
    document.title = `Staking Delegation Lifecycle ${poolId} | Cardano Blockchain Explorer`;
  }, [poolId]);

  const tabList = {
    registration: 0,
    "pool-updates": 1,
    "operator-rewards": 2,
    deregistration: 3,
    tablular: null
  };

  const tabsValid = {
    registration: "isRegistration",
    "pool-updates": "isUpdate",
    "operator-rewards": "isReward",
    deregistration: "isDeRegistration"
  };

  const {
    data,
    error,
    statusError,
    initialized,
    loading: loadingInitialData
  } = useFetch<PoolInfo>(poolId ? API.SPO_LIFECYCLE.POOL_INFO(poolId) : "");
  const { data: renderTabsSPO, loading: loadingListTabs } = useFetch<ListTabResponseSPO>(
    API.SPO_LIFECYCLE.TABS(poolId)
  );
  let validTab: SPOStep = tabList[tab] >= 0 ? tab : "registration";
  const validMode: ViewMode = MODES.find((item) => item === mode) || "timeline";

  const [currentStep, setCurrentStep] = useState(tabList[validTab]);

  useEffect(() => {
    if (renderTabsSPO && renderTabsSPO[tabsValid[tab]]) {
      setCurrentStep(tabList[validTab]);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    validTab = "registration";
    setCurrentStep(tabList["registration"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderTabsSPO]);

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const history = useHistory();
  const theme = useTheme();
  const { sidebar } = useSelector(({ user }: RootState) => user);

  const changeMode = (newMode: ViewMode) => {
    if (mode === newMode) return;
    history.push(details.spo(poolId, newMode, validTab));
  };

  const checkDisableGenReport = () => {
    if (dataReportLimit?.limitPer24hours === ROLE_ELEVATED_GEN_REPORT) return false;
    return dataReportLimit?.isLimitReached;
  };

  const getTooltip = () => {
    if (dataReportLimit?.limitPer24hours === ROLE_ELEVATED_GEN_REPORT) return "";
    return t("message.report.limitGenerate", { time: dataReportLimit?.limitPer24hours || 0 });
  };

  if (loadingInitialData) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error && (statusError || 0) >= 500) return <FetchDataErr />;
  if (!initialized && !error) return null;
  if ((error && (statusError || 0) < 500) || !data || !data.poolId) return <NoRecord />;

  return (
    <PoolDetailContext.Provider value={data}>
      <StyledContainer ref={containerRef}>
        <BoxContainerStyled>
          <LifeCycleHeader sidebar={+sidebar}>
            <LifeCycleTitle>{t("common.slcFor")}</LifeCycleTitle>
            <AddressLine>
              <Label>{t("common.poolID")}:</Label>
              <StakeId to={details.delegation(data.poolView)}>
                <TruncateSubTitleContainer>
                  <DynamicEllipsisText value={data.poolView} isCopy isTooltip />
                </TruncateSubTitleContainer>
              </StakeId>
            </AddressLine>
          </LifeCycleHeader>
          <BoxItemStyled sidebar={+sidebar}>
            <BoxSwitchContainer sidebar={+sidebar}>
              <LabelSwitch>
                {validMode === "timeline" ? t("common.switchTablularView") : t("slc.switchTimelineView")}
              </LabelSwitch>
              <SwitchGroup>
                <ButtonSwitch active={+(validMode === "timeline")} onClick={() => changeMode("timeline")}>
                  <TableMode
                    fill={validMode === "timeline" ? theme.palette.secondary[0] : theme.palette.secondary["light"]}
                  />
                </ButtonSwitch>
                <ButtonSwitch
                  data-testid="spo.tabularMode"
                  active={+(validMode === "tabular")}
                  onClick={() => changeMode("tabular")}
                >
                  <ChartMode
                    fill={validMode === "tabular" ? theme.palette.secondary[0] : theme.palette.secondary["light"]}
                  />
                </ButtonSwitch>
              </SwitchGroup>
            </BoxSwitchContainer>
            <CustomTooltip title={getTooltip()}>
              <ReportButtonContainer>
                <ButtonReport disabled={checkDisableGenReport()} onClick={() => setOpen(true)} sidebar={+sidebar}>
                  {t("common.composeReport")}
                </ButtonReport>
              </ReportButtonContainer>
            </CustomTooltip>
          </BoxItemStyled>
        </BoxContainerStyled>
        {loadingListTabs && <CircularProgress />}
        {renderTabsSPO && !loadingListTabs && (
          <>
            {validMode === "timeline" ? (
              <SPOLifecycleComponent
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                renderTabsSPO={renderTabsSPO}
              />
            ) : (
              <Tabular renderTabsSPO={renderTabsSPO} />
            )}
          </>
        )}

        <ReportComposerModal open={open} handleCloseModal={() => setOpen(false)} />
      </StyledContainer>
    </PoolDetailContext.Provider>
  );
};

export default SPOLifecycle;
