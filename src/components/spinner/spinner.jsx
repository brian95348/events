import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

function Spinner({loading}) {

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="spinner" >
      <ScaleLoader color='#ff9900' loading={loading} css={override} size={50} />
    </div>
  );
}

export default Spinner
