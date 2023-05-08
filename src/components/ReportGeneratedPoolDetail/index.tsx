import React, { useMemo, createContext } from "react";
import { DeredistrationIcon, OperatorRewardIcon, PoolUpdateIcon, RegistrationIcon } from "../../commons/resources";

import StakeTab from "../TabularView/StakeTab";

import DeregsitrationTab from "./PoolTabs/DeregsitrationTab";
import PoolRegistrationTab from "./PoolTabs/PoolRegistrationTab";
import ProtocolUpdateTab from "./PoolTabs/ProtocolUpdateTab";
import RewardsDistributionTab from "./PoolTabs/RewardsDistributionTab";
import { useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import { API } from "../../commons/utils/api";
import PoolSizeTab from "./PoolTabs/PoolSizeTab";
import { SkeletonUI } from "../TokenDetail/TokenAnalytics/styles";

interface ITab {
  icon: React.FC;
  label: React.ReactNode;
  key: TTabularTabKey | string;
  mappingKey: string;
  component: React.ReactNode;
}

export const ReportGeneratedPoolDetailContext = createContext({ reportName: "" });

const poolTabs: ITab[] = [
  {
    icon: RegistrationIcon,
    label: "Pool Registration",
    key: "registration",
    mappingKey: "registration",
    component: <PoolRegistrationTab />,
  },
  {
    icon: PoolUpdateIcon,
    label: "Pool Update",
    key: "poolupdate",
    mappingKey: "pool_update",
    component: <ProtocolUpdateTab />,
  },
  {
    icon: OperatorRewardIcon,
    label: "Rewards Distribution",
    key: "reward",
    mappingKey: "reward",
    component: <RewardsDistributionTab />,
  },
  {
    icon: DeredistrationIcon,
    label: "Deregsitration",
    key: "deregistration",
    mappingKey: "deregistration",
    component: <DeregsitrationTab />,
  },
];

const ReportGeneratedPoolDetailTabs = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const reportDetail = useFetch<IPoolReportSummary>(API.REPORT.POOL_REPORTED_DETAIL(reportId));

  const events = useMemo(() => {
    const { data } = reportDetail;
    if (!data?.event) return [];
    return data.event.split(",");
  }, [reportDetail]);

  console.log(events, "events");
  const displayedTabs = useMemo(() => {
    const tabs = [
      ...poolTabs,
      {
        icon: DeredistrationIcon,
        label: "Pool size",
        key: "poolSize",
        mappingKey: "",
        component: <PoolSizeTab />,
      },
    ];

    if (events.includes("all")) return tabs;
    return tabs.filter(tab => events.includes(tab.mappingKey));
  }, [events]);

  const initTab = useMemo(() => (displayedTabs.length ? displayedTabs[0].key : undefined), [displayedTabs]);

  return (
    <ReportGeneratedPoolDetailContext.Provider value={{ reportName: reportDetail.data?.reportName ?? "" }}>
      {reportDetail.loading ? (
        <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
      ) : (
        <StakeTab tabs={displayedTabs} initTab={initTab} />
      )}
    </ReportGeneratedPoolDetailContext.Provider>
  );
};

export default ReportGeneratedPoolDetailTabs;
