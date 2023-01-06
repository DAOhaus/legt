import './App.css';
import './shorthand.css';
import { Link } from "react-router-dom";

console.log(`${process.env.REACT_APP_VERSION} ${JSON.stringify(process.env)}`)

function App() {
  return (
    <div className="full-screen-center text-align-center">
      <div className="m20">
        L <span style={{color:"red"}}>£</span> G T
        <br></br>
        <p className='text-medium text-gray'>
          legal governance tokens
          <br></br>
          defi protocol
          collateralizing real world assets
          <br></br>
          <br></br>
        </p>
        <div className='text-medium text-gray'>
          <div>handles real world cataclystic events</div>
          <div>applies jurisdictional compliance</div>
          <div>resolve on-chain disputes</div>
          <div>new financial products</div>
        </div>
          <div className="m30"></div>
          <div className="mb60">
            <button data-tf-popup="FUQh12hl" data-tf-size="70" data-tf-iframe-props="title=Mint Questionaire" data-tf-medium="snippet" >Start Mint</button>
            <div className="m10"></div>
            <div className="m10"></div>
            <Link to='https://testnets.opensea.io/LGTNFT'><button>NFT Examples</button></Link>
            <div className="m10"></div>
            <Link to='/liquidity/0x79860c21220938a249a26ddc4616adf18efce5cf'><button>Liquidity Example</button></Link>
            <div className="m10"></div>
            <a target="blank" href="https://legt.gitbook.io"><button>View Documentation</button></a>
          </div>
        <div className='text-medium text-gray-light'>v{process.env.REACT_APP_VERSION}</div>
      </div>
    </div>
  );
}

export default App;
