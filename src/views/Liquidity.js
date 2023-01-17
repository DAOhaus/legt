import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from "ethers";
import _ from 'lodash';
import addresses from '../helpers/addresses.json'
import dollarString from '../helpers/dollarString'
import { useParams } from "react-router-dom";
import { List, Tooltip, Alert, Typography, Progress, Spin, Collapse } from 'antd';
import axios from 'axios';
import { getPriceUniswapV3, queryFactoryForLPUniV3 } from '@thanpolas/uniswap-chain-queries'
import ImageGallery from 'react-image-gallery';
import erc20abi from '../data/erc20abi';
import { LinkOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

function Liquidity() {
    const network = process.env.REACT_APP_NETWORK
    const [data, setData] = useState([]);
    const [tokenInfo, setTokenInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [{ zestimate, price, ...zillowData }, setZillowData] = useState([]);
    const { addressParam } = useParams();
    // chain meta info
    const networkData = require(`../data/${network}`)
    const tokenData = require(`../data/${networkData.symbol}:${addressParam}`).default
    const provider = ethers.getDefaultProvider(network, { alchemy: process.env.REACT_APP_ALCHEMY_KEY_GOERLI })
    const stable = addresses[network].stable
    // contracts
    const StableContract = new ethers.Contract(stable, erc20abi, provider)
    const AssetContract = new ethers.Contract(addressParam, erc20abi, provider)
    // internal variables - zillow price, dao price, liquidation etc
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
        axios.get(`${tokenData.tokenAssetDataLink}`).then(function (response) { setZillowData(response.data[0]) })
        async function dataFetch() { setData(await getData()) }
        async function tokenFetch() { setTokenInfo(await getTokenInfo()) }
        tokenFetch()
        dataFetch()
    }, [getData]);

    // format data for Panels
    const dataGroups = _.groupBy( Object.entries(tokenData), ([key, value]) => key.toLowerCase().includes("link"));
    _.remove(dataGroups.true, ([key]) => key.includes("tokenAssetDataLink") || key.includes("imageLinks"))

    return (
        <div className="full-screen-center text-align-center">
            {loading
                ? <Spin tip="loading" size="large" />
                : <div className="m20">
                    {/* £ */}
                    <div className="m20" />
                    <div className='text-medium text-gray mb40'>
                        {/* image section */}
                        <div className="flex-center w300 mAuto">
                            <ImageGallery
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showBullets
                                showThumbnails={false}
                                renderRightNav={(onClick, disabled) => (<div className="image-gallery-icon image-gallery-right-nav text-white bold txt-xl" onClick={onClick} disabled={disabled}>▷</div>)}
                                renderLeftNav={(onClick, disabled) => (<div className="image-gallery-icon image-gallery-left-nav text-white bold txt-xl" onClick={onClick} disabled={disabled}>◁</div>)}
                                // todo: move imageLinks into NFT data, not token data
                                items={tokenData.imageLinks.map(image => {
                                    return { original: image, thumbnail: image }
                                })}
                            />
                        </div>
                        {/* pricing graph */}
                        <div className="flex-center mt80">
                            <div className="w500 relative">
                                <Alert className="absolute left bottom30" message={<div>ZILLOW <strong>{dollarString(zestimate)}</strong></div>} type="info" />
                                <Progress
                                    status="active"
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
                        <Collapse className="mt40">
                            <Panel header={<Typography.Title className="absolute left right m0" level={5}> Token Data </Typography.Title>} key="1">
                                <List
                                    bordered
                                    size="small"
                                    dataSource={dataGroups.false}
                                    renderItem={([key, value]) =>
                                        <List.Item key>
                                            {key}: <strong>{_.isArray(value)
                                                ? value.map((item, i) => i == 0 ? item + ', ' : item)
                                                : value
                                            }</strong>
                                        </List.Item>
                                    }
                                />
                                <List
                                    dataSource={_.remove(dataGroups.true,
                                        ([key]) => key == "tokenAssetDataLink" || "imageLinks"
                                    )}
                                    renderItem={([key, value]) => (
                                        <List.Item
                                            key
                                            className="flex justify-content-center"
                                            extra={_.isArray(value)
                                                ? <div className="ml10">
                                                    {
                                                        value.map((value) =>
                                                            <a target="_blank" href={value}><LinkOutlined /></a>)
                                                    }
                                                </div>
                                                : undefined
                                            }
                                        >
                                            {_.isArray(value)
                                                ? <div>{key}</div>
                                                : <a target="_blank" href={value}>{key}</a>
                                            }
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                            <Panel header={<Typography.Title className="m0 absolute left right" level={5}> Real Estate Data </Typography.Title>} key="2">
                                <List
                                    size="small"
                                    dataSource={Object.entries(zillowData)}
                                    renderItem={([key, value], i) =>
                                        <List.Item key className="justify-content-center flex">
                                            <Paragraph className="m0 w300" ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                                {key}: <strong>{_.isArray(value)
                                                    ? value.map((item, i) => i == 0 ? item + ', ' : item)
                                                    : _.isObject(value)
                                                        ? Object.entries(value).map(([key, item]) => <p>{key}:{item}</p>)
                                                        : value
                                                }</strong>
                                            </Paragraph>
                                        </List.Item>
                                    }
                                />
                            </Panel>
                            <Panel header={<Typography.Title className="m0 absolute left right" level={5}> AMM Data </Typography.Title>} key="3">
                                <div className='flex word-break justify-content-center'>{data
                                    .filter(asset => Number(asset.token0Reserves) || Number(asset.token1Reserves))
                                    .map(asset =>
                                        <div key={asset.lpAddresses} >
                                            <List
                                                bordered
                                                size="small"
                                                dataSource={Object.entries(asset)}
                                                renderItem={([key, value], i) =>
                                                    <List.Item key className="justify-content-center flex">
                                                        {key}: <strong>{_.isArray(value)
                                                            ? value.map((item, i) => i == 0 ? item + ', ' : item)
                                                            : _.isObject(value)
                                                                ? Object.entries(value).map(([key, item]) => <p>{key}:{item}</p>)
                                                                : value
                                                        }</strong>
                                                    </List.Item>
                                                }
                                            />
                                            <List
                                            dataSource={[1]}
                                            renderItem={()=><List.Item className="justify-content-center flex"><a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={`https://app.uniswap.org/#/swap?inputCurrency=${stable}&outputCurrency=${addressParam}`}>
                                                {`${tokenInfo[0]} / ${tokenInfo[1]} Pool`}
                                            </a></List.Item>}
                                            />

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
