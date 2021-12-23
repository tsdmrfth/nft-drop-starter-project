import React, { useEffect, useState } from 'react'
import './App.css'
import twitterLogo from './assets/twitter-logo.svg'
import CandyMachine from './CandyMachine'

const TWITTER_HANDLE = 'CChiklot'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

// candy machine pubkey: DMZLBHYzWQHEUaeYG3yFeRzxwgbXyz25FQjbGFpxd7Fp

const App = () => {
    const [walletAddress, setWalletAddress] = useState(null)

    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected()
        }
        window.addEventListener('load', onLoad)
        return () => window.removeEventListener('load', onLoad)
    }, [])

    const checkIfWalletIsConnected = async () => {
        try {
            const { solana } = window

            if (solana) {
                if (solana.isPhantom) {
                    const response = await solana.connect({ onlyIfTrusted: true })
                    setWalletAddress(response.publicKey.toString())
                }
            } else {
                alert('Solana object not found! Get a Phantom Wallet 👻')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderContent = () => {
        if (walletAddress) {
            return (
                <CandyMachine walletAddress={window.solana} />
            )
        }

        return (
            <button
                onClick={connectWallet}
                className="cta-button connect-wallet-button">
                Connect to Wallet
            </button>
        )
    }

    const connectWallet = async () => {
        const { solana } = window

        if (solana) {
            const response = await solana.connect()
            console.log('Connected with Public Key:', response.publicKey.toString())
            setWalletAddress(response.publicKey.toString())
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <p className="header">🐈 Cat NFTs</p>
                    <p className="sub-text">NFT drop machine with fair mint</p>
                    {renderContent()}
                </div>
                <div className="footer-container">
                    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo}/>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={TWITTER_LINK}
                        className="footer-text">
                        {`built by @${TWITTER_HANDLE}`}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default App
