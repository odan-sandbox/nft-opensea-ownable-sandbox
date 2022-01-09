// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const deployer = (await ethers.getSigners())[0];
  const owner = (await ethers.getSigners())[1];
  const minter = (await ethers.getSigners())[0];
  console.log({
    deployer: deployer.address,
    owner: owner.address,
    minter: minter.address,
  });

  const TokenWithoutOwnable = await ethers.getContractFactory(
    "TokenWithoutOwnable"
  );
  const TokenWithOwnable = await ethers.getContractFactory("TokenWithOwnable");

  const tokenWithoutOwnable = await TokenWithoutOwnable.deploy(
    "TokenWithoutOwnable",
    "TokenWithoutOwnable",
    minter.address
  );
  const tokenWithOwnable = await TokenWithOwnable.deploy(
    "TokenWithOwnable",
    "TokenWithOwnable",
    minter.address,
    owner.address
  );

  await tokenWithoutOwnable.deployed();
  await tokenWithOwnable.deployed();

  await (await tokenWithoutOwnable.mint(minter.address, 0)).wait();
  await (await tokenWithOwnable.mint(minter.address, 0)).wait();

  console.log("deployed to:", tokenWithoutOwnable.address);
  console.log("deployed to:", tokenWithOwnable.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
