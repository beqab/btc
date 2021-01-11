import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Route } from "react-router-dom";
import { User } from "react-router-dom";
import GetTimeAfterDate from "../../hepers/getTimeBeforeNow";

const BlockById = ({ match }) => {
  const [allBlocks, setAllBlocks] = useState(null);
  const [blockTime, setBlockTime] = useState(null);
  const [blockError, setBlockError] = useState(null);

  useEffect(() => {
    axios
      .post(
        "/get_blockchain_state",
        {},
        {
          heder: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        // this.setState({
        //   fetching: false,
        //   allBlocks: res.data.blockchain_state.tips,
        // });
        setAllBlocks(res.data.blockchain_state.tips);
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
              <span className="card-header-title">
                Block #{match.params?.ID}
              </span>
            </div>

            <div
              className="js-scrollbar card-body overflow-hidden mCustomScrollbar _mCS_1 mCS-autoHide"
              style={{
                height: "400px",
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
                                  <a href="/block/11627830">{el.data.height}</a>
                                  <span className="d-sm-block small text-secondary ml-1 ml-sm-0 text-nowrap">
                                    {" "}
                                    {GetTimeAfterDate(el.data.timestamp)}
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
                                      href="/address/0x6ebaf477f83e055589c1188bcc6ddccd8c9b131a"
                                    >
                                      {el.data.farmer_rewards_puzzle_hash}
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
                                    {GetTimeAfterDate(el.data.timestamp)}
                                  </span>
                                  <span className="d-inline-block d-sm-none">
                                    <span
                                      className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                      data-toggle="tooltip"
                                      title=""
                                      data-original-title="Block Reward"
                                    >
                                      {Number(el.data.total_transaction_fees) /
                                        100000000}
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
                                    {Number(el.data.total_transaction_fees) /
                                      10000000000}{" "}
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
