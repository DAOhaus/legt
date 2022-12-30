import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from "ethers";
import { uniswapFactory, goerli } from '../helpers/addresses.json'
import { useParams } from "react-router-dom";
import { getPriceUniswapV3, queryFactoryForLPUniV3 } from '@thanpolas/uniswap-chain-queries'

function Liquidity() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    let { addressParam } = useParams();
    const getData = useCallback(async () => {
        const provider = ethers.getDefaultProvider('goerli', { alchemy: process.env.REACT_APP_ALCHEMY_KEY_GOERLI })
        const lpAddresses = await queryFactoryForLPUniV3(
            uniswapFactory,
            provider,
            [goerli.stable, addressParam],
        );
        const newData = await Promise.all(lpAddresses.map(async (address) => getPriceUniswapV3(address, provider, [18, 18])))
        setLoading(false)
        return newData
    }, [addressParam])

    useEffect(() => {
        setLoading(true)
        async function dataFetch() { setData(await getData()) }
        dataFetch()
    }, [getData]);

    return (
        <div className="full-screen-center text-align-center">
            {loading
                ? 'loading...'
                : <div className="m20">
                    Goerli Liquidity Pools:
                    <div className="m20" />
                    <div className='flex word-break'>{data.map(asset =>
                        <div key={asset.lpAddress}>{JSON.stringify(asset, null, 4)}</div>
                    )}</div>
                    <button onClick={async () => setData(await getData())}>refresh data</button>
                </div>}

        </div>
    );
}

export default Liquidity;
