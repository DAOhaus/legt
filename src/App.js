import './App.css';
import './shorthand.css';
// import main from './createPool'

function App() {

  const createPool = () => {
    window.dataLayer.push({'event':'Pool Creation'})
    console.log("Pool being created!")
    // main()
  }
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
          <div>
            <a target="blank" href="https://legt.gitbook.io"><button>View Documentation</button></a>
            <div className="m10"></div>
            <button data-tf-popup="FUQh12hl" data-tf-size="70" data-tf-iframe-props="title=Mint Questionaire" data-tf-medium="snippet" >Start Mint</button>
            <div className="m10"></div>
            {/* {/* <button onClick={sendDoc} >Send Doc</button> */}
            <div className="m10"></div>
            <button onClick={createPool} >Create Pool</button>
          </div>
      </div>
    </div>
  );
}

export default App;
