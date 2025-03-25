"use client";

import { useRead } from "@/utils/fetchContracts";
import { createContext, useState, ReactNode, useContext } from "react";
import { Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";

interface CreatorProfileData {
  username: string;
  img: string;
  accountType: string;
  id: string;
  owner: Address;
  createdAt: number;
  totalCreatedNfts: number;
  totalSoldNfts: number;
}

interface CollectorProfileData {
  username: string;
  img: string;
  accountType: string;
  id: string;
  owner: Address;
  createdAt: number;
  totalOwnedNfts: number;
}

interface ProfileData {
  username: string;
  img: string;
  accountType: "creator" | "collector" | "none";
  id: string;
  owner: Address;
  createdAt: number;
  totalCreatedNfts?: number; // Only for creators
  totalSoldNfts?: number; // Only for creators
  totalOwnedNfts?: number; // Only for collectors
}

interface ISmartzContextType{
    userData: ProfileData | null;
    address: Address;
    newUserData: ProfileData;
    statusCreator: {} | boolean | null;
    setNewUserData: React.Dispatch<React.SetStateAction<ProfileData | null>>;
}

export const SmartzContext = createContext<ISmartzContextType>({
  userData: {
    accountType: "none",
    createdAt: 0,
    id: "",
    img: "",
    owner: zeroAddress,
    username: "",
    totalCreatedNfts: 0,
    totalOwnedNfts: 0,
    totalSoldNfts: 0,
  },

  statusCreator: false || null,
  newUserData: {
    accountType: "none",
    createdAt: 0,
    id: "",
    img: "",
    owner: zeroAddress,
    username: "",
    totalCreatedNfts: 0,
    totalOwnedNfts: 0,
    totalSoldNfts: 0,
  },

  address: zeroAddress,

  setNewUserData: () => {},
});

interface Props {
    children: ReactNode;
}

const SmartzProvider = ({children}: Props) => {
    const [newUserData, setNewUserData] = useState<any>(null);

    const { address, isConnected } = useAccount();

    const {data: creatorProfile} = useRead({
      contractName: "profile",
      functionName: "fetchCreatorProfile",
    });

    const { data: collectorProfile } = useRead({
      contractName: "profile",
      functionName: "fetchCollectorProfile",
    });

    let userData: any = null;

    console.log("Collector Profile: ", collectorProfile);
    console.log("Creator Profile: ", creatorProfile);

    // if (creatorProfile?.owner === address) {
    //     userData = creatorProfile;
    // }else if(collectorProfile?.owner === address) {
    //     userData = collectorProfile;
    // }

    const contextValue = {
        address: address || zeroAddress,
        userData,
        statusCreator: userData?.accountType === "creator",
        newUserData,
        setNewUserData,
    };

    return (
        <SmartzContext.Provider value={contextValue}>
        {children}
        </SmartzContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSmartzContext = () => useContext(SmartzContext);
export default SmartzProvider;

