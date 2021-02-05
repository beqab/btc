import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "./imgs/logo.svg";
import logo2 from "./imgs/logo2.png";
import "./App.css";
import "./scss/style.scss";
import Search from "./components/pages/search";
import BlockById from "./components/pages/blocks/blockById";
import Blocks from "./components/pages/blocks";
import Transactions from "./components/pages/transactions";
import TransactionsByID from "./components/pages/transactions/transactionById";
import Wallet from "./components/pages/wolet";
function App() {
  return (
    <>
      <div className="App pb-5">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <div className="header">
          <div className="container">
            <nav id="navBar" className="navbar navbar-expand-lg  ">
              <a className="navbar-brand" href="/">
                <img height="30" src={logo2} />
              </a>
              <button
                className="navbar-toggler navbar-toggler-right collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navb"
                aria-expanded="false"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="navbar-collapse collapse" id="navb">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/blocks">
                      blocks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/transactions">
                      transactions
                    </a>
                  </li>
                </ul>
                {/* <button className="brn btn-default ml-5 btnBluGradient">
                  <svg
                    id="Icon_open-account-login"
                    data-name="Icon open-account-login"
                    xmlns="http://www.w3.org/2000/svg"
                    width="13.815"
                    height="20.838"
                    viewBox="0 0 23.815 20.838"
                  >
                    <path
                      id="Icon_open-account-login-2"
                      data-name="Icon open-account-login"
                      d="M8.931,0V2.977H20.838V17.862H8.931v2.977H23.815V0Zm2.977,5.954V8.931H0v2.977H11.908v2.977l5.954-4.465Z"
                      fill="#fff"
                    />
                  </svg>{" "}
                  login
                </button> */}
              </div>
            </nav>
          </div>
        </div>
        {/* <nav id="navBar" className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse container"
            id="navbarTogglerDemo01"
          >
            <a className="navbar-brand" href="/">
              <img height="30" src={logo2} />
            </a>
            <ul className="navbar-nav mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </nav> */}
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/block/:ID" component={BlockById} />
          <Route exact path="/transaction/:ID" component={TransactionsByID} />
          <Route exact path="/blocks" component={Blocks} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/wallet/:ID" component={Wallet} />
        </Switch>
        {/* <Search /> */}
      </div>
      <footer className="page-footer font-small unique-color-dark pt-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="footer-copyright text-center py-3">
                <img src={logo} /> Powered by WAVE © 2020 Copyright
              </div>
            </div>
            <div className="col-12 col-md-6 text-center font-wight">
              <div>
                <a href="#">Lorem ipsum dolor sit ame</a>
              </div>
              <div>
                <a href="#">Lorem ipsum dolor sit ame</a>
              </div>
              <div>
                <a href="#">Lorem ipsum dolor sit ame</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
