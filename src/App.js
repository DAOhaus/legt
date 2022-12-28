import './App.css';
import './shorthand.css';
import * as pd_api from "pandadoc-node-client";

// replace it with your API key
const API_KEY = "55d6a0534100d0c9f34bd0e33893f0c3cc133f7b";
const configuration = pd_api.createConfiguration(
    { authMethods: {apiKey: `API-Key ${API_KEY}`} }
);

const apiInstance = new pd_api.TemplatesApi(configuration);



function App() {

  const sendDoc = () => {
    console.log(apiInstance)
    apiInstance.listTemplates({ deleted: false }).then((data) => {
      console.log('API called successfully. Returned data: %o', data);
    }).catch((error) => console.error(error));
    // sdk.listDocuments({
    //   q: 'q',
    //   deleted: 'false',
    //   tag: 'tag',
    //   status: 'status',
    //   count: 'count',
    //   page: 'page',
    //   metadata: 'metadata',
    //   id: 'id',
    //   template_id: '{template_id}',
    //   folder_uuid: 'documents_folder_uuid',
    //   form_id: 'form_id',
    //   order_by: 'order_by',
    //   created_from: 'created_from',
    //   created_to: 'created_to',
    //   modified_from: 'modified_from',
    //   modified_to: 'modified_to',
    //   completed_from: 'completed_from',
    //   completed_to: 'completed_to',
    //   membership_id: ['membership_id', 'membership_id'],
    //   contact_id: 'contact_id'
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err));
  }
return (
  <div className="full-screen-center text-align-center">
    <div className="m20">
      L £ G T
      <br></br>
      <p className='text-medium text-gray'>
        legal governance tokens
        <br></br>
        defi protocol
        collateralizing real world assets
        <br></br>
        <br></br>
        <div>handles real world cataclystic events</div>
        <div>applies jurisdictional compliance</div>
        <div>resolve on-chain disputes</div>
        <div>new financial products</div>
        <div className="m30"></div>
        <div>
          <a target="blank" href="https://legt.gitbook.io"><button>View Documentation</button></a>
          <div className="m10"></div>
          <button data-tf-popup="FUQh12hl" data-tf-size="70" data-tf-iframe-props="title=Mint Questionaire" data-tf-medium="snippet" >Start Mint</button>
          <div className="m10"></div>
          <button onClick={sendDoc} >Send Doc</button>
        </div>
      </p>
    </div>
  </div>
);
}

export default App;
