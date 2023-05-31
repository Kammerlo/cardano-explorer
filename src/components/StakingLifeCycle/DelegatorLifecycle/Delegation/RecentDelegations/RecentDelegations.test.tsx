import { screen } from "@testing-library/react";
import RecentDelegations from ".";
import Router from "react-router";
import { render } from "src/test-utils";

describe("RecentDelegations", () => {
  it("should render RecentDelegations component", async () => {
    const onSelect = jest.fn();
    jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "1" });

    render(<RecentDelegations onSelect={onSelect} />);
    expect(screen.getByText("Recent Delegations")).toBeInTheDocument();
  });
});
