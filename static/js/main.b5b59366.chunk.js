(this.webpackJsonplegt=this.webpackJsonplegt||[]).push([[0],{101:function(e){e.exports=JSON.parse('{"uniswapFactory":"0x1F98431c8aD98523631AE4a59f267346ea31F984","goerli":{"asset":"0x79860c21220938a249a26ddc4616adf18efce5cf","stable":"0x02d51816e23999389ff919b48e10eb2a0756d8d5","legalNFT":["0x5b9ae6234cf1e447680c245200e066091e631bf3","186"]},"mainnet":{}}')},146:function(e,t,c){},147:function(e,t,c){},148:function(e,t,c){},158:function(e,t){},167:function(e,t){},195:function(e,t,c){"use strict";c.r(t);var n=c(0),r=c.n(n),a=c(37),s=c.n(a),i=(c(146),c(147),c(148),c(61)),d=c(14);var l=function(){return Object(d.jsx)("div",{className:"full-screen-center text-align-center",children:Object(d.jsxs)("div",{className:"m20",children:["L ",Object(d.jsx)("span",{style:{color:"red"},children:"\xa3"})," G T",Object(d.jsx)("br",{}),Object(d.jsxs)("p",{className:"text-medium text-gray",children:["legal governance tokens",Object(d.jsx)("br",{}),"defi protocol collateralizing real world assets",Object(d.jsx)("br",{}),Object(d.jsx)("br",{})]}),Object(d.jsxs)("div",{className:"text-medium text-gray",children:[Object(d.jsx)("div",{children:"handles real world cataclystic events"}),Object(d.jsx)("div",{children:"applies jurisdictional compliance"}),Object(d.jsx)("div",{children:"resolve on-chain disputes"}),Object(d.jsx)("div",{children:"new financial products"})]}),Object(d.jsx)("div",{className:"m30"}),Object(d.jsxs)("div",{children:[Object(d.jsx)("button",{"data-tf-popup":"FUQh12hl","data-tf-size":"70","data-tf-iframe-props":"title=Mint Questionaire","data-tf-medium":"snippet",children:"Start Mint"}),Object(d.jsx)("div",{className:"m10"}),Object(d.jsx)("div",{className:"m10"}),Object(d.jsx)(i.b,{to:"https://testnets.opensea.io/LGTNFT",children:Object(d.jsx)("button",{children:"NFT Examples"})}),Object(d.jsx)("div",{className:"m10"}),Object(d.jsx)(i.b,{to:"/liquidity/0x79860c21220938a249a26ddc4616adf18efce5cf",children:Object(d.jsx)("button",{children:"Liquidity Example"})}),Object(d.jsx)("div",{className:"m10"}),Object(d.jsx)("a",{target:"blank",href:"https://legt.gitbook.io",children:Object(d.jsx)("button",{children:"View Documentation"})})]})]})})};var o=function(){return Object(d.jsx)("div",{className:"full-screen-center text-align-center",children:Object(d.jsxs)("div",{className:"m20",children:["Goerli",Object(d.jsx)("div",{}),Object(d.jsxs)("div",{className:"mt40 text-align-center text-medium text-gray",children:[Object(d.jsx)("p",{children:Object(d.jsx)("a",{href:"https://goerli.etherscan.io/address/0x4Fd10Cb0969776029AefA8B5CDfba584C0778D97",children:"DAO"})}),Object(d.jsx)("p",{children:Object(d.jsx)("a",{href:"https://goerli.etherscan.io/tx/0xf0a711a6cedc873ed978831bd76d0d647db3486006d6aa8509686962a48bd08a",children:"Asset"})}),Object(d.jsx)("p",{children:Object(d.jsx)("a",{href:"https://goerli.etherscan.io/tx/0xc67b39f054c0eb67dafda95bdf1d69f3f3378895b6f9291b5910d3cd66649ac8",children:"Stable Token"})}),Object(d.jsx)("p",{children:Object(d.jsx)("a",{href:"https://goerli.etherscan.io/token/0x9cefe40f0cf6fa1e18ca0507ce8f26ee6bec05df",children:"NFT Factory"})}),Object(d.jsxs)("p",{children:[Object(d.jsx)("a",{href:"https://goerli.etherscan.io/tx/0x16014122ea63ddb438ba43586934905aad63c6c97f0c71400526543cdf11b6b1",children:"Liquidity Pool"}),Object(d.jsx)("a",{href:"https://app.uniswap.org/#/pool/47647",children:"\u2197\ufe0f"})]}),Object(d.jsx)("p",{children:Object(d.jsx)("a",{href:"https://goerli.etherscan.io/address/0x1be39aef1192ac142698f0979031265b23b8fd58",children:"Distrobution Wrapper"})})]})]})})},j=c(3),b=c.n(j),u=c(27),x=c(18),f=c(56),h=c(101),p=c(15),O=c(200),m=c(102),v=["function balanceOf(address owner) view returns (uint256)","function decimals() view returns (uint8)","function symbol() view returns (string)","function transfer(address to, uint amount) returns (bool)","event Transfer(address indexed from, address indexed to, uint amount)"];var g=function(){var e="goerli",t=Object(p.n)().addressParam,c=Object(n.useState)([]),r=Object(x.a)(c,2),a=r[0],s=r[1],i=Object(n.useState)([]),l=Object(x.a)(i,2),o=l[0],j=l[1],g=Object(n.useState)(!1),w=Object(x.a)(g,2),y=w[0],N=w[1],k=f.ethers.getDefaultProvider(e,{alchemy:"Sv8WnxBKAejecAItK_NBNDijkqz2H0wB"}),F=h.goerli.stable,C=new f.ethers.Contract(F,v,k),T=new f.ethers.Contract(t,v,k),D=Object(n.useCallback)(Object(u.a)(b.a.mark((function e(){var t,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.symbol();case 2:return t=e.sent,e.next=5,T.symbol();case 5:return c=e.sent,e.abrupt("return",[t,c]);case 7:case"end":return e.stop()}}),e)})))),P=Object(n.useCallback)(Object(u.a)(b.a.mark((function e(){var c,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(m.queryFactoryForLPUniV3)(h.uniswapFactory,k,[F,t]);case 2:return c=e.sent,e.next=5,Promise.all(c.map(function(){var e=Object(u.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(m.getPriceUniswapV3)(t,k,[18,18]));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 5:return n=e.sent,N(!1),e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)}))),[F,t]);return Object(n.useEffect)((function(){function e(){return(e=Object(u.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=s,e.next=3,P();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function t(){return(t=Object(u.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=j,e.next=3,D();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}N(!0),function(){t.apply(this,arguments)}(),function(){e.apply(this,arguments)}()}),[P]),Object(d.jsx)("div",{className:"full-screen-center text-align-center",children:y?"loading...":Object(d.jsxs)("div",{className:"m20",children:[Object(d.jsx)("div",{className:"m20"}),Object(d.jsx)("div",{className:"flex word-break",children:a.filter((function(e){return Number(e.token0Reserves)||Number(e.token1Reserves)})).map((function(c){return Object(d.jsx)("div",{children:Object(d.jsxs)(O.a,{title:"".concat(e," uniswap"),children:[Object(d.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://app.uniswap.org/#/swap?inputCurrency=".concat(F,"&outputCurrency=").concat(t),children:Object(d.jsx)("button",{children:"".concat(o[0]," / ").concat(o[1]," \u21d7")})}),Object.entries(c).map((function(e){var t=Object(x.a)(e,2),c=t[0],n=t[1];return Object(d.jsx)("p",{children:"".concat(c,": ").concat(n)},c)}))]})},c.lpAddresses)}))})]})})},w=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,201)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;c(e),n(e),r(e),a(e),s(e)}))};s.a.render(Object(d.jsxs)(r.a.StrictMode,{children:[Object(d.jsx)(i.a,{children:Object(d.jsxs)(p.c,{children:[Object(d.jsx)(p.a,{path:"/networks",element:Object(d.jsx)(o,{})}),Object(d.jsx)(p.a,{path:"/liquidity/:addressParam",element:Object(d.jsx)(g,{})}),Object(d.jsx)(p.a,{path:"/",element:Object(d.jsx)(l,{})})]})}),","]}),document.getElementById("root")),w()}},[[195,1,2]]]);
//# sourceMappingURL=main.b5b59366.chunk.js.map