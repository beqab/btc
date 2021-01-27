import React from "react";
import axios from "axios";

// axios.defaults.baseURL = "http://164.132.182.31:5000/";

class Search extends React.Component {
  state = {
    blockNumber: "",
    accountNumber: "",
    TransactionID: "",
    responseData: null,
    transactionData: null,
    walletData: null,
    transactionsData: null,
    blockData: null,
    error: null,
    fetching: false,
    allBlocks: null,

    allTransactions: null,
  };

  componentDidMount() {
    this.setState({
      fetching: true,
    });
    let transactions = [];
    // http://51.255.211.135/get_header_by_height
    // curl -d '{}' -H "Content-Type: application/json" -X POST http://51.255.211.135/get_blockchain_state
    axios
      .get(
        "/chain",
        {},
        {
          heder: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        res.data.chain.map((el, i) => {
          if (el.transactions.length) {
            el.transactions.map((trans) => {
              if (transactions.length < 10) {
                transactions.push(trans);
              }
            });
          }
        });
        this.setState({
          fetching: false,
          allTransactions: transactions,
        });
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.message) {
          this.setState({
            fetching: false,
            error: e.response.data.message,
          });
        } else {
          this.setState({
            fetching: false,
            error: "Something went wrong. Try Again",
          });
        }
      });

