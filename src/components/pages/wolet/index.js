import React from "react";

function index() {
  return (
    <div>
      <h3 className="w700 mb-4">Address</h3>
      <div className="w700  d-md-flex d-block address ">
        <div className="test-sm-centre">
          <img
            className="qrImg"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${"this.state.walletData.address"}`}
          />
        </div>
        <div className=" pl-0 pl-md-3 test-sm-centre">
          <h5 className="font-sm-14 ">
            address: {"this.state.walletData.address"}
          </h5>
          <h5 className="font-sm-14">
            balance: {"this.state.walletData.balance"}
          </h5>
          <h5 className="font-sm-14">
            Transactions: 213123
            {/* {this.state.transactionsData &&
                  this.state.transactionsData.transactions.length} */}
          </h5>

          <h5 className="font-sm-14">
            Total Sent: 323
            {/* {this.state.transactionsData &&
                  this.calcTotalReceivedSent(
                    this.state.transactionsData.transactions,
                    this.state.walletData.address
                  ).Sent} */}
          </h5>
          <h5 className="font-sm-14">
            Total Received : dsfsdf
            {/* {this.state.transactionsData &&
                  this.calcTotalReceivedSent(
                    this.state.transactionsData.transactions,
                    this.state.walletData.address
                  ).Received} */}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default index;
