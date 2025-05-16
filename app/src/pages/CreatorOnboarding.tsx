import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Wallet, User, Upload, Zap, Check, CheckIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const CreatorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // Step data for the progress indicator
  const steps = [
    { id: 1, name: "Connect Wallet", icon: Wallet },
    { id: 2, name: "Set Up Profile", icon: User },
    { id: 3, name: "Upload Content", icon: Upload },
    { id: 4, name: "Finalize Profile", icon: Check },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Animated background gradient */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-cyan-500 to-purple-600 blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-indigo-500 to-pink-600 blur-3xl opacity-20"></div>
      </div>

      {/* Header with progress steps */}
      <header className="relative z-10 border-b border-gray-800 bg-black bg-opacity-60 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Navbar />
            </div>
          </div>

          <div className="flex justify-center w-full mt-20">
            <div className="flex items-center">
              {steps.map((step, stepIdx) => (
                <div key={step.id} className="relative flex items-center">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>

                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </span>

                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={`h-0.5 w-16 mx-4 ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                          : "bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-grow container mx-auto px-4 py-8">
        {currentStep === 1 && <WalletConnectStep onNext={handleNext} />}
        {currentStep === 2 && (
          <ProfileSetupStep onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 3 && (
          <ContentUploadStep onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 4 && <FinalizeProfileStep onBack={handleBack} />}
      </main>

      <footer className="relative z-10 border-t border-gray-800 py-6 bg-black bg-opacity-60 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Creator Studio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const WalletConnectStep = ({ onNext }) => {
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)

  const handleConnect = () => {
    setConnecting(true)

    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
      setTimeout(onNext, 1000)
    }, 1500)
  }

  const wallets = [
    { name: "MetaMask", icon: "🦊" },
    { name: "Coinbase Wallet", icon: "💰" },
    { name: "WalletConnect", icon: "🔗" },
    { name: "Phantom", icon: "👻" },
  ]

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400">
            Connect your crypto wallet to begin setting up your creator profile
          </p>
        </div>

        <div className="space-y-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={handleConnect}
              disabled={connecting || connected}
              className={`w-full flex items-center justify-between p-4 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all ${
                connecting || connected
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{wallet.icon}</span>
                <span>{wallet.name}</span>
              </div>
              {connected && wallet.name === "MetaMask" ? (
                <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                  Connected
                </span>
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </button>
          ))}
        </div>

        {connecting && (
          <div className="mt-6 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-400">Connecting to wallet...</p>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          By connecting, you agree to our
          <a href="#" className="text-cyan-500 hover:text-cyan-400 mx-1">
            Terms of Service
          </a>
          and
          <a href="#" className="text-cyan-500 hover:text-cyan-400 mx-1">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  )
}

const ProfileSetupStep = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
    Youtube: "",
    YoutubeUrl: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    onNext()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Set Up Your Profile
        </h2>

        <div>
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="h-28 w-28 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 p-2 rounded-full">
                  <Upload className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pl-8 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Tell your audience about yourself..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Youtube
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    @
                  </span>
                  <input
                    type="text"
                    name="Youtube"
                    value={formData.Youtube}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pl-8 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter Your Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Instagram
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    @
                  </span>
                  <input
                    type="text"
                    name="YoutubeUrl"
                    value={formData.YoutubeUrl}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pl-8 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter Your Youtube Url"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-8 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium"
            >
              Continue
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 3: Content Upload
const ContentUploadStep = ({ onNext, onBack }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Upload Your Content
        </h2>
        
        <div className="mb-8">
          <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
            <p className="text-gray-400 mb-4">Or click to browse your files</p>
            <p className="text-gray-500 text-sm">
              Supported formats: JPG, PNG, GIF, MP4, MP3 (Max 100MB)
            </p>
            
            <button className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg text-white font-medium">
              Choose Files
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Content Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Give your content a title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Describe your content..."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Tags</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Add tags separated by commas"
              />
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-gray-700 mb-8">
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <Zap className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Monetize your content through your own token</h4>
              <p className="text-sm text-gray-300">
                After completing your profile setup, you'll launch your creator token so fans can invest in your success.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          
          <button
            onClick={onNext}
            className="flex items-center px-8 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium"
          >
            Continue
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 4: Finalize Profile
const FinalizeProfileStep = ({ onBack }) => {
  const [profileComplete, setProfileComplete] = useState(false);
  const [redirectToCreate, setRedirectToCreate] = useState(false);
  const navigate = useNavigate();
  
  const handleFinalize = () => {
    setProfileComplete(true);
  };

  const handleCreateToken = () => {
    // Navigate to token creation page
    navigate("/create");
    console.log("Navigating to token creation page");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Complete Your Creator Profile
        </h2>
        
        {!profileComplete ? (
          <>
            <div className="mb-8">
              <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 mb-6">
                <h3 className="text-lg font-medium mb-4">Profile Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Creator name:</span>
                    <span className="text-white font-medium">Alex Thompson</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Username:</span>
                    <span className="text-white font-medium">@alexcreates</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Content uploads:</span>
                    <span className="text-white font-medium">3 files</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-xl bg-gray-800 border border-gray-700">
                <h3 className="text-lg font-medium mb-4">Creator Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300">Launch your own creator token on Solana</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300">Attract investment from fans who believe in your content</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300">Grow your community through token-based incentives</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300">Enable subscribers to invest directly in your success</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={onBack}
                className="flex items-center px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              
              <button
                onClick={handleFinalize}
                className="flex items-center px-8 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium"
              >
                Complete Profile
                <Check className="h-5 w-5 ml-2" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mb-6">
              <Check className="h-12 w-12 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
            <p className="text-gray-400 mb-8">
              Your creator profile has been successfully set up.
              <br />You're now ready to launch your token and attract investors!
            </p>
            
            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-gray-700 mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Zap className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-2 text-center">Ready to launch your Creator Token?</h4>
              <p className="text-gray-400 text-center mb-4">
                Create your own token on Solana and let fans invest in your growth story.
              </p>
              
              <button 
                onClick={handleCreateToken}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium flex items-center justify-center"
              >
                Create Your Token
                <Zap className="h-5 w-5 ml-2" />
              </button>
            </div>
            
            <button 
              className="px-8 py-3 rounded-lg border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium transition-colors"
            >
              Go to Creator Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorOnboarding;