import React, { useState } from "react"
import { useAnchorProvider } from "@/components/Solana/solana-provider"
import { Transaction, PublicKey } from "@solana/web3.js"
import idl from "@/anchor/idl.json"
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token"
import { buytoken } from "@/utilis/buy"
import {
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Share2,
  ShoppingCart,
  Users,
  Wallet,
  ArrowRight,
  CheckIcon,
} from "lucide-react"
import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react"
// import { buytoken } from "@/utilis/buy"

const CreatorProfile = () => {
  const provider = useAnchorProvider()
  const [buyAmount, setBuyAmount] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false)

  // Mock creator data - in a real app, fetch this from your backend
  const creator = {
    name: "Alex Thompson",
    username: "@alexcreates",
    bio: "Digital artist and creator exploring the intersection of art and technology. Building a community of creative minds.",
    followers: 2547,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=3270&auto=format&fit=crop",
    socials: {
      twitter: "https://twitter.com/alexcreates",
      instagram: "https://instagram.com/alexcreates",
      youtube: "https://youtube.com/alexcreates",
    },
    token: {
      name: "CREATOR",
      symbol: "CRT",
      mint: "2ZSNQk3mBa6Zhd7ddCpK7cexTgdtptsKc5KJ6VFhorzM", // Replace with actual mint address
      price: 0.05, // SOL
      holders: 428,
      marketCap: 52500,
      supply: 5,
      image:
        "https://images.unsplash.com/photo-1660062993887-4938423dce59?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  }

  const handleBuyToken = async () => {
    if (!provider?.wallet?.publicKey || !buyAmount) return
    const connection = provider.connection
    const wallet = provider.wallet

    setIsLoading(true)
    const mint = new PublicKey("2ZSNQk3mBa6Zhd7ddCpK7cexTgdtptsKc5KJ6VFhorzM")
    const iaddress = new PublicKey(idl.address)

    const [vaultAuthority] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault_authority"), wallet.publicKey.toBuffer()],
      iaddress
    )

    const vaultTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      provider.wallet.payer,
      mint,
      vaultAuthority,
      true, // allow off-curve PDA
      undefined,
      undefined,
      TOKEN_PROGRAM_ID // 👈 make sure this matches the one used in Rust
    )
    console.log("valutoken account", vaultTokenAccount)

    try {
      // Call our buytoken utility function with the mint address and amount
      const txSignature = await buytoken(buyAmount, connection, wallet)
      console.log("Transaction signature:", txSignature)

      // Set purchase success state
      setPurchaseSuccess(true)
    } catch (error) {
      console.error("Error buying token:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Cover Photo */}
      <div className="h-64 w-full overflow-hidden relative">
        <img
          src={creator.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{creator.name}</h1>
            <p className="text-cyan-400">{creator.username}</p>
            <p className="mt-2 text-gray-300 max-w-2xl">{creator.bio}</p>

            <div className="flex items-center mt-4 space-x-6">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <span>
                  <span className="font-semibold">
                    {creator.followers.toLocaleString()}
                  </span>{" "}
                  followers
                </span>
              </div>
              <a
                href={creator.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href={creator.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href={creator.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="md:ml-auto">
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full hover:from-purple-600 hover:to-cyan-600 transition-all">
              Follow
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-gray-300">
              I'm a digital artist with a passion for creating immersive
              experiences that blend traditional art forms with cutting-edge
              technology. With over 7 years of experience in digital
              illustration and 3D modeling, I'm focused on building a community
              where creators can collaborate, learn from each other, and push
              the boundaries of digital art.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                Digital Art
              </span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                3D Design
              </span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                Animation
              </span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                Web3
              </span>
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Latest Content</h2>

            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
                  alt="Content"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-gray-700">
                  <h3 className="font-medium text-lg">
                    Exploring Digital Landscapes
                  </h3>
                  <p className="text-gray-300 mt-1">
                    My latest project exploring the boundaries between reality
                    and digital worlds.
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button className="flex items-center text-gray-300 hover:text-white">
                        <ThumbsUp className="h-5 w-5 mr-1" />
                        <span>142</span>
                      </button>
                      <button className="flex items-center text-gray-300 hover:text-white">
                        <MessageCircle className="h-5 w-5 mr-1" />
                        <span>28</span>
                      </button>
                      <button className="flex items-center text-gray-300 hover:text-white">
                        <Share2 className="h-5 w-5 mr-1" />
                      </button>
                    </div>
                    <span className="text-gray-400 text-sm">2 days ago</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
                  alt="Content"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-gray-700">
                  <h3 className="font-medium text-lg">
                    The Future of Creative Communities
                  </h3>
                  <p className="text-gray-300 mt-1">
                    Thoughts on how creator tokens are reshaping the
                    relationship between creators and fans.
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button className="flex items-center text-gray-300 hover:text-white">
                        <ThumbsUp className="h-5 w-5 mr-1" />
                        <span>89</span>
                      </button>
                      <button className="flex items-center text-gray-300 hover:text-white">
                        <MessageCircle className="h-5 w-5 mr-1" />
                        <span>12</span>
                      </button>
                      <button className="flex items-center text-gray-300 hover:text-white">
                        <Share2 className="h-5 w-5 mr-1" />
                      </button>
                    </div>
                    <span className="text-gray-400 text-sm">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Token Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={creator.token.image}
                    alt="Token"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{creator.token.name}</h2>
                  <p className="text-cyan-400">${creator.token.symbol}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3">
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="font-semibold">{creator.token.price} SOL</p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3">
                  <p className="text-gray-400 text-sm">Holders</p>
                  <p className="font-semibold">
                    {creator.token.holders.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3">
                  <p className="text-gray-400 text-sm">Market Cap</p>
                  <p className="font-semibold">
                    {creator.token.marketCap.toLocaleString()} SOL
                  </p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3">
                  <p className="text-gray-400 text-sm">Supply</p>
                  <p className="font-semibold">
                    {creator.token.supply.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Token Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-cyan-500 rounded-full p-1 mr-2 mt-1">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Access to exclusive content & community
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyan-500 rounded-full p-1 mr-2 mt-1">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Early access to new releases & projects
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyan-500 rounded-full p-1 mr-2 mt-1">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Monthly token holder events & workshops
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyan-500 rounded-full p-1 mr-2 mt-1">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Voting rights on future creative directions
                  </li>
                </ul>
              </div>

              {purchaseSuccess ? (
                <div className="mt-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4 text-center">
                  <CheckIcon className="h-10 w-10 mx-auto text-green-500 mb-2" />
                  <h3 className="text-lg font-medium text-green-400">
                    Purchase Successful!
                  </h3>
                  <p className="text-gray-300 mt-1">
                    You now own {buyAmount} {creator.token.symbol} tokens
                  </p>
                  <button
                    onClick={() => setPurchaseSuccess(false)}
                    className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    View My Tokens
                  </button>
                </div>
              ) : (
                <div className="mt-6">
                  <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="amount" className="font-medium">
                        Buy Amount
                      </label>
                      <span className="text-gray-400 text-sm">
                        Available: 10.5 SOL
                      </span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        id="amount"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(Number(e.target.value))}
                        className="flex-1 bg-gray-800 border border-gray-600 rounded-l-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        min="1"
                      />
                      <div className="bg-gray-800 border border-gray-600 border-l-0 rounded-r-lg py-2 px-3 text-gray-400">
                        {creator.token.symbol}
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-400">
                      <span>
                        Price: {(buyAmount * creator.token.price).toFixed(2)}{" "}
                        SOL
                      </span>
                      <span>
                        ≈ ${(buyAmount * creator.token.price * 100).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleBuyToken}
                    disabled={isLoading || !provider?.wallet?.publicKey}
                    className={`mt-4 w-full py-3 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all ${
                      isLoading || !provider?.wallet?.publicKey
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isLoading ? (
                      <span>Processing...</span>
                    ) : !provider?.wallet?.publicKey ? (
                      <span>Connect Wallet to Buy</span>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        <span>Buy Token</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="mt-4">
                <a
                  href={`https://explorer.solana.com/address/${creator.token.mint}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center justify-center"
                >
                  View on Solana Explorer
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Community Updates</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-cyan-400 pl-4">
                <p className="text-sm text-gray-300">
                  Just released our community roadmap for Q3! Token holders get
                  early access to our upcoming collaborative project.
                </p>
                <p className="text-gray-400 text-xs mt-1">2 days ago</p>
              </div>
              <div className="border-l-2 border-cyan-400 pl-4">
                <p className="text-sm text-gray-300">
                  Creator Spotlight session this Friday at 5 PM EST. Join us to
                  showcase your work to the community!
                </p>
                <p className="text-gray-400 text-xs mt-1">5 days ago</p>
              </div>
              <div className="border-l-2 border-cyan-400 pl-4">
                <p className="text-sm text-gray-300">
                  The community treasury has funded its first creator grant!
                  Congratulations to @designermarco!
                </p>
                <p className="text-gray-400 text-xs mt-1">1 week ago</p>
              </div>
            </div>
            <button className="mt-4 w-full text-center text-sm text-cyan-400 hover:text-cyan-300">
              View All Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorProfile
