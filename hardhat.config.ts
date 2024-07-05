import "@nomicfoundation/hardhat-ethers";
import "@yankeguo/hardhat-trezor";
import "@nomicfoundation/hardhat-verify";

import { HardhatUserConfig } from "hardhat/config";
import { task } from "hardhat/config";
import { ethers } from "ethers";

task("yankecoin_deploy", "deploy YanKeCoin contract", async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const balance = await signer.provider.getBalance(signer.address);
  console.log("address:", signer.address);
  console.log("balance:", ethers.formatEther(balance));
  console.log("deploying YanKeCoin contract...");
  const YanKeCoin = await hre.ethers.getContractFactory("YanKeCoin");
  const contract = await YanKeCoin.deploy();
  console.log("YanKeCoin contract deployed at:", await contract.getAddress());
});

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "arb-mainnet": {
      url: "https://arb1.arbitrum.io/rpc",
      trezorDerivationPaths: [[44, 60, 0, 0, 0]],
    },
    "arb-sepolia": {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      trezorDerivationPaths: [[44, 60, 0, 0, 0]],
      trezorInsecureDerivation: true,
    },
  },
  etherscan: {
    apiKey: {
      "arb-mainnet": process.env.ETHERSCAN_ARB_API_KEY,
      "arb-sepolia": process.env.ETHERSCAN_ARB_API_KEY,
    },
    customChains: [
      {
        network: "arb-mainnet",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io",
        },
      },
      {
        network: "arb-sepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://api-sepolia.arbiscan.io/api",
        },
      },
    ],
  },
} as HardhatUserConfig;