    axios
      .post(
        "/get_blockchain_state",
        {},
        {
          heder: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        this.setState({
          fetching: false,
          allBlocks: res.data.blockchain_state.tips,
        });
        // debugger;
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.message) {
          this.setState({
            fetching: false,
            error: e.response.data.message,
          });
        } else {
          this.setState({
            fetching: false,
            error: "Something went wrong. Try Again",
          });
        }
      });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clearRes = () => {
    this.setState({
      fetching: true,
      transactionsData: null,
      walletData: null,
      blockData: null,
      transactionData: null,
      allTransactions: null,
    });
  };

  handelSubmitTransaction = (e) => {
    e.preventDefault();
    this.clearRes();
    axios
      .get(`/transaction/by/${this.state.TransactionID}`)
      .then((res) => {
        this.setState({
          transactionData: res.data,
          fetching: false,
          error: null,
        });
      })
      .catch((e) => {
        if (e.response.data.message) {
          this.setState({
            fetching: false,
            error: e.response.data.message,
          });
        } else {
          this.setState({
            fetching: false,
            error: "Something went wrong. Try Again",
          });
        }
      });
  };

  handelSubmitSearchBlock = (e) => {
    e.preventDefault();
    this.props.history.push(`/blocks/${this.state.blockNumber}`);
    return;
    console.log("sbmt");
    this.clearRes();
    axios
      .get(`/block/by/${this.state.blockNumber}`)
      .then((res) => {
        this.setState({
          blockData: res.data,
          fetching: false,
          error: null,
        });
      })
      .catch((e) => {
        if (e.response.data.message) {
          this.setState({
            fetching: false,
            error: e.response.data.message,
          });
        } else {
          this.setState({
            fetching: false,
            error: "Something went wrong. Try Again",
          });
        }
      });
    // 1Ep7Mki2vFRQQfbYeNeJXkJbUjo54TbL2H
    // 19Zi8ZcJ4PV2AV64i74GHXKTfyazBnH72h
  };

  handelSubmitSearchWallet = (e) => {
    if (e) e.preventDefault();
    this.setState({
      fetching: true,
      blockData: null,
      allTransactions: null,
      transactionData: null,
    });

    axios
      .post(`/search_wallet/${this.state.accountNumber}`)
      .then((res) => {
        this.setState({
          walletData: res.data,
          fetching: false,
          error: null,
        });
      })
      .catch((e) => {
        if (e.response.data.message) {
          this.setState({
            fetching: false,
            error: e.response.data.message,
          });
        } else {
          this.setState({
            fetching: false,
            error: "Something went wrong. Try Again",
          });
        }
      });
  };

  handelSubmitTransactions = (e) => {
    if (e) e.preventDefault();

    axios.post(`/transactions/${this.state.accountNumber}`).then((res) => {
      this.setState({
        transactionsData: res.data,
      });
    });
  };

  timeConverter = (timestamp) => {
    let a = new Date(timestamp * 1000);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };

  getTable = (data, i = 0) => {
    return (
      <>
        <tr key={i}>
          <td
            onClick={() => {
              this.setState(
                {
                  accountNumber: data.fromwallet,
                  walletData: null,
                },
                () => {
                  this.handelSubmitSearchWallet();
                  this.handelSubmitTransactions();
                }
              );
            }}
            className="cursorPointer"
          >
            <span className="link"> {data.fromwallet} </span>
          </td>
          <td
            onClick={() => {
              this.setState(
                {
                  accountNumber: data.towallet,
                  walletData: null,
                },
                () => {
                  this.handelSubmitSearchWallet();
                  this.handelSubmitTransactions();
                }
              );
            }}
            className="cursorPointer"
          >
            <span className="link"> {data.towallet}</span>
          </td>
          <td>{data.amount}</td>
          <td>{data.status}</td>
          <td className="txid">{data.txid}</td>
          <td>{this.timeConverter(data.timestamp)}</td>
        </tr>
      </>
    );
  };

  calcTotalReceivedSent = (arr, address) => {
    let Sent = 0;
    let Received = 0;
    arr.map((el) => {
      if (el.fromwallet === address) {
        Sent += el.amount;
      } else {
        Received += el.amount;
      }
    });

    return {
      Sent,
      Received,
    };
  };

  getSearchResult = () => {
    if (this.state.walletData) {
      return (
        <>
          <h3 className="w700 mb-4">Address</h3>
          <div className="w700  d-md-flex d-block address ">
            <div className="test-sm-centre">
              <img
                className="qrImg"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.state.walletData.address}`}
              />
            </div>
            <div className=" pl-0 pl-md-3 test-sm-centre">
              <h5 className="font-sm-14 ">
                address: {this.state.walletData.address}
              </h5>
              <h5 className="font-sm-14">
                balance: {this.state.walletData.balance}
              </h5>
              <h5 className="font-sm-14">
                Transactions:{" "}
                {this.state.transactionsData &&
                  this.state.transactionsData.transactions.length}
              </h5>

              <h5 className="font-sm-14">
                Total Sent:{" "}
                {this.state.transactionsData &&
                  this.calcTotalReceivedSent(
                    this.state.transactionsData.transactions,
                    this.state.walletData.address
                  ).Sent}
              </h5>
              <h5 className="font-sm-14">
                Total Received :{" "}
                {this.state.transactionsData &&
                  this.calcTotalReceivedSent(
                    this.state.transactionsData.transactions,
                    this.state.walletData.address
                  ).Received}
              </h5>
            </div>
          </div>

          {this.state.transactionsData && (
            <div className="table-container">
              <h3 className="mt-5">Transactions</h3>
              <table className="table table-striped mt-3">
                <thead className="thead-dark">
                  <tr>
                    <th>fromwallet</th>
                    <th>towallet</th>
                    <th>amount</th>
                    <th>status</th>
                    <th>txid</th>
                    <th>date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.transactionsData.transactions.map((el, i) => {
                    return this.getTable(el, i);
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      );
    } else if (this.state.transactionData) {
      return (
        <>
          <h3 className="text-center">Transaction Details</h3>
          <div className="table-container">
            <table className="table table-striped mt-3">
              <thead className="thead-dark">
                <tr>
                  <th>fromwallet</th>
                  <th>towallet</th>
                  <th>amount</th>
                  <th>status</th>
                  <th>txid</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {this.getTable(this.state.transactionData.transaction)}
              </tbody>
            </table>
          </div>
        </>
      );
    } else if (this.state.blockData) {
      return (
        <>
          <h3 className="">Block Details</h3>
          <div className="table-container">
            <table className="table table-striped mt-3">
              <thead className="thead-dark">
                <tr>
                  <th>fromwallet</th>
                  <th>towallet</th>
                  <th>amount</th>
                  <th>status</th>
                  <th>txid</th>
                  <th>date</th>
                </tr>
              </thead>

              {this.state.blockData.block.map((el, i) => {
                return <tbody>{this.getTable(el, i)}</tbody>;
              })}
            </table>
          </div>
        </>
      );
    } else if (this.state.allBlocks) {
      return (
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="table-container">
                <table className="table table-striped mt-3">
                  <thead className="thead-dark">
                    <h3> blocks </h3>
                  </thead>

                  {/* {this.state.allTransactions.map((el, i) => {
                return <tbody>{this.getTable(el, i)}</tbody>;
              })} */}
                </table>
              </div>
            </div>
            <div className="col-md-6">
              <div className="table-container">
                <table className="table table-striped mt-3">
                  <thead className="thead-dark">
                    <h3> transactions </h3>
                  </thead>

                  {/* {this.state.allTransactions.map((el, i) => {
                return <tbody>{this.getTable(el, i)}</tbody>;
              })} */}
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  getTimeAfterDate = (date) => {
    const now = new Date();
    let time = Math.abs(now.getTime() / 1000 - date);
    // calculate (and subtract) whole days
    var days = Math.floor(time / 86400);
    time -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(time / 3600) % 24;
    time -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(time / 60) % 60;
    time -= minutes * 60;

    // what's left is seconds
    var seconds = time % 60; // in theory the modulus is not required
    console.log(seconds, "s", minutes, "m", hours, "h", days, "d");
    if (days) {
      return days + " days ago";
    }
    if (hours) {
      return hours + " hours ago";
    }
    if (minutes) {
      return minutes + " mins ago";
    }
    if (seconds) {
      return seconds + " sec ago";
    }
  };

  byBlockId = () => {
    axios.post(
      "/get_header_by_height",
      { height: 0 },
      {
        heder: { "Content-Type": "application/json" },
      }
    );
  };

  render() {
    return (
      <>
        <div className="searchWrapper">
          <div className="container">
            <div className="row d-flex flex-column pb-4 pl-4">
              <div>
                <label style={{ color: "#fff" }}>
                  The WAVE Blockchain Explorer
                </label>
              </div>
              <div className="searchBox">
                <select>
                  <option>block</option>
                  <option>address</option>
                  <option>Txn Hash</option>
                  <option>Token</option>
                </select>
                <input placeholder="Search by Address / Txn Hash / Block / Token / Ens" />
                <button>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    width="20"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="svg-inline--fa fa-search fa-w-16 fa-2x"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      class=""
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <h5
                    className="card-header "
                    onClick={() => this.byBlockId(12)}
                  >
                    search block
                  </h5>
                  <div className="card-body">
                    {/* <h5 className="card-title">Search ny block number</h5> */}
                    <h5 className="card-text">block number</h5>
                    <form
                      onSubmit={this.handelSubmitSearchBlock}
                      className="form-inline"
                    >
                      <input
                        className="form-control searchInput mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        name="blockNumber"
                        onChange={this.handleInputChange}
                      />
                      <button
                        disabled={this.state.fetching}
                        className="btn btn-outline-success searchButton my-2 my-sm-0"
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <h5 className="card-header">search account</h5>
                  <div className="card-body">
                    {/* <p className="card-text">search account</p> */}
                    <h5 className="card-title">account number or ID</h5>
                    <form
                      onSubmit={(e) => {
                        this.handelSubmitSearchWallet(e);
                        this.handelSubmitTransactions(e);
                      }}
                      className="form-inline"
                    >
                      <input
                        className="form-control searchInput mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        name="accountNumber"
                        onChange={this.handleInputChange}
                      />
                      <button
                        disabled={this.state.fetching}
                        className="btn searchButton btn-outline-success my-2 my-sm-0"
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <h5 className="card-header">Search transaction hash</h5>
                  <div className="card-body">
                    {/* <p className="card-text">Search transaction information</p> */}
                    <h5 className="card-title">Transaction ID</h5>
                    <form
                      onSubmit={(e) => {
                        this.handelSubmitTransaction(
                          e,
                          "/transaction/by/",
                          "TransactionID"
                        );
                      }}
                      className="form-inline"
                    >
                      <input
                        className="form-control searchInput mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        name="TransactionID"
                        onChange={this.handleInputChange}
                      />
                      <button
                        disabled={this.state.fetching}
                        className="btn searchButton btn-outline-success my-2 my-sm-0"
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container  pt-5">
          <br />
          <br />
          {/* {this.getSearchResult()} */}
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card h-100">
                <div className="card-header newHeader">
                  <span className="card-header-title">Latest Blocks</span>
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
                      {this.state.allBlocks &&
                        this.state.allBlocks.map((el, i) => {
                          return (
                            <>
                              {" "}
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
                                      <a href={/blocks/ + el.data.height}>
                                        {el.data.height}
                                      </a>
                                      <span className="d-sm-block small text-secondary ml-1 ml-sm-0 text-nowrap">
                                        {" "}
                                        {this.getTimeAfterDate(
                                          el.data.timestamp
                                        )}
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
                                        {this.getTimeAfterDate(
                                          el.data.timestamp
                                        )}
                                      </span>
                                      <span className="d-inline-block d-sm-none">
                                        <span
                                          className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                          data-toggle="tooltip"
                                          title=""
                                          data-original-title="Block Reward"
                                        >
                                          {Number(
                                            el.data.total_transaction_fees
                                          ) / 100000000}
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
                                        {Number(
                                          el.data.total_transaction_fees
                                        ) / 10000000000}{" "}
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
                    </div>
                  </div>
                  <div
                    id="mCSB_1_scrollbar_vertical"
                    className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical"
                    style={{ display: "block" }}
                  >
                    <div className="mCSB_draggerContainer">
                      <div
                        id="mCSB_1_dragger_vertical"
                        className="mCSB_dragger"
                        style={{
                          position: "absolute",
                          minHeight: "50px",
                          display: "block",
                          height: "224px",
                          maxHeight: "366px",
                          top: "0px",
                        }}
                      >
                        <div
                          className="mCSB_dragger_bar"
                          style={{ lineHeight: " 50px" }}
                        ></div>
                      </div>
                      <div className="mCSB_draggerRail"></div>
                    </div>
                  </div>
                </div>
                <div className="card-footer p-3">
                  <a
                    className="btn btnBluGradient w-75 m-auto  btn-xs btn-block btn-soft-primary"
                    href="/blocks"
                  >
                    View all blocks
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card h-100">
                <div className="card-header newHeader">
                  <span className="card-header-title">Latest transactions</span>
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
                      {this.state.allBlocks &&
                        this.state.allBlocks.map((el, i) => {
                          return (
                            <>
                              {" "}
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
                                      <a href={/blocks/ + el.data.height}>
                                        {el.data.height}
                                      </a>
                                      <span className="d-sm-block small text-secondary ml-1 ml-sm-0 text-nowrap">
                                        {" "}
                                        {this.getTimeAfterDate(
                                          el.data.timestamp
                                        )}
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
                                        {this.getTimeAfterDate(
                                          el.data.timestamp
                                        )}
                                      </span>
                                      <span className="d-inline-block d-sm-none">
                                        <span
                                          className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                          data-toggle="tooltip"
                                          title=""
                                          data-original-title="Block Reward"
                                        >
                                          {Number(
                                            el.data.total_transaction_fees
                                          ) / 100000000}
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
                                        {Number(
                                          el.data.total_transaction_fees
                                        ) / 10000000000}{" "}
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
                    </div>
                  </div>
                  <div
                    id="mCSB_1_scrollbar_vertical"
                    className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical"
                    style={{ display: "block" }}
                  >
                    <div className="mCSB_draggerContainer">
                      <div
                        id="mCSB_1_dragger_vertical"
                        className="mCSB_dragger"
                        style={{
                          position: "absolute",
                          minHeight: "50px",
                          display: "block",
                          height: "224px",
                          maxHeight: "366px",
                          top: "0px",
                        }}
                      >
                        <div
                          className="mCSB_dragger_bar"
                          style={{ lineHeight: " 50px" }}
                        ></div>
                      </div>
                      <div className="mCSB_draggerRail"></div>
                    </div>
                  </div>
                </div>
                <div className="card-footer p-3">
                  <a
                    className="btn btn-xs  btnBluGradient w-75 m-auto  btn-block btn-soft-primary"
                    href="/blocks"
                  >
                    View all transactions
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* {this.state.fetching && (
          <div className="text-center">
            {" "}
            <img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />{" "}
          </div>
        )}

        {this.state.error && (
          <h4 className="text-center" style={{ color: "red" }}>
            {this.state.error}
          </h4>
        )} */}
        </div>
      </>
    );
  }
}

export default Search;
