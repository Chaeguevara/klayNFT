import logo from "./logo.svg";
import "./App.css";
import Caver from "caver-js";

require("dotenv").config();

const COUNT_CONTRACT_ADDRESS = "0xb2A2e9C62100AE977f57fd6F16d98cD5919430c7";
const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const COUNT_ABI =
  '[ { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]';
const CHAIND_ID = "1001"; //Baobab <-> Mainnet 8217

const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic " +
        Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64"),
    },
    {
      name: "x-chain-id",
      value: CHAIND_ID,
    },
  ],
};

const caver = new Caver(
  new Caver.providers.HttpProvider(
    "https://node-api.klaytnapi.com/v1/klaytn",
    option
  )
);
const CountContract = new caver.contract(
  JSON.parse(COUNT_ABI),
  COUNT_CONTRACT_ADDRESS
);
const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
};

const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((res) => {
    const balance = caver.utils.convertFromPeb(
      caver.utils.hexToNumberString(res)
    );
    console.log(`BALANCE: ${balance}`);
    return balance;
  });
};

const setCount = async (newCount) => {
  // 사용할 account 설정
  try {
    console.log(PRIVATE_KEY);
    const deployer = caver.wallet.keyring.createFromPrivateKey(
      String(PRIVATE_KEY)
    );
    caver.wallet.add(deployer);
    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address,
      gas: "0x4bfd200",
    });
    console.log(receipt);
  } catch (e) {
    console.log(`[ERROR_SET_COUNT]${e}`);
  }
};
// 1. Smart contract 배포 주소 가져오기
// 2. caver.js 이용해서 스마트 컨트랙트 연동하기
// 3. 가져온 스마트 컨트랙트 실해결과 웹에 표현하기
function App() {
  console.log(ACCESS_KEY_ID);
  console.log(SECRET_ACCESS_KEY);

  readCount();
  getBalance("0x03e4168d8133eb91ae850bc1d7985d76d7ec295c");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          title={"Set Count!!"}
          onClick={() => {
            setCount(100);
          }}
        />
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
