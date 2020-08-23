import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./components/pages/search";

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

                <nav id="navBar" class="navbar navbar-expand-lg navbar-light bg-light">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse container" id="navbarTogglerDemo01">
                        <a class="navbar-brand" href="#">
                            Hidden brand
                        </a>
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">
                                    Home <span class="sr-only">(current)</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    Link
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">
                                    Disabled
                                </a>
                            </li>
                        </ul>
                        {/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
                    </div>
                </nav>

                <Search />
            </div>
            <footer class="page-footer font-small unique-color-dark pt-4">
                <div class="footer-copyright text-center py-3">
                    © 2020 Copyright:
                    <a href="https://.com/"> MDB.com</a>
                </div>
            </footer>
        </>
    );
}

export default App;
