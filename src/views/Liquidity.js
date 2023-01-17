import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from "ethers";
import addresses from '../helpers/addresses.json'
import readable from '../helpers/readable'
import { useParams } from "react-router-dom";
import { List, Card, Tooltip, Alert, Typography, Progress, Spin, Collapse } from 'antd';
import axios from 'axios';
import { getPriceUniswapV3, queryFactoryForLPUniV3 } from '@thanpolas/uniswap-chain-queries'
import ImageGallery from 'react-image-gallery';
import erc20abi from '../data/erc20abi';
const { Panel } = Collapse;

function Liquidity() {
    const network = process.env.REACT_APP_NETWORK
    const networkData = require(`../data/${network}`)
    const { addressParam } = useParams();
    const tokenData = require(`../data/${networkData.symbol}:${addressParam}`).default
    const [data, setData] = useState([]);
    const [tokenInfo, setTokenInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const provider = ethers.getDefaultProvider(network, { alchemy: process.env.REACT_APP_ALCHEMY_KEY_GOERLI })
    const stable = addresses[network].stable
    const StableContract = new ethers.Contract(stable, erc20abi, provider)
    const AssetContract = new ethers.Contract(addressParam, erc20abi, provider)
    // our internal variables for zillow price, dao price, liquidation etc
    const [{ zestimate, price, ...zillowData }, setZillowData] = useState([]);
    const priceDifference = (price - zestimate) / zestimate
    const priceRatio = zestimate / price

    const getTokenInfo = useCallback(async () => {
        const stableSymbol = await StableContract.symbol()
        const assetSymbol = await AssetContract.symbol()
        // todo: put in a bunch of other data from NFT
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
        // todo: add in more info on token pair, cross-chain support possibly
    }, [stable, addressParam])

    useEffect(() => {
        setLoading(true)
        async function dataFetch() { setData(await getData()) }
        async function tokenFetch() { setTokenInfo(await getTokenInfo()) }
        tokenFetch()
        dataFetch()
        fetchZillowData()
    }, [getData]);

    const fetchZillowData = () => {
        axios.get(`${tokenData.airbnbData}`)
            .then(function (response) {
                setZillowData(response.data[0])
            })
    }

    const dollarString = (number) => new Intl.NumberFormat('usd', { style: 'currency', currency: 'USD' }).format(number).replace(/\D00(?=\D*$)/, '')

    return (
        <div className="full-screen-center text-align-center">
            {loading
                ? <Spin tip="loading" size="large" />
                : <div className="m20">
                    <div className="m20" />
                    <Typography.Title level={2}>Asset Details</Typography.Title>
                    <div className='text-medium text-gray mb40'>
                        {/* image section */}
                        <div className="flex-center w300 mAuto">
                            <ImageGallery
                                showFullscreenButton={false}
                                showPlayButton={false}
                                originalWidth={200}
                                renderRightNav={(onClick, disabled) => (<div className="image-gallery-icon image-gallery-right-nav text-white bold txt-xl" onClick={onClick} disabled={disabled}>▷</div>)}
                                renderLeftNav={(onClick, disabled) => (<div className="image-gallery-icon image-gallery-left-nav text-white bold txt-xl" onClick={onClick} disabled={disabled}>◁</div>)}
                                items={tokenData.images.map(image => {
                                    return { original: image, thumbnail: image }
                                })}
                            />
                        </div>
                        {/* pricing graph */}
                        <div className="flex-center mt80">
                            <div className="w500 relative">
                                <Alert className="absolute left bottom30" message={<div>ZILLOW <strong>{dollarString(zestimate)}</strong></div>} type="info" />
                                <Progress
                                    trailColor="#52c41a"
                                    strokeColor="blue"
                                    percent={priceRatio * 100}
                                    showInfo={false}
                                />
                                <Tooltip className="absolute right bottom30" title={'+ ' + Number(priceDifference.toFixed(2)) * 100 + '%'} color="green" defaultOpen placement="right">
                                    <Alert message={<div>L£GT <strong>{dollarString(price)}</strong></div>} type="success" />
                                </Tooltip>
                            </div>
                        </div>
                        {/* data section */}
                        <Collapse defaultActiveKey={['1']}>
                            <Panel header="Token Data" key="1">
                                {/* {readable(tokenData)} */}
                                <List
                                    bordered
                                    size="small"
                                    dataSource={Object.entries(tokenData).map(([key, value]) =>
                                        key + " : " + value
                                    )}
                                    renderItem={(item) => <List.Item>{item}</List.Item>}
                                />
                            </Panel>
                            <Panel header="Real Estate Data" key="2">
                                {readable({ ...zillowData })}
                                <button onClick={fetchZillowData}>Zillow Call</button>
                            </Panel>
                            <Panel header="AMM Data" key="3">
                                <div className='flex word-break justify-content-center'>{data
                                    .filter(asset => Number(asset.token0Reserves) || Number(asset.token1Reserves))
                                    .map(asset =>
                                        <div key={asset.lpAddresses} >
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
                            </Panel>
                        </Collapse>
                    </div>
                </div>}
        </div>
    );
}

export default Liquidity;
