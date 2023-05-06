import { useHistory } from "react-router-dom";
import Table, { Column } from "../../commons/Table";
import { formatADAFull, formatPercent, getShortWallet } from "../../../commons/utils/helper";
import { details } from "../../../commons/routers";
import { Image, PoolName, SearchContainer, StyledInput, StyledLinearProgress, SubmitButton } from "./styles";
import { HeaderSearchIcon } from "../../../commons/resources";
import useFetchList from "../../../commons/hooks/useFetchList";
import { useState } from "react";
import { Box } from "@mui/material";
import CustomTooltip from "../../commons/CustomTooltip";
import RateWithIcon from "../../commons/RateWithIcon";
import { API } from "../../../commons/utils/api";

const DelegationLists: React.FC = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(50);
  const [sort, setSort] = useState<string>("");

  const fetchData = useFetchList<Delegators>(API.DELEGATION.POOL_LIST, {
    page: page - 1,
    size,
    search,
    sort,
  });

  const columns: Column<Delegators & { adaFake: number; feeFake: number }>[] = [
    {
      title: "Pool",
      key: "Pool",
      minWidth: "40px",
      maxWidth: "350px",
      render: r => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <PoolName to={details.delegation(r.poolId)}>
            <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
              {r.poolName || `Pool [${getShortWallet(r.poolId)}]`}
            </Box>
          </PoolName>
        </CustomTooltip>
      ),
    },
    {
      title: "Pool size (A)",
      key: "poolSize",
      minWidth: "120px",
      render: r => <Box component={"span"}>{formatADAFull(r.poolSize)}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Reward",
      key: "Reward",
      minWidth: "120px",
      render: r => <RateWithIcon value={r.reward} multiple={100} />,
    },
    {
      title: "Fee (A) ",
      key: "pu.fixedCost",
      minWidth: "120px",
      render: r => `${formatPercent(r.feePercent)} (${formatADAFull(r.feeAmount)} A)`,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Declared Pledge (A)",
      key: "pu.pledge",
      minWidth: "120px",
      render: r => <Box component={"span"}>{formatADAFull(r.pledge)}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Saturation",
      minWidth: "200px",
      key: "Saturation",
      render: r => (
        <CustomTooltip title={r.saturation ? r.saturation * 100 : 0}>
          <Box display="flex" alignItems="center">
            <span>{formatPercent(r.saturation) || `0%`}</span>
            <StyledLinearProgress variant="determinate" value={r.saturation * 100 || 0} />
          </Box>
        </CustomTooltip>
      ),
    },
  ];

  return (
    <>
      <SearchContainer>
        <StyledInput
          placeholder="Search Pools"
          onChange={e => setValue(e.target.value)}
          value={value}
          onKeyUp={e => {
            if (e.key === "Enter") {
              setSearch(value);
              setPage(1);
            }
          }}
        />
        <SubmitButton onClick={() => setSearch(value)}>
          <Image src={HeaderSearchIcon} alt="Search" />
        </SubmitButton>
      </SearchContainer>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total" }}
        onClickRow={(_, r: Delegators) => history.push(details.delegation(r.poolId))}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => {
            setPage(page);
            setSize(size);
          },
        }}
      />
    </>
  );
};

export default DelegationLists;