import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from "ethers";
import addresses from '../helpers/addresses.json'
import readable from '../helpers/readable'
import { useParams } from "react-router-dom";
import { Card, Tooltip, Alert, Typography, Progress, Spin } from 'antd';
import axios from 'axios';
import { getPriceUniswapV3, queryFactoryForLPUniV3 } from '@thanpolas/uniswap-chain-queries'
import ImageGallery from 'react-image-gallery';
const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

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
    const networkData = require(`../data/${network}`)
    const { addressParam } = useParams();
    const tokenData = require(`../data/${networkData.symbol}:${addressParam}`).default
    const [data, setData] = useState([]);
    const [zillowData, setZillowData] = useState([]);
    const [tokenInfo, setTokenInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const provider = ethers.getDefaultProvider(network, { alchemy: process.env.REACT_APP_ALCHEMY_KEY_GOERLI })
    const stable = addresses[network].stable
    const StableContract = new ethers.Contract( stable, erc20abi, provider )
    const AssetContract = new ethers.Contract( addressParam, erc20abi, provider )
    const getTokenInfo= useCallback(async () => {
        const stableSymbol = await StableContract.symbol()
        const assetSymbol = await AssetContract.symbol()
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

    const fetchZillowData = () => {
        axios.get(`${tokenData.airbnbData}`)
        .then(function (response) {
            setZillowData(response.data[0])
        })
    }


    return (
        <div className="full-screen-center text-align-center">
            {loading
                ? <Spin tip="loading" size="large" />
                : <div className="m20">
                    <div className="m20" />
                    <Typography.Title level={2}>Asset Details</Typography.Title>
                    <div className='text-medium text-gray'>
                        <div className="flex-center w300 mAuto">
                            <ImageGallery 
                                showFullscreenButton={false}
                                showPlayButton={false}
                                originalWidth={200}
                                renderRightNav = {(onClick, disabled) => (
                                    <div 
                                    className="image-gallery-icon image-gallery-right-nav text-white bold txt-xl"
                                        onClick={onClick} 
                                        disabled={disabled}>▷</div>
                                  )}
                                renderLeftNav = {(onClick, disabled) => (
                                    <div 
                                    className="image-gallery-icon image-gallery-left-nav text-white bold txt-xl"
                                        onClick={onClick} 
                                        disabled={disabled}>◁</div>
                                  )}
                                items={tokenData.images.map(image=>{
                                    return {
                                        original:image,
                                        thumbnail: image
                                    }
                                })} 
                            />
                        </div>
                        <Typography.Title level={4}>Pricing</Typography.Title>
                        <Progress percent={100} success={{ percent: 60 }} showInfo={false} />
                        <div className="flex-center">
                            <Tooltip title="L£GT" color="green" open placement="left">
                                <Alert message="400,000" type="success" className="mr20" />
                            </Tooltip>
                            <Tooltip title="ZILLOW " color="blue" open placement="right">
                                <Alert message="300,000" type="info" />
                            </Tooltip> 
                        </div>
                        {/* {readable(tokenData)} */}
                        {readable(zillowData)}
                    </div>
                    <div className='flex word-break justify-content-center'>{data
                    .filter(asset => Number(asset.token0Reserves) || Number(asset.token1Reserves))
                    .map(asset =>
                    <div key={asset.lpAddresses} >
                            {/* <button onClick={fetchZillowData}>Zillow Call</button> */}
                            <Card title={`${network} uniswap`} className="mt20" >
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`https://app.uniswap.org/#/swap?inputCurrency=${stable}&outputCurrency=${addressParam}`}>
                                    <button>{`${tokenInfo[0]} / ${tokenInfo[1]} ⇗`}</button>
                                </a>
                                {readable(asset)}
                            </Card>
                        </div>
                    )}</div>
                </div>}

        </div>
    );
}

export default Liquidity;
