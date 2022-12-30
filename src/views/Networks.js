import React from 'react';

function Networks() {
    return (
        <div className="full-screen-center text-align-center">
            <div className="m20">
                Goerli
                <div></div>
                <div className='mt40 text-align-center text-medium text-gray'>
                    <p><a href="https://goerli.etherscan.io/address/0x4Fd10Cb0969776029AefA8B5CDfba584C0778D97">DAO</a></p>
                    <p><a href="https://goerli.etherscan.io/tx/0xf0a711a6cedc873ed978831bd76d0d647db3486006d6aa8509686962a48bd08a">Asset</a></p>
                    <p><a href="https://goerli.etherscan.io/tx/0xc67b39f054c0eb67dafda95bdf1d69f3f3378895b6f9291b5910d3cd66649ac8">Stable Token</a></p>
                    <p><a href="https://goerli.etherscan.io/token/0x9cefe40f0cf6fa1e18ca0507ce8f26ee6bec05df">NFT Factory</a></p>
                    <p><a href="https://goerli.etherscan.io/tx/0x16014122ea63ddb438ba43586934905aad63c6c97f0c71400526543cdf11b6b1">Liquidity Pool</a><a href="https://app.uniswap.org/#/pool/47647">↗️</a></p>
                    <p><a href="https://goerli.etherscan.io/address/0x1be39aef1192ac142698f0979031265b23b8fd58">Distrobution Wrapper</a></p>
                </div>
            </div>
        </div>
    );
}

export default Networks;
