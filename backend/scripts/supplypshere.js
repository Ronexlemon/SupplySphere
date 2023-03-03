const {ethers} = require("hardhat");


async function main(){
    //get the contract
    const TenderFileCoinContract = await ethers.getContractFactory("Bider");
    //deploy the contract
    const TenderFileCoinContractDeploy = await TenderFileCoinContract.deploy();
    //await deployment
    await TenderFileCoinContractDeploy.deployed();
    //console the address
    console.log("TenderFileConContractAddress", TenderFileCoinContractDeploy.address);
}
//call main
main().then(()=>
process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})