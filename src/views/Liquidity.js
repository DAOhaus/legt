import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from "ethers";
import addresses from '../helpers/addresses.json'
// import erc20abi from '../helpers/erc20abi.js'
import { useParams } from "react-router-dom";
import { Card } from 'antd';
import { getPriceUniswapV3, queryFactoryForLPUniV3 } from '@thanpolas/uniswap-chain-queries'
const erc20abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

function Liquidity() {
    const network = 'goerli'
    let { addressParam } = useParams();
    const [data, setData] = useState([]);
    const [tokenInfo, setTokenInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const provider = ethers.getDefaultProvider(network, { alchemy: process.env.REACT_APP_ALCHEMY_KEY_GOERLI })
    const stable = addresses[network].stable
    const StableContract = new ethers.Contract( stable, erc20abi, provider )
    const AssetContract = new ethers.Contract( addressParam, erc20abi, provider )
    const StableSymbol = StableContract.symbol()
    const AssetSymbol = AssetContract.symbol()
    const getTokenInfo= useCallback(async () => {
        const stableSymbol = await StableContract.symbol()
        const assetSymbol = await AssetContract.symbol()
        console.log('symbols', StableSymbol, AssetSymbol)
        return [stableSymbol, assetSymbol]
    })
    const getData = useCallback(async () => {
        const lpAddresses = await queryFactoryForLPUniV3(
            addresses.uniswapFactory,
            provider,
            [stable, addressParam],
        );
        const newData = await Promise.all(lpAddresses.map(async (address) => 
            getPriceUniswapV3(address, provider, [18, 18])
        ))
        setLoading(false)
        return newData
    }, [stable,addressParam])

    useEffect(() => {
        setLoading(true)
        async function dataFetch() { setData(await getData()) }
        async function tokenFetch() { setTokenInfo(await getTokenInfo()) }
        tokenFetch()
        dataFetch()
    }, [getData]);

    return (
        <div className="full-screen-center text-align-center">
            {loading
                ? 'loading...'
                : <div className="m20">
                    <div className="m20" />
                    <div className='flex word-break'>{data
                    .filter(asset => Number(asset.token0Reserves) || Number(asset.token1Reserves))
                    .map(asset =>
                    <div key={asset.lpAddresses} >
                            <Card title={`${network} uniswap`} >
                                
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`https://app.uniswap.org/#/swap?inputCurrency=${stable}&outputCurrency=${addressParam}`}>
                                    <button>{`${tokenInfo[0]} / ${tokenInfo[1]} ⇗`}</button>
                                </a>
                                {Object.entries(asset).map(([key, value]) =>
                                    <p>{`${key}: ${value}`}</p>
                                )}
                            </Card>
                        </div>
                    )}</div>
                    {/* <button onClick={async () => setData(await getData())}>refresh data</button> */}
                </div>}

        </div>
    );
}

export default Liquidity;
