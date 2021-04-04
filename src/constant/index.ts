import BigNumber from 'bignumber.js';

const Web3 = require('web3');

export const PRODUCT_CONTRACT = '0x3241b3eb213cdcad0c5ab3858b5875b0567f7b8f';

export const DEFAULT_DECIMALS = 18;
export let web3Provider =
    typeof (window as any).web3 !== 'undefined'
        ? (window as any).web3.currentProvider
        : new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/6ae0876f5fbb40c4932fa32cf62d8af2');

// Replace this with Redux for more complex logic
const networkCallbacks = [];
export const onNetworkUpdate = (callback: any) => {
    networkCallbacks.push(callback);
};

export async function connectWallet() {
    const { ethereum } = window as any;
    if (ethereum) {
        ethereum.enable();
    } else {
        const errorMessage =
            'You need an Ethereum wallet to interact with this marketplace. Unlock your wallet, get MetaMask.io or Portis on desktop, or get Trust Wallet or Coinbase Wallet on mobile.';
        alert(errorMessage);
        throw new Error(errorMessage);
    }
}

export function toUnitAmount(baseAmount: any, tokenContract: any): BigNumber {
    const decimals = tokenContract && tokenContract.decimals != null ? tokenContract.decimals : DEFAULT_DECIMALS;
    if (!baseAmount || !tokenContract) {
        return undefined;
    }
    const amountBN = new BigNumber(baseAmount.toString());
    return amountBN.div(new BigNumber(10).pow(decimals));
}

export function toBaseUnitAmount(unitAmount: any, tokenContract: any): BigNumber {
    const decimals = tokenContract && tokenContract.decimals != null ? tokenContract.decimals : DEFAULT_DECIMALS;
    if (!unitAmount || !tokenContract) {
        return undefined;
    }
    const amountBN = new BigNumber(unitAmount.toString());
    return amountBN.times(new BigNumber(10).pow(decimals));
}

export async function promisify(inner: (arg0: (err: any, res: any) => void) => void) {
    return new Promise((resolve, reject) =>
        inner((err: any, res: unknown) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        })
    );
}
