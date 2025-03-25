"use client";

import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import Image from "next/image";
import Link from "next/link";

const ownedNFTs: any = []; // Replace with actual owned NFT data

export default function CollectionsPage() {
  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-center">
        <h1 className={title()}>Owned NFTs</h1>
      </div>

      {ownedNFTs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80 text-center">
          <p className="text-gray-600 text-lg font-medium">
            😔 Oops! You don’t own any NFTs yet.
          </p>
          <p className="text-gray-500">
            Browse the marketplace and make your first purchase.
          </p>
          <Link href="/">
            <Button color="primary" className="mt-4">
              Visit Marketplace
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ownedNFTs.map((nft: any) => (
            <div
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-blue-300"
              key={nft.id}
            >
              <div className="overflow-hidden">
                <Image
                  src={nft.image}
                  alt={nft.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900">
                  {nft.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  By{" "}
                  <span className="text-blue-600 font-medium">
                    {nft.creator}
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  Created on <span className="text-gray-700">{nft.date}</span>
                </p>
                <div className="mt-3">
                  <span className="text-lg font-bold text-blue-600">
                    Price: {nft.price}
                  </span>
                </div>
                <Button color="success" variant="flat">
                  Owned
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
