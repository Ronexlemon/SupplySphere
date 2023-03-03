const {ethers} = require("hardhat");


async function main(){
    //get the contract
    const TenderSupplyShereContract = await ethers.getContractFactory("Bider");
    //deploy the contract
    const TenderSupplyShereContractDeploy = await TenderSupplyShereContract.deploy();
    //await deployment
    await TenderSupplyShereContractDeploy.deployed();
    //console the address
    console.log("SupplyShereContractAddress", TenderSupplyShereContractDeploy.address);
}
//call main
main().then(()=>
process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})