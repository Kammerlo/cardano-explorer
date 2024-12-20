import { fireEvent, render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { getShortHash } from "src/commons/utils/helper";

import TokenTransaction from ".";

const mockData: Transaction = {
  hash: "transaction-hash",
  blockNo: 1234,
  blockHash: "block-hash",
  epochNo: 10,
  epochSlotNo: 100,
  slot: 1000,
  addressesInput: ["input-address-1", "input-address-2"],
  addressesOutput: ["output-address-1", "output-address-2"],
  fee: 100,
  totalOutput: 1000,
  time: "2022-01-01 10:00:00",
  balance: 500,
  tokens: [
    {
      address: "token-address",
      addressId: 1,
      displayName: "Token",
      fingerprint: "token-fingerprint",
      name: "Token Name",
      policy: "token-policy",
      quantity: 100
    }
  ]
};

jest.mock("src/commons/hooks/useFetchList");

describe("TokenTransaction component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockData]
    });
  });
  it("should component render", () => {
    render(<TokenTransaction />);
    expect(screen.getByText(getShortHash(mockData.hash))).toBeInTheDocument();
    expect(screen.getByText(getShortHash(mockData.addressesInput[0]))).toBeInTheDocument();
    expect(screen.getByText(getShortHash(mockData.addressesOutput[0]))).toBeInTheDocument();
  });

  it("when user select a row", () => {
    render(<TokenTransaction />);
    const cellTxHash = screen.getAllByRole("cell", { name: /transaction-hash/i });
    fireEvent.click(cellTxHash[0]);
    expect(screen.getAllByTestId(/view-detail-drawer/i)[0]).toBeInTheDocument();
  });
});
