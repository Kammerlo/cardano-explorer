import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet,
  numberWithCommas,
} from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { Label, StyledLink } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import useFetchList from "../../commons/hooks/useFetchList";

interface TransactionListFullProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: any, r: Transactions, index: number) => void;
  selected?: number | null;
  showTitle?: boolean;
}

const TransactionListFull: React.FC<TransactionListFullProps> = ({
  underline = false,
  url,
  openDetail,
  selected,
  showTitle = true,
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(url, pageInfo);

  const onClickRow = (_: any, r: Transactions, index: number) => {
    if (openDetail) return openDetail(_, r, index);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (data, index) => numberWithCommas(pageInfo.page * pageInfo.size + index + 1 || 0),
    },
    {
      title: "Trx Hash",
      key: "trxhash",
      minWidth: 120,

      render: r => (
        <div>
          <CustomTooltip title={r.hash}>
            <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
          </CustomTooltip>
          <Box mt={1}>{formatDateTimeLocal(r.time || "")}</Box>
        </div>
      ),
    },
    {
      title: "Block",
      key: "block",
      minWidth: 120,
      render: r => (
        <Box>
          <Box>
            <StyledLink to={details.block(r.blockNo || r.blockHash)}>
              {r.blockNo || getShortHash(r.blockHash)}
            </StyledLink>
          </Box>
          <Box mt={1}>
            <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.epochSlotNo}
          </Box>
        </Box>
      ),
    },
    {
      title: "Addresses",
      key: "address",
      minWidth: 120,
      render(r, index) {
        return (
          <div>
            <Box display={"flex"}>
              <Label> Input: </Label>
              <div>
                {r.addressesInput.slice(0, 1).map((tx, key) => {
                  return (
                    <CustomTooltip key={key} title={tx}>
                      <StyledLink to={details.address(tx)} key={key}>
                        <Box ml={1}>{getShortWallet(tx)}</Box>
                      </StyledLink>
                    </CustomTooltip>
                  );
                })}
                {r.addressesInput.length > 1 && (
                  <StyledLink to={details.transaction(r.hash)}>
                    <Box ml={1}>...</Box>
                  </StyledLink>
                )}
              </div>
            </Box>
            <Box display={"flex"} mt={1}>
              <Label>Output: </Label>
              <div>
                {r.addressesOutput.slice(0, 1).map((tx, key) => {
                  return (
                    <CustomTooltip key={key} title={tx}>
                      <StyledLink to={details.address(tx)} key={key}>
                        <Box ml={1}>{getShortWallet(tx)}</Box>
                      </StyledLink>
                    </CustomTooltip>
                  );
                })}
                {r.addressesOutput.length > 1 && (
                  <StyledLink to={details.transaction(r.hash)}>
                    <Box ml={1}>...</Box>
                  </StyledLink>
                )}
              </div>
            </Box>
          </div>
        );
      },
    },
    {
      title: "Fees",
      key: "fee",
      minWidth: 120,
      render: r => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.fee)}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
      ),
    },
    {
      title: "Output",
      minWidth: 120,
      key: "ouput",
      render: r => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.totalOutput)}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
      ),
    },
  ];

  return (
    <Card title={showTitle ? "Transactions" : ""} underline={underline}>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total Transactions" }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
        }}
        onClickRow={onClickRow}
        selected={selected}
      />
    </Card>
  );
};

export default TransactionListFull;
