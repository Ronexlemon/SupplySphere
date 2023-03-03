import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

// import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../contexts/ContextProvider";
import Web3Modal from "web3modal";
import { useRef, useEffect, useState,useCallback } from "react";
import { BrowserProvider, Contract } from "ethers";



const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,

    setScreenSize,
    screenSize,
  } = useStateContext();
  const [walletconnect, setWalletConnect] = useState(false);
  const [BidTenders, setBidTenders] = useState([]);
  const [index, setIndex] = useState();
  const ContractBiderAddress = "0x0dDCC4ccA81cF91953a6dcbf8da45C125d39A6bE"; 
  const Web3ModalRef = useRef();
  //provide sugner or provider
  const connectWallet = async (needSigner = false) => {
    const provider = await Web3ModalRef.current.connect();
    const web3Provider = new BrowserProvider(provider);
    
    // check if network is Mumbai
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 3141) {
      window.alert("Change network to HyperSpace fileCoin");
      throw new Error("Change network To HyperSpace fileCoin ");
    }
    setWalletConnect(true);
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };
  useEffect(() => {
    Web3ModalRef.current = new Web3Modal({
      network: "hyperspace",
      providerOptions: {},
      disableInjectedProvider: false,
      cacheProvider: false,
    });
    connectWallet();
    
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between py-5 md:ml-6 md:mr-6 relative bg-white rounded-lg">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      {walletconnect == true?<button
        onClick={()=>{connectWallet()}}
        className="px-4 py-2 font-josefin text-white bg-green-400 rounded-md shadow-md hover:shadow-lg"
      >
        
        Connected
      </button>:<button
        onClick={()=>{connectWallet()}}
        className="px-4 py-2 font-josefin text-white bg-button-color rounded-md shadow-md hover:shadow-lg"
      >
        
        Connect Wallet
      </button>}
     
    </div>
  );
};

export default Navbar;