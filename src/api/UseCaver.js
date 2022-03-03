import Caver from "caver-js";
import CounterABI from "../abi/CounterABI.json";

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
  JSON.pars(CounterABI),
  COUNT_CONTRACT_ADDRESS
);
export const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
};

export const getBalance = (address) => {
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
      gas: "0x4bfd20",
    });
    console.log(receipt);
  } catch (e) {
    console.log(`[ERROR_SET_COUNT]${e}`);
  }
};
