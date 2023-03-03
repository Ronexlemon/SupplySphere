import React from "react";
import DisplayTenders from "./DisplayAvailableTenders";
import { useState, useEffect, useRef, useCallback } from "react";
import Web3Modal from "web3modal";
import { BrowserProvider, Contract } from "ethers";
import { BiderAbi } from "../../abi/bidercontract_abi";


const AvailableTenders = () => {
  const [Tenders, setTenders] = useState([]);
  const TenderOwnerAddress = "0x21ba8e6B05c8020d985777Ab10457cE7C0626fa1";
  const [tenderslength, setLength] = useState(0);
  const web3ModalRef = useRef();
  const Approve = () => {
    alert("yooh");
  };
  //Todo get all information
  const getAllTenders = useCallback(async () => {
    try {
      let _tenders = [];
    const provider = await getProviderOrSigner();
    const TenderContracts = new Contract(
      TenderOwnerAddress,
      BiderAbi,
      provider
    );


      const tenders = await TenderContracts.readTenderDetails();
      tenders?.forEach((element) => {
        _tenders.push(element);
      });
      setTenders(_tenders);
    } catch (error) {
      console.log(error);
    }
  }, []);
  // //getAllTenders
  // const getAllTenders = useCallback(async () => {
  //   let _tenders = [];
  //   const provider = await getProviderOrSigner();
  //   const TenderContracts = new Contract(
  //     TenderOwnerAddress,
  //     BiderAbi,
  //     provider
  //   );

  //   const tenderLength = await TenderContracts.tenderTotals();

  //   for (let i = 0; i < tenderLength; i++) {
  //     let _tender = new Promise(async (resolve, reject) => {
  //       let t = await TenderContracts.readTenderDetails(i);
  //       resolve({
  //         owners: t[0],
  //         companyNames: t[1],
  //         tenderDescriptions: t[2],
  //         deadlineDates: t[3],
  //         contactEmails: t[4],
  //         tenderAmounts: t[5],
  //         tenderindexs: t[6],
  //       });
  //       reject(new Error("Will this be ignored?")); // ignored
  //     });
  //     _tenders.push(_tender);
  //   }
  //   const tenderss = await Promise.all(_tenders);
  //   setTenders(tenderss);
  //   //renderProducts();

  //   //add function to render tenders
  // }, []);
  const getProviderOrSigner = async (needSigner = false) => {
    //connect metamask
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new BrowserProvider(provider);
    //check if user is connected to Mumbai network
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 3141) {
      window.alert("Change network to HyperSpace fileCoin");
      throw new Error("Change network To HyperSpace fileCoin ");
    }
    // alert("network is Mumbai")
    //if need signer for transactions
    if (needSigner) {
      const signer = web3Provider.getSigner();
      const accounts = await signer.getAddress();
      // setaddress(accounts);
      return signer;
    }
    return web3Provider;
  };
  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "hyperspace",
      providerOptions: {},
      disableInjectedProvider: false,
      cacheProvider: false,
    });
    //getTotalTendersLength();
    getAllTenders();
    //renderProducts();
  }, [tenderslength]);

  return (
    <div>
      <main className="">
        
        <DisplayTenders tenders={Tenders} approve={Approve} />
      </main>
    </div>
  );
};
export default AvailableTenders;