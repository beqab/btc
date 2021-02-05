import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsListContainer from "../transactions/transactionsListContainer";

function Index({ match }) {
  const [WalletData, setWalletData] = useState(null);
  const [WalletTime, setWalletTime] = useState(null);
  const [WalletError, setWalletError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [walletTransactions, setWalletTransactions] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://51.255.211.135:8181/wallet/" + match.params?.ID)
      .then((res) => {
        if (res.data.error) {
          return setWalletError(res.data.error);
        }
        setWalletData(res.data);
        setWalletTime(new Date(res.data.input.timestamp));
        // console.log(new Date(res.data.header.data.timestamp * 1000));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        // setLoading(false);

        // setWalletTime(new Date(testObj.timestamp));

        // setWalletData(testObj);
        // debugger;
        // WalletError("server error :/ ");
      });
  }, [match.params?.ID]);
  return (
    <div className="mt-5 pt-4">
      <h3 className="w700 mb-4">Address</h3>
      <div className="w700  d-md-flex d-block address ">
        <div className="test-sm-centre">
          <img
            className="qrImg"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${WalletData?.pubKey}`}
          />
        </div>
        <div className=" pl-0 pl-md-3 test-sm-centre">
          <h5 className="font-sm-14 ">address: {WalletData?.pubKey}</h5>
          <h5 className="font-sm-14">balance: {WalletData?.balance} Wave</h5>
          <h5 className="font-sm-14">
            blocked: {WalletData?.blocked}
            {/* {this.state.transactionsData &&
                  this.state.transactionsData.transactions.length} */}
          </h5>

          <h5 className="font-sm-14">
            pending: {WalletData?.pending}
            {/* {this.state.transactionsData &&
                  this.calcTotalReceivedSent(
                    this.state.transactionsData.transactions,
                    this.state.walletData.address
                  ).Sent} */}
          </h5>
          <h5 className="font-sm-14">
            state : {WalletData?.state}
            {/* {this.state.transactionsData &&
                  this.calcTotalReceivedSent(
                    this.state.transactionsData.transactions,
                    this.state.walletData.address
                  ).Received} */}
          </h5>
        </div>
      </div>
      <div className="container">
        <TransactionsListContainer />
      </div>
    </div>
  );
}

export default Index;
