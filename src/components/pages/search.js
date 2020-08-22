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
    };

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
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    fetching: false,
                });
            });
    };

    handelSubmitSearchBlock = (e) => {
        e.preventDefault();
        console.log("sbmt");
        this.clearRes();
        axios
            .get(`/block/by/${this.state.blockNumber}`)
            .then((res) => {
                this.setState({
                    blockData: res.data,
                    fetching: false,
                });
            })
            .catch((err) => {
                this.setState({
                    fetching: false,
                });
            });
        // 1Ep7Mki2vFRQQfbYeNeJXkJbUjo54TbL2H
        // 19Zi8ZcJ4PV2AV64i74GHXKTfyazBnH72h
    };

    handelSubmitSearchWallet = (e) => {
        if (e) e.preventDefault();
        this.setState({
            fetching: true,
            blockData: null,
            transactionData: null,
        });

        axios
            .post(`/search_wallet/${this.state.accountNumber}`)
            .then((res) => {
                this.setState({
                    walletData: res.data,
                    fetching: false,
                });
            })
            .catch((e) => {
                console.log(e);
                this.setState({
                    fetching: false,
                });
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
                                },
                            );
                        }}
                        className="cursorPointer"
                    >
                        {data.fromwallet}
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
                                },
                            );
                        }}
                        className="cursorPointer"
                    >
                        {data.towallet}
                    </td>
                    <td>{data.amount}</td>
                    <td>{data.status}</td>
                    <td>{data.txid}</td>
                </tr>
            </>
        );
    };

    getSearchResult = () => {
        if (this.state.walletData) {
            return (
                <>
                    <div className="w800">
                        <h3>address: {this.state.walletData.address}</h3>
                        <h3>balance: {this.state.walletData.balance}</h3>
                    </div>

                    {this.state.transactionsData && (
                        // <div className="container">
                        <table class="table mt-5">
                            <thead>
                                <tr>
                                    <th>fromwallet</th>
                                    <th>towallet</th>
                                    <th>amount</th>
                                    <th>status</th>
                                    <th>txid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transactionsData.transactions.map((el, i) => {
                                    return this.getTable(el, i);
                                })}
                            </tbody>
                        </table>
                    )}
                </>
            );
        } else if (this.state.transactionData) {
            return (
                <>
                    <h3 className="text-center">Transaction Details</h3>
                    <table class="table mt-5">
                        <thead>
                            <tr>
                                <th>fromwallet</th>
                                <th>towallet</th>
                                <th>amount</th>
                                <th>status</th>
                                <th>txid</th>
                            </tr>
                        </thead>
                        <tbody>{this.getTable(this.state.transactionData.transaction)}</tbody>
                    </table>
                </>
            );
        } else if (this.state.blockData) {
            return (
                <>
                    <h3 className="text-center">Transaction Details</h3>
                    <table class="table mt-5">
                        <thead>
                            <tr>
                                <th>fromwallet</th>
                                <th>towallet</th>
                                <th>amount</th>
                                <th>status</th>
                                <th>txid</th>
                            </tr>
                        </thead>

                        {this.state.blockData.block.map((el, i) => {
                            return <tbody>{this.getTable(el, i)}</tbody>;
                        })}
                    </table>
                </>
            );
        }
    };

    render() {
        return (
            <div className="container-fluid mt-5 pt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div class="card">
                            <h5 class="card-header">search block</h5>
                            <div class="card-body">
                                <h5 class="card-title">Search ny block number</h5>
                                <p class="card-text">block number</p>
                                <form onSubmit={this.handelSubmitSearchBlock} class="form-inline">
                                    <input
                                        class="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        name="blockNumber"
                                        onChange={this.handleInputChange}
                                    />
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div class="card">
                            <h5 class="card-header">search account</h5>
                            <div class="card-body">
                                <p class="card-text">search account</p>
                                <h5 class="card-title">account number or ID</h5>
                                <form
                                    onSubmit={(e) => {
                                        this.handelSubmitSearchWallet(e);
                                        this.handelSubmitTransactions(e);
                                    }}
                                    class="form-inline"
                                >
                                    <input
                                        class="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        name="accountNumber"
                                        onChange={this.handleInputChange}
                                    />
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div class="card">
                            <h5 class="card-header">Search transaction hash</h5>
                            <div class="card-body">
                                <p class="card-text">Search transaction information</p>
                                <h5 class="card-title">Transaction ID</h5>
                                <form
                                    onSubmit={(e) => {
                                        this.handelSubmitTransaction(e, "/transaction/by/", "TransactionID");
                                    }}
                                    class="form-inline"
                                >
                                    <input
                                        class="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        name="TransactionID"
                                        onChange={this.handleInputChange}
                                    />
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {this.getSearchResult()}
                {this.state.fetching && (
                    <div className="text-center">
                        {" "}
                        <img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />{" "}
                    </div>
                )}
            </div>
        );
    }
}

export default Search;
