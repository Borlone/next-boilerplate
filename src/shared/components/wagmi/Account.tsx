import { useAccount, useChainId, useDisconnect, useEnsAvatar, useEnsName, useWriteContract } from 'wagmi'
import {  utils, ethers } from "ethers"
import { ABI_ERC20 } from './erc20-abi'
import { createPublicClient, http } from 'viem'
import {  sepolia } from 'viem/chains'
const abi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'spender',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'approve',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    }
]

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const chainId = useChainId()

    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
    const { data: hash, writeContractAsync, writeContract } = useWriteContract()

    const handleApprove = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer =  provider.getSigner()
        
        // const contractToken = new ethers.Contract("0x2eA755250F9620a6C66B0Cd0D41740e3EaEc1765", abi, signer)
        // // const unitl = await contractToken.decimals()
        // const tx = await contractToken.approve("0x7Cea40f250Da7B53231DCb47FCCBB885Ccd6C824", utils.parseUnits("10",6))
        // await tx.wait()
        
        const publicClient = createPublicClient({
          chain: sepolia,
          transport: http()
        })
        // console.log(tx)
        const result = writeContractAsync({
            address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
            abi: ABI_ERC20,
            functionName: 'approve',
            args: ['0x7Cea40f250Da7B53231DCb47FCCBB885Ccd6C824', utils.parseUnits("10",6)],
            chain: sepolia,
            account: await signer.getAddress() as `0x${string}`,
          })
        // const tx = await writeContractAsync({
        //     address: '0x2eA755250F9620a6C66B0Cd0D41740e3EaEc1765',
        //     abi: ABI_ERC20, 
        //     functionName: 'approve',
        //     args: ['0x7Cea40f250Da7B53231DCb47FCCBB885Ccd6C824', utils.parseUnits("10",6)],
        //     chainId: chainId
        // })
        console.log("+++", result)
    }

    return (
        <div>
            {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
            {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
            <button onClick={() => disconnect()}>Disconnect</button>
            <button onClick={handleApprove}>Approve</button>
            {hash && <div>Transaction Hash: {hash}</div>}
        </div>
    )
}