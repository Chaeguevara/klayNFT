import logo from "./logo.svg";
import { getBalance, setCount } from "./api/UseCaver";
import QRCode from "qrcode.react";
import * as KlipApi from "./api/UseKlip";
import "./App.css";
import React, { useState } from "react";

require("dotenv").config();

const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
// 0x3840Ca4b9Ef3159E11dfF3085FE73DCC7bB42273   <- count.sol address on mainnet
// 1. Smart contract 배포 주소 가져오기
// 2. caver.js 이용해서 스마트 컨트랙트 연동하기
// 3. 가져온 스마트 컨트랙트 실해결과 웹에 표현하기
const DEFAUT_QR_CODE = "DEFAULT";
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
};
function App() {
  //console.log(ACCESS_KEY_ID);
  //console.log(SECRET_ACCESS_KEY);
  const [qrvalue, setQrValue] = useState(DEFAUT_QR_CODE);
  const [balance, setBalance] = useState("0");
  //readCount();
  getBalance("0x03e4168d8133eb91ae850bc1d7985d76d7ec295c");
  const onClickGetAddress = () => {
    KlipApi.getAddress(setQrValue);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            onClickGetAddress();
          }}
        >
          주소가져오기
        </button>
        <br />
        <br />
        <br />
        <br />
        <QRCode value={qrvalue} />
        <p>{balance}</p>
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
      </header>
    </div>
  );
}

export default App;
