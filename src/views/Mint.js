import React from "react";
// import lighthouse from '@lighthouse-web3/sdk';
import lighthouse from 'lighthouse-web3';
import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = process.env.REACT_APP_NFTSTORAGE_KEY;

async function storeNFT(imagePath, name, description) {
  // load the file from disk
  const image = await fileFromPath(imagePath)

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

  // call client.store, passing in the image & metadata
  return nftstorage.store({
      image,
      name,
      description,
  })
}
/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
 async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath)
  const type = mime.getType(filePath)
  return new File([content], path.basename(filePath), { type })
}

function App() {
  const args = process.argv.slice(2)
  if (args.length !== 3) {
      console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`)
      process.exit(1)
  }

  const [imagePath, name, description] = args
  const upload = async() => {
    const result = storeNFT(imagePath, name, description)
    console.log(result)
  }
  // const progressCallback = (progressData) => {
  //   let percentageDone =
  //     100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  //   console.log(percentageDone);
  // };

  const deploySafe = async(e) => {
    console.log(e, lighthouse)
  }

  const deploy = async(e) =>{
    // Push file to lighthouse node
    console.log('lighthousel', lighthouse)
    const output = await lighthouse.upload(e, process.env.REACT_APP_LIGHTHOUSE_KEY);
    console.log('File Status:', output);
    /*
      output:
        {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  return (
    <div className="App">
      <input onChange={e=>deploy(e)} type="file" />
      <input onChange={e=>main(e)} type="file" />
      {/* <input onChange={e=>deploySafe(e)} type="file" /> */}
      hi
    </div>
  );
}

export default App;