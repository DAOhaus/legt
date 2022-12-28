import './App.css';
import './shorthand.css';
import * as pd_api from "pandadoc-node-client";
// const API_KEY = process.env.REACT_APP_DOC_API_KEY
const API_KEY = "55d6a0534100d0c9f34bd0e33893f0c3cc133f7b"
// const TEMPLATE_UUID = "SAKV4HSPc8iuY8BNxhS8En";
const TEMPLATE_UUID = "KDRA3wwKvMGPHXMC6274h4"
const CONTENT_LIBRARY_ITEM_ID = "vQ5TCsaFfdqBr8bFjmocqT";
// const MAX_CHECK_RETRIES = 5;
const configuration = pd_api.createConfiguration(
  { authMethods: { apiKey: `API-Key ${API_KEY}` } }
);


function App() {

  const listTemplates = () => {
    const templates = new pd_api.TemplatesApi(configuration);
    templates.listTemplates({ deleted: false }).then((data) => {
      console.log('API called successfully. Returned data: %o', data);
    }).catch((error) => console.error(error));
  }
  const sendDoc = async() => {
    const docs = new pd_api.DocumentsApi(configuration);
    const documentCreateRequest = docs.DocumentCreateRequest = {
      name: "API Sample Document from PandaDoc Template",
      templateUuid: TEMPLATE_UUID,
      // specify a folder uuid if you want to document to be created
      // in specific folder otherwise it will be created in root directory
      //
      // folderUuid: "YOUR_FOLDER_ID",
      recipients: [
        {
          email: "josh@example.com",
          firstName: "Josh",
          lastName: "Ron",
          role: "user",
          signingOrder: 1,
        },
      ],
      tokens: [
        {
          name: "Favorite.Pet",
          value: "Panda",
        },
      ],
      fields: {},
      metadata: {},
      tags: ["created_via_api", "test_document"],
      images: [
        {
          urls: [
            "https://s3.amazonaws.com/pd-static-content/public-docs/pandadoc-panda-bear.png",
          ],
          name: "Image 1",
        },
      ],
      // pricingTables: pricingTables,
      // contentPlaceholders: [
      //   {
      //     blockId: "Content Placeholder 1",
      //     contentLibraryItems: [
      //       {
      //         id: CONTENT_LIBRARY_ITEM_ID,
      //         // pricingTables: pricingTables,
      //       },
      //     ],
      //   },
      // ],
      url: "https://s3.amazonaws.com/pd-static-content/public-docs/pandadoc-panda-bear.png",
      parseFormFields: false,
    };
    const docToSend = await docs.createDocument({
      documentCreateRequest: documentCreateRequest,
    })
    console.log(docToSend)

    const body = docs.DocumentsApiSendDocumentRequest = {
      // string | Document ID
      id: "SAKV4HSPc8iuY8BNxhS8En",
      // DocumentSendRequest
      documentSendRequest: {
        message: "Hello! This document was sent from the PandaDoc API",
        subject: "Please check this test API document from PandaDoc",
        silent: true,
      },
    };

    docs.sendDocument(body).then((data) => {
      console.log('API called successfully. Returned data: %o', data);
    }).catch((error) => console.error(error));
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
            <div className="m10"></div>
            <button onClick={listTemplates} >List Templates</button>
          </div>
        </p>
      </div>
    </div>
  );
}

export default App;
