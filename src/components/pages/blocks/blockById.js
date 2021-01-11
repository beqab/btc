import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Route } from "react-router-dom";
import { User } from "react-router-dom";
import GetTimeAfterDate from "../../hepers/getTimeBeforeNow";

const BlockById = ({ match }) => {
  const [blockData, setBlockData] = useState(null);
  const [blockTime, setBlockTime] = useState(null);
  const [blockError, setBlockError] = useState(null);

  useEffect(() => {
    axios
      .post(
        "/get_header_by_height",
        { height: match.params?.ID },
        {
          heder: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        if (res.data.error) {
          return setBlockError(res.data.error);
        }
        setBlockData(res.data.header.data);
        setBlockTime(new Date(res.data.header.data.timestamp * 1000));
        console.log(new Date(res.data.header.data.timestamp * 1000));
      })
      .catch((err) => {
        setBlockError("server error :/ ");
      });
  }, [match.params?.ID]);

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
                  {blockError ? (
                    <div className="alert alert-danger" role="alert">
                      {blockError}
                    </div>
                  ) : (
                    <>
                      <div class="row align-items-center">
                        <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                          <i
                            class="fal fa-question-circle text-secondary mr-1"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="top"
                            data-original-title=""
                            title=""
                            data-content="The date and time at which a block is mined."
                          ></i>
                          Timestamp:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>
                          &#128341;
                          {GetTimeAfterDate(blockData?.timestamp)}{" "}
                          <Moment format="YYYY/MM/DD">{blockTime}</Moment>
                        </div>
                      </div>
                      <hr />
                    </>
                  )}
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
