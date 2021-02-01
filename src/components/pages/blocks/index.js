import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Route } from "react-router-dom";
import { User } from "react-router-dom";
import getTimeAfterDate from "../../hepers/getTimeBeforeNow";

const BlockById = ({ match }) => {
  const [allBlocks, setAllBlocks] = useState(null);
  const [blockTime, setBlockTime] = useState(null);
  const [blockError, setBlockError] = useState(null);

  useEffect(() => {
    axios
      .get("block/chains")
      .then((res) => {
        // this.setState({
        //   fetching: false,
        //   allBlocks: res.data.blockchain_state.tips,
        // });
        setAllBlocks(res.data);
        // debugger;
      })
      .catch((e) => {
        // if (e.response && e.response.data && e.response.data.message) {
        //   this.setState({
        //     fetching: false,
        //     error: e.response.data.message,
        //   });
        // } else {
        //   this.setState({
        //     fetching: false,
        //     error: "Something went wrong. Try Again",
        //   });
        // }
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mb-12 mb-lg-0 mt-5 pt-5">
          <div className="card h-100">
            <div className="card-header newHeader">
              <span className="card-header-title">All Blocks</span>
            </div>

            <div
              className="js-scrollbar card-body overflow-hidden mCustomScrollbar _mCS_1 mCS-autoHide"
              style={{
                maxHeight: "60vh",
                minHeight: "500px",
                position: "relative",
                overflow: "visible",
              }}
            >
              <div
                id="mCSB_1"
                className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside"
                style={{ maxHeight: "none" }}
              >
                <div
                  id="mCSB_1_container"
                  className="mCSB_container"
                  style={{ position: "relative", top: "0px", left: "0px" }}
                  dir="ltr"
                >
                  {/* {blockError ? (
                    <div className="alert alert-danger" role="alert">
                      {blockError}
                    </div>
                  ) : (
                    <> */}
                  {allBlocks &&
                    allBlocks.map((el, i) => {
                      return (
                        <>
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="media align-items-sm-center mr-4 mb-1 mb-sm-0">
                                <div className="d-none d-sm-flex mr-2">
                                  <span className="btn btn-icon btn-soft-secondary">
                                    <span className="btn-icon__inner text-dark">
                                      Bk
                                    </span>
                                  </span>
                                </div>
                                <div className="media-body">
                                  <span className="d-inline-block d-sm-none">
                                    Block
                                  </span>{" "}
                                  <a
                                    className="hathOverflow"
                                    href={/block/ + el.hash}
                                  >
                                    {el.hash}
                                  </a>
                                  <span className="d-sm-block small text-secondary ml-1 ml-sm-0 text-nowrap">
                                    {" "}
                                    {getTimeAfterDate(el.timestamp)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-8">
                              <div className="d-flex justify-content-between">
                                <div className="text-nowrap">
                                  <span className="d-block mb-1 mb-sm-0">
                                    Miner{" "}
                                    <a
                                      className="hash-tag text-truncate"
                                      href="#"
                                    >
                                      {el.validator}
                                    </a>
                                  </span>
                                  <a
                                    href="/txs?block=11627830"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="Transactions in this Block"
                                  >
                                    185 txns{" "}
                                  </a>{" "}
                                  <span className="small text-secondary">
                                    {getTimeAfterDate(el.timestamp)}
                                  </span>
                                  <span className="d-inline-block d-sm-none">
                                    <span
                                      className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                      data-toggle="tooltip"
                                      title=""
                                      data-original-title="Block Reward"
                                    >
                                      {/* {Number(
                                            el.data.total_transaction_fees
                                          ) / 100000000} */}
                                      Waves
                                    </span>{" "}
                                  </span>
                                </div>
                                <div className="d-none d-sm-block">
                                  <span
                                    className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="Block Reward"
                                  >
                                    Waves
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="hr-space" />
                        </>
                      );
                    })}
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockById;
