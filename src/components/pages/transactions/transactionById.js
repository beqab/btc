import React, { useEffect, useState } from "react";
import axios from "axios";

import TransactionContainer from "./transactionsContainer";

function TransactionById({ match }) {
  const [transactionData, setTransactionData] = useState(null);
  const [transactionTime, setTransactionTime] = useState(null);
  const [transactionError, setTransactionError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://51.255.211.135:8181/transactions/" + match.params?.ID)
      .then((res) => {
        if (res.data.error) {
          return setTransactionError(res.data.error);
        }
        setTransactionData(res.data);
        setTransactionTime(new Date(res.data.input.timestamp));
        // console.log(new Date(res.data.header.data.timestamp * 1000));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        let testObj = {
          previousHash:
            "b974c35b0ef543fac72ccd6ad63a8583c3ee840821a4ac4e334098e13626b087",
          transactions: [
            {
              id: "26d66553-7390-46fc-8059-15dd7036dd13",
              type: {
                type: "transaction",
              },
              input: {
                signature: "[B@729cf71e",
                from:
                  "19bfc18fc741d581c2e80b13e611038d81b39d104e07a75ffc7cc76fa28fe12c",
                timestamp: 1612206615214,
              },
              output: {
                to: "toaddress",
                amount: 20.0,
                fee: 1,
              },
            },
          ],
          timestamp: 1612206615214,
          validator:
            "19bfc18fc741d581c2e80b13e611038d81b39d104e07a75ffc7cc76fa28fe12c",
          hash:
            "4107f5f639dc960f516aa4e7e0367ac15b4a2715f141fea1a629d844e2bed1c4",
          secret: "some wallet",
          blockReward: 5,
          signature:
            "TQhP0q3O/7GMlNuDR6EmU2i/JJ4RAuPEfmVpdo3Dtwvb92OAC+0SHS+1Udl3tqp7BrpFnT0blMIgYD3/sU0Euw==",
        };
        // setLoading(false);

        // setTransactionTime(new Date(testObj.timestamp));

        // setTransactionData(testObj);
        // debugger;
        // transactionError("server error :/ ");
      });
  }, [match.params?.ID]);
  return (
    <div>
      <TransactionContainer
        transaction={{
          ...transactionData,
          time: transactionTime,
          hasError: transactionError,
          transactionName: match.params?.ID,
          loading,
        }}
      />
    </div>
  );
}

export default TransactionById;
