import axios from "axios";
import { COUNT_CONTRACT_ADDRESS } from "../constants";

const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const APP_NAME = "KLAY_MARKET";
export const setCount = (count, setQrValue) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "execute_contract",
      transaction: {
        to: COUNT_CONTRACT_ADDRESS,
        abi: ' { "constant": false, "inputs": [ {"name": "_count", "type": "uint256" }], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }',
        value: "0",
        params: `[${count}]`,
      },
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      setQrValue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[RESULT] ${JSON.stringify(res.data.result)}`);
              if (res.data.result.status === "success") {
                clearInterval(timerId);
              }
            }
          });
      }, 1000);
    });
};
export const getAddress = (setQrValue, callback) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "auth",
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      setQrValue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[RESULT] ${JSON.stringify(res.data.result)}`);
              callback(res.data.result.klaytn_address); //return klaytn address as callback
              clearInterval(timerId);
            }
          });
      }, 1000);
    });
};
