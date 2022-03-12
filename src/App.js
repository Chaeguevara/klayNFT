import logo from "./logo.svg";
import { getBalance, setCount } from "./api/UseCaver";
import QRCode from "qrcode.react";
import * as KlipApi from "./api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./market.css";
import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";

require("dotenv").config();

const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
// 0x3840Ca4b9Ef3159E11dfF3085FE73DCC7bB42273   <- count.sol address on mainnet
// 1. Smart contract 배포 주소 가져오기
// 2. caver.js 이용해서 스마트 컨트랙트 연동하기
// 3. 가져온 스마트 컨트랙트 실해결과 웹에 표현하기
const DEFALUT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000000000000000";
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
};
function App() {
  //console.log(ACCESS_KEY_ID);
  //console.log(SECRET_ACCESS_KEY);
  const [qrvalue, setQrValue] = useState(DEFALUT_QR_CODE);
  const [nfts, setNfts] = useState([]); //nfts
  const [myBalance, setMyBalance] = useState("0"); //myBalance <-- amount of klay in my wallet.
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS); // wallet address of current user
  getBalance("0x03e4168d8133eb91ae850bc1d7985d76d7ec295c");

  const getUserData = () => {
    KlipApi.getAddress(setQrValue, async (address) => {
      setMyAddress(address);
      const _balance = await getBalance(address);
      setMyBalance(_balance);
    });
  };
  return (
    <div className="App">
      <div style={{ backgroundColor: "black", padding: 10 }}>
        <div
          sytle={{
            fontSize: 30,
            fontWeight: "bold",
            paddingLeft: 4,
            marginTop: 10,
          }}
        >
          내 지갑
        </div>
        {myAddress}
        <br />
        <Alert
          onClick={getUserData}
          variant={"balance"}
          style={{ backgroundColor: "#f40075", fontSize: 25 }}
        >
          {" "}
          {myBalance}
        </Alert>
      </div>
      <Container
        style={{
          backgroundColor: "white",
          width: 300,
          height: 300,
          padding: 20,
        }}
      >
        <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
      </Container>
    </div>
  );
}

export default App;
