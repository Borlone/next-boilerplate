import { useAccount } from "wagmi"
import { Account } from "./Account"
import { WalletOptions } from "./WalletOption"

export default function ConnectWallet() {
    const { isConnected } = useAccount()

    if (isConnected) return <Account />

    return <WalletOptions />
}