import { expect, Page } from "@playwright/test";
import moment from "moment";

import { BlockfrostEpochInformationDto } from "../api/dtos/blockfrostEpochInformation.dto";
import { Methods } from "../helpers/methods";
import { KoiosEpochInformationDto } from "../api/dtos/koiosEpochInformation.dto";
import { log } from "../utils/logger";

export function epochDetailPage(page: Page) {
  const epochId = page.locator('div[data-test-id="CircularProgressbarWithChildren__children"] > a');
  const deatailPageTitle = page.getByTestId("detail.page.title");
  const epochStartTime = page.locator(
    "//div[div[div[@data-testid='epoch.overview.startTimeTitle']]]/following-sibling::div"
  );
  const epochEndTime = page.locator('//div[div[div[text()="End timestamp"]]]/following-sibling::div');
  const totalOutput = page.locator('//div[div[div[text()="Total output"]]]/following-sibling::div');
  const blocksCount = page.locator('//div[div[div[text()="Blocks"]]]/following-sibling::div');
  const transactionCount = page.locator('//div[div[div[text()="Transaction Count"]]]/following-sibling::div');

  const firstBlockInEpochDetail = page.getByTestId("epochList.blockValue#0");
  const firstBlockIdInEpochDetail = page.getByTestId("epochList.blockIdValue#0");
  const detailTitle = page.getByTestId("detail-header-title");
  const transationTableTitle = page.getByTestId("header.table.transactions");
  const startTimeEpochOverview = page.getByTestId("epoch.overview.startTimeValue");
  const endTimeEpochOverview = page.getByTestId("epoch.overview.endTimeValue");
  const totalOutputEpochOverview = page.getByTestId("epoch.overview.totalOutputValue");
  const blockTableTitleEpochOverview = page.getByTestId("epoch.blockList.blocksTitle");
  const blockColumnBlockTable = page.getByTestId("epochList.blockTitle");
  const blockIdColumnBlockTable = page.getByTestId("epochList.blockIdTitle");
  const epochTitleColumnBlockTable = page.getByTestId("epochList.epochTitle");
  const slotTitleColumnBlockTable = page.getByTestId("epochList.slotTitle");
  const slotNoTitleColumnBlockTable = page.getByTestId("epochList.slotNoTitle");
  const createdAtTitleColumnBlockTable = page.getByTestId("epochList.createdAtTitle");
  const txCountTitleColumnBlockTable = page.getByTestId("epochList.txCountTitle");
  const feesTitleColumnBlockTable = page.getByTestId("epochList.feesTitle");
  const outSumTitleColumnBlockTable = page.getByTestId("epochList.outSumTitle");

  const goToBlockDetailFromEpoch = async () => {
    await firstBlockInEpochDetail.click();
  };

  const goToBlockDetailFromEpochByBlockId = async () => {
    await firstBlockIdInEpochDetail.click();
  };

  const checkEpochDetail = async ({ epochNo }: { epochNo: string | null }) => {
    const url = await page.url();
    expect(url, "Check url pool detail").toContain(`/epoch/${epochNo}`);
    expect(deatailPageTitle, "Epoch detail title").toHaveText("Epoch Details");
  };

  const assertEpochDataIsDisplayed = async (lastEpochData: Promise<BlockfrostEpochInformationDto>) => {
    await expect(epochId, "The epoch id is not the expected for the current epoch details").toHaveText(
      (await lastEpochData).epoch.toString()
    );
    const startTime = getFormattedTime((await lastEpochData).start_time);
    const expectedStartTime = await epochStartTime.textContent();
    expect(
      expectedStartTime?.replace(",", ""),
      "The epoch start time is not the expected for the current epoch details"
    ).toEqual(await startTime);
    const endTime = getFormattedTime((await lastEpochData).end_time);
    const expectedEndTime = await epochEndTime.textContent();
    expect(
      expectedEndTime?.replace(",", ""),
      "The epoch end time is not the expected for the current epoch details"
    ).toEqual(await endTime);
    const receivedOutput = Methods().getNumberFromStringWithNDecimals((await lastEpochData).output, 6);
    const currentOutput = parseFloat(<string>(await totalOutput.textContent())?.replace(/,/g, ""));
    expect(
      currentOutput,
      "The epoch's current output is not the expected for the current epoch details"
    ).toBeGreaterThanOrEqual(await receivedOutput);
    const currentBlocksCount = parseInt(<string>await blocksCount.textContent());
    expect(
      currentBlocksCount,
      "The epoch's blocks count is not the expected for the current epoch details"
    ).toBeGreaterThanOrEqual((await lastEpochData).block_count);
    const currentTransactionsCount = parseInt(<string>await transactionCount.textContent());
    expect(
      currentTransactionsCount,
      "The epoch's transactions count is not the expected for the current epoch details"
    ).toBeGreaterThanOrEqual((await lastEpochData).tx_count);
  };

  const assertLastFinishedEpochDataIsDisplayed = async (lastEpochResponse: Promise<KoiosEpochInformationDto[]>) => {
    const lastEpochData = (await lastEpochResponse).at(0);
    if (lastEpochData !== undefined) {
      await expect(epochId, "The epoch id is not the expected for the current epoch details").toHaveText(
        lastEpochData.epoch_no.toString()
      );
      const startTime = getFormattedTime(lastEpochData.start_time);
      const expectedStartTime = await epochStartTime.textContent();
      expect(
        expectedStartTime?.replace(",", ""),
        "The epoch start time is not the expected for the current epoch details"
      ).toEqual(await startTime);
      const endTime = getFormattedTime(lastEpochData.end_time);
      const expectedEndTime = await epochEndTime.textContent();
      expect(
        expectedEndTime?.replace(",", ""),
        "The epoch end time is not the expected for the current epoch details"
      ).toEqual(await endTime);
      const receivedOutput = Methods().getNumberFromStringWithNDecimals(lastEpochData.out_sum, 6);
      const currentOutput = parseFloat(<string>(await totalOutput.textContent())?.replace(/,/g, ""));
      expect(currentOutput, "The epoch's current output is not the expected for the current epoch details").toEqual(
        await receivedOutput
      );
      const currentBlocksCount = parseInt(<string>await blocksCount.textContent());
      expect(currentBlocksCount, "The epoch's blocks count is not the expected for the current epoch details").toEqual(
        lastEpochData.blk_count
      );
      const currentTransactionsCount = parseInt(<string>await transactionCount.textContent());
      expect(
        currentTransactionsCount,
        "The epoch's transactions count is not the expected for the current epoch details"
      ).toEqual(lastEpochData.tx_count);
    } else log.error("Last epoch data object is undefined");
  };
  const getFormattedTime = async (time: number) => {
    return Methods().getTimeAndDateFromEpoch(time);
  };

  const checkEpochDetailPage = async ({ currentEpoch }: { currentEpoch?: BlockfrostEpochInformationDto }) => {
    await expect(detailTitle, "Epoch detail title").toHaveText("Epoch Details");

    expect(
      moment((await startTimeEpochOverview.textContent())?.replace(",", "")).unix(),
      "Start time on epoch detail to equal start time epoch Blockfrost"
    ).toEqual(currentEpoch?.start_time);

    expect(
      moment((await endTimeEpochOverview.textContent())?.replace(",", "")).unix(),
      "End time on epoch detail to equal end time epoch Blockfrost"
    ).toEqual(currentEpoch?.end_time);

    expect(
      +((await totalOutputEpochOverview.textContent())?.replaceAll(",", "") || 0) * 10 ** 6,
      "Total output in epoch detail to equal total block in epoch on Blockfrost "
    ).toEqual(+(currentEpoch?.output || 0));

    await expect(blockTableTitleEpochOverview, "Block table title").toHaveText("Blocks");

    await expect(blockColumnBlockTable, "Check title on finished blocks table").toHaveText("Block");
    await expect(blockIdColumnBlockTable, "Check title on finished blocks table").toHaveText("Block ID");
    await expect(epochTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Epoch");
    await expect(slotTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Slot");
    await expect(slotNoTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Absolute Slot");
    await expect(createdAtTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Created At");
    await expect(txCountTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Transactions");
    await expect(feesTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Fees");
    await expect(outSumTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Output");
  };

  const checkBlockDetailPage = async ({ blockId = "" }: { blockId: string | null }) => {
    expect(page.url().includes(`/block/${blockId}`)).toBe(true);
    await expect(detailTitle).toHaveText("Block Details");
    await expect(transationTableTitle).toHaveText("Transactions");
  };

  return {
    assertEpochDataIsDisplayed,
    assertLastFinishedEpochDataIsDisplayed,
    checkEpochDetailPage,
    goToBlockDetailFromEpoch,
    checkBlockDetailPage,
    goToBlockDetailFromEpochByBlockId,
    checkEpochDetail
  };
}
