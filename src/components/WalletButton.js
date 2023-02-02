import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, goerli } from "wagmi/chains";

function WalletButton() {
    const chains = [mainnet, polygon, goerli];

    // Wagmi client
    const { provider } = configureChains(chains, [
        walletConnectProvider({ projectId: process.env.REACT_APP_WALLET_CONNECT_ID }),
    ]);
    const wagmiClient = createClient({
        autoConnect: true,
        connectors: modalConnectors({ appName: "web3Modal", chains }),
        provider,
    });

    // Web3Modal Ethereum Client
    const ethereumClient = new EthereumClient(wagmiClient, chains);
    return (
        <WagmiConfig client={wagmiClient}>
            <Web3Modal
                projectId={process.env.REACT_APP_WALLET_CONNECT_ID}
                ethereumClient={ethereumClient}
                render={({ toggleModal }) => (
                    <button onClick={toggleModal}>Connect Wallet</button>
                )}
            />
        </WagmiConfig>
    );
}

export default WalletButton;
