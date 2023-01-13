import moment from "moment";
import { stringify } from "qs";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import { getPageInfo, getShortHash, numberWithCommas } from "../../../commons/utils/helper";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { PriceValue, SmallText, StyledLink } from "./styles";

interface ITokenMinting {
  active: boolean;
  tokenId: string;
}

const TokenMinting: React.FC<ITokenMinting> = ({ active, tokenId }) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<ITokenTopHolderTable>(`tokens/${tokenId}/mints`, { ...pageInfo, tokenId });

  const columns: Column<ITokenMintingTable>[] = [
    {
      title: "#",
      key: "id",
      minWidth: "40px",
      render: (data, index) => <SmallText>{pageInfo.page * pageInfo.size + index + 1}</SmallText>,
    },
    {
      title: "Trx Hash",
      key: "trxHash",
      minWidth: "200px",
      render: r => (
        <CustomTooltip title={r.txHash} placement="top">
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      ),
    },
    {
      title: "Amount minted",
      key: "amountMinted",
      minWidth: "200px",
      render: r => (
        <PriceValue>
          <SmallText>{numberWithCommas(r.amount) || 0}</SmallText>
        </PriceValue>
      ),
    },
    {
      title: "Time",
      key: "time",
      minWidth: "200px",
      render: r => <SmallText>{moment(r.time).format("MM/DD/YYYY HH:mm:ss")}</SmallText>,
    },
  ];

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
      }}
      onClickRow={(_, r: ITokenMintingTable) => history.push(details.transaction(r.txHash))}
    />
  );
};

export default TokenMinting;
