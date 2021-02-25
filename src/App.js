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
import Accounts from "./components/pages/accounts";

function App() {
  const [toggleMenu, setToggleMenu] = React.useState(false);
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
                <span
                  onClick={() => {
                    setToggleMenu(!toggleMenu);
                  }}
                  className="navbar-toggler-icon"
                >
                  {toggleMenu ? (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="times"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 352 512"
                      class="svg-inline--fa fa-times fa-w-11 fa-2x"
                    >
                      <path
                        fill="currentColor"
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                        class=""
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="bars"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      class="svg-inline--fa fa-bars fa-w-14 fa-2x"
                    >
                      <path
                        fill="currentColor"
                        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                        class=""
                      ></path>
                    </svg>
                  )}
                </span>
              </button>

              <div
                className={
                  toggleMenu
                    ? "navbar-collapse collapse show"
                    : "navbar-collapse collapse"
                }
                onClick={(e) => {
                  e.stopPropagation();
                }}
                id="navb"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Blockchain &#11206;
                    </a>
                    <ul>
                      <li>
                        <a href="/transactions?page=0">View Txns</a>
                      </li>
                      <li>
                        <a href="#">View Pending Txns</a>
                      </li>
                      <hr />
                      <li>
                        <a href="/blocks?page=0">View Blocks</a>
                      </li>
                      <li>
                        <a href="/accounts">Top Accounts</a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/transactions" href="#">
                      Tokens &#11206;
                    </a>

                    <ul>
                      <li>
                        <a href="#">WAECHAIN Tokens (Coming Soon)</a>
                      </li>
                      <li>
                        <a href="#">View Transfers (Coming Soon)</a>
                      </li>
                    </ul>
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
          <Route exact path="/accounts" component={Accounts} />
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
            <div className="col-6 col-md-3 text-center text-md-left font-wight">
              <h5 style={{ color: "#fff" }}>Ecosystem</h5>
              <div>
                <a href="https://www.waveplatform.io/" target="_blank">
                  Platform
                </a>
              </div>
              <div>
                <a href="https://www.waveplatform.io/wallet" target="_blank">
                  Wallet
                </a>
              </div>
              <div>
                <a href="/">Wavescan</a>
              </div>
            </div>
            <div className="col-6 col-md-3 text-center text-md-left font-wight">
              <h5 style={{ color: "#fff" }}>Company</h5>

              <div>
                <a href="https://www.waveplatform.io/" target="_blank">
                  About us
                </a>
              </div>
              <div>
                <a href="https://www.waveplatform.io/" target="_blank">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
