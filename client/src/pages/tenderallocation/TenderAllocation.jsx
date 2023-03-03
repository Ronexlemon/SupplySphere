import React from "react";
import { BiderAbi } from "../../abi/bidercontract_abi";
import Web3Modal from "web3modal";
import { useRef, useEffect, useState,useCallback } from "react";

import { BrowserProvider, Contract } from "ethers";
import DisplayTenderAllocation from "./DisplayTenderAllocation";


function TenderAllocation() {
  const [walletconnect, setWalletConnect] = useState(false);
  const [BidTenders, setBidTenders] = useState([]);
  const [index, setIndex] = useState();
  const ContractBiderAddress = "0x21ba8e6B05c8020d985777Ab10457cE7C0626fa1";
  const Web3ModalRef = useRef();
  //provide sgner or provider
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await Web3ModalRef.current.connect();
    const web3Provider = new BrowserProvider(provider);
    // check if network is fantomTestnet
    const { chainId } = await web3Provider.getNetwork();
    
    if (chainId !== 4002) {
      window.alert("Change network to FantomTestnet");
      throw new Error("Change network to FantomTestnet ");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };
  const getAllBids = useCallback(async () => {
    try {
      let _bidTenders = [];
      const provider = await getProviderOrSigner();
      const BidersContract = new Contract(
        ContractBiderAddress,
        BiderAbi,
        provider
      );


      const bids = await BidersContract.readBiderDetails();
      bids?.forEach((element) => {
        _bidTenders.push(element);
      });
      setBidTenders(_bidTenders);
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  //Approve function
  const approveTender = async (ids) => {
    const signer = await getProviderOrSigner(true);

    const BiderContract = new Contract(ContractBiderAddress, BiderAbi, signer);
    const approves = await BiderContract.approveTender(ids);
    // alert(approves);
  };

  //call the metamask on page reload
  // useEffect(()=>{
  //   getAllBids();
  // },[])
  useEffect(() => {
    Web3ModalRef.current = new Web3Modal({
      network: "hyperspace",
      providerOptions: {},
      disableInjectedProvider: false,
      cacheProvider: false,
    });
    getAllBids();
  }, [walletconnect]);

  return (
    <div>
      <main className="">
        
        <DisplayTenderAllocation bids={BidTenders} approve={approveTender} />
      </main>
    </div>
  );
}

export default TenderAllocation;