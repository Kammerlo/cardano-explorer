/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useUpdateEffect } from "react-use";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import CustomFilter, { FilterParams } from "src/components/commons/CustomFilter";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import OverviewStaking from "src/components/commons/OverviewStaking";
import { EmptyRecord, FooterTable } from "src/components/commons/Table";
import FetchDataErr from "src/components/commons/FetchDataErr";

import { DescriptionText, FilterContainer, StyledList } from "../../styles";
import { GridBox, StyledContainer, WrapFilterDescription } from "./styles";

interface Props {
  setShowBackButton: (status: boolean) => void;
}

const RecentRegistrations: React.FC<Props> = ({ setShowBackButton }) => {
  const { t } = useTranslation();
  const { stakeId = "", txHash = "" } = useParams<{ stakeId: string; txHash?: string }>();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const [params, setParams] = useState<FilterParams>({});
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);

  const { data, total, loading, initialized, error, query, statusError } = useFetchList<RegistrationItem>(
    stakeId ? API.STAKE_LIFECYCLE.REGISTRATION(stakeId) : "",
    { ...pageInfo, ...params, txHash: params.search }
  );
  const handleSelect = (registration?: RegistrationItem) => {
    history.push(details.staking(stakeId, "timeline", "registration", registration?.txHash));
  };

  useEffect(() => {
    if (initialized) setShowBackButton(data.length > 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, setShowBackButton]);

  const isOneItemOnly = data.length === 1 && Object.keys(query).length === 2;

  useUpdateEffect(() => {
    if (isOneItemOnly) history.replace(details.staking(stakeId, "timeline", "registration", data[0].txHash));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (txHash || isOneItemOnly) return null;

  return (
    <StyledContainer data-testid="recent-registration">
      <StyledList>
        <DescriptionText sx={{ mr: 0 }}>{t("common.registrationList")}</DescriptionText>
        <FilterContainer>
          <WrapFilterDescription>
            {t("common.showing")} {data.length} {data.length <= 1 ? t("common.result") : t("common.results")}
          </WrapFilterDescription>
          <CustomFilter
            filterValue={params}
            onSubmit={(params) => {
              if (params) {
                setParams(params);
              }
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
            searchLabel={t("common.searchTx")}
          />
        </FilterContainer>
      </StyledList>
      <GridBox sidebar={+sidebar}>
        {loading &&
          [...new Array(12)].map((i, ii) => (
            <CommonSkeleton key={ii} style={{ borderRadius: 12 }} variant="rectangular" width={300} height={185} />
          ))}

        {!loading &&
          data.map((item) => {
            return (
              <OverviewStaking
                key={item.txHash}
                amount={item.deposit + item.fee}
                time={item.time}
                hash={item.txHash}
                item={item}
                onClick={handleSelect}
              />
            );
          })}
      </GridBox>
      {error && (statusError || 0) >= 500 && <FetchDataErr />}
      {((!loading && initialized && data?.length === 0 && !error) || (error && (statusError || 0) < 500)) && (
        <EmptyRecord />
      )}
      {initialized && data?.length > 0 && !error && (
        <FooterTable
          pagination={{
            total,
            ...pageInfo,
            onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
          }}
          loading={loading}
        />
      )}
    </StyledContainer>
  );
};

export default RecentRegistrations;
