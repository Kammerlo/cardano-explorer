import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { CubeIconComponent, ExchangeIcon, SlotIcon, TimeIconComponent } from "src/commons/resources";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import { Status } from "src/pages/Epoch/styles";

import { Container, Content, EpochNumber, EpochProgress, SubContent, TitleCard } from "./styles";
import ProgressCircle from "../../ProgressCircle";
import DetailHeader from "../../DetailHeader";
import DatetimeTypeTooltip from "../../DatetimeTypeTooltip";

interface IProps {
  data: IDataEpoch;
  onClick: (e: React.MouseEvent, record: IDataEpoch) => void;
}

export default function FirstEpoch({ data: currentEpochData, onClick }: IProps) {
  const { t } = useTranslation();

  const EPOCH_STATUS_MAPPING = {
    [EPOCH_STATUS.FINISHED]: t("common.epoch.finished"),
    [EPOCH_STATUS.IN_PROGRESS]: t("common.epoch.inProgress"),
    [EPOCH_STATUS.REWARDING]: t("common.epoch.rewarding"),
    [EPOCH_STATUS.SYNCING]: t("common.epoch.cyncing")
  };
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  if (!currentEpochData) return null;
  const progress = currentEpochData.syncingProgress;

  const listOverview = [
    {
      icon: ExchangeIcon,
      hideHeader: true,
      title: (
        <EpochNumber>
          {currentEpochData?.status !== EPOCH_STATUS.SYNCING.toUpperCase() && (
            <Box component={"span"} data-testid="epoch-no-current-header">
              {currentEpochData?.no}
            </Box>
          )}
        </EpochNumber>
      ),
      value: (
        <Box display={"flex"} alignItems="center" justifyContent={"center"}>
          <ProgressCircle
            size={100}
            pathLineCap="butt"
            pathWidth={6}
            trailWidth={6}
            percent={Number(progress)}
            trailOpacity={1}
          >
            {currentEpochData?.status !== EPOCH_STATUS.SYNCING.toUpperCase() ? (
              <EpochProgress
                data-testid="epoch.firstEpoch.progress"
                status={currentEpochData?.status as keyof typeof EPOCH_STATUS}
              >{`${Math.round(progress)}%`}</EpochProgress>
            ) : (
              currentEpochData?.no
            )}

            <Status status={currentEpochData?.status as keyof typeof EPOCH_STATUS}>
              {EPOCH_STATUS_MAPPING[EPOCH_STATUS[currentEpochData?.status]]}
            </Status>
          </ProgressCircle>
        </Box>
      )
    },
    {
      icon: TimeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testid="epoch.firstEpoch.startTimeTitle" mr={1}>
            {t("glossary.startTimestamp")}
          </TitleCard>
        </Box>
      ),
      value: (
        <DatetimeTypeTooltip>
          <Content data-testid="epoch.firstEpoch.startTimeValue">
            {formatDateTimeLocal(currentEpochData?.startTime || "")}
          </Content>
        </DatetimeTypeTooltip>
      )
    },
    {
      icon: TimeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testid="epoch.firstEpoch.endTimeTitle" mr={1}>
            {t("glossary.endTimestamp")}
          </TitleCard>
        </Box>
      ),
      value: (
        <DatetimeTypeTooltip>
          <Content data-testid="epoch.firstEpoch.endTimeValue">
            {formatDateTimeLocal(currentEpochData?.startTime || "", 5)}
          </Content>
        </DatetimeTypeTooltip>
      )
    },
    {
      icon: CubeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testid="epoch.firstEpoch.blocksTitle" mr={1}>
            {t("glossary.blocks")}{" "}
          </TitleCard>
        </Box>
      ),
      value: (
        <Content data-testid="epoch.firstEpoch.blocksValue">
          {currentEpoch?.blkCount || currentEpochData?.blkCount}
        </Content>
      )
    },
    {
      icon: SlotIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard data-testid="epoch.firstEpoch.slotTitle" mr={1}>
            {t("glossary.Slot")}
          </TitleCard>
        </Box>
      ),
      value: (
        <Content data-testid="epoch.firstEpoch.slotValue">
          {moment(formatDateTimeLocal(currentEpochData.endTime), "YYYY-MM-DDTHH:mm:ssZ").diff(moment()) >= 0
            ? currentEpoch?.slot
            : MAX_SLOT_EPOCH}
          <SubContent>/{MAX_SLOT_EPOCH}</SubContent>
        </Content>
      )
    }
  ];
  return (
    <Container onClick={(e) => onClick(e, currentEpochData)} data-testid="epoch.firstEpoch.container">
      <DetailHeader
        data-testid="epoch.firstEpoch.detailHeader"
        isClickAble={true}
        isHideButtonBack={true}
        loading={false}
        listItem={listOverview}
        type="EPOCH"
        title={" "}
      />
    </Container>
  );
}
