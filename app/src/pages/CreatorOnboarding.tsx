import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Wallet, User, Upload, Zap, Check, CheckIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

const CreatorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Step data for the progress indicator
  const steps = [
    { id: 1, name: "Connect Wallet", icon: Wallet },
    { id: 2, name: "Set Up Profile", icon: User },
    { id: 3, name: "Upload Content", icon: Upload },
    { id: 4, name: "Launch Token", icon: Zap },
  ];

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
             <Navbar/>
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
      
   
      <span className={`ml-2 text-sm font-medium ${
        currentStep >= step.id ? "text-white" : "text-gray-500"
      }`}>
        {step.name}
      </span>
      
     
      {stepIdx !== steps.length - 1 && (
        <div 
          className={`h-0.5 w-16 mx-4 ${
            currentStep > step.id ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-gray-700"
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
        {currentStep === 2 && <ProfileSetupStep onNext={handleNext} onBack={handleBack} />}
        {currentStep === 3 && <ContentUploadStep onNext={handleNext} onBack={handleBack} />}
        {currentStep === 4 && <TokenLaunchStep onBack={handleBack} />}
      </main>

     
      <footer className="relative z-10 border-t border-gray-800 py-6 bg-black bg-opacity-60 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Creator Studio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm">Terms</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


const WalletConnectStep = ({ onNext }) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
   
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setTimeout(onNext, 1000);
    }, 1500);
  };

  const wallets = [
    { name: "MetaMask", icon: "🦊" },
    { name: "Coinbase Wallet", icon: "💰" },
    { name: "WalletConnect", icon: "🔗" },
    { name: "Phantom", icon: "👻" }
  ];

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
                connecting || connected ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
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
          <a href="#" className="text-cyan-500 hover:text-cyan-400 mx-1">Terms of Service</a>
          and
          <a href="#" className="text-cyan-500 hover:text-cyan-400 mx-1">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};


const ProfileSetupStep = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
    twitter: "",
    instagram: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onNext();
  };

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
                <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">@</span>
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
                <label className="block text-sm font-medium text-gray-400 mb-1">Display Name</label>
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
              <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
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
                <label className="block text-sm font-medium text-gray-400 mb-1">Twitter</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">@</span>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pl-8 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="twitter"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Instagram</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">@</span>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pl-8 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="instagram"
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
  );
};

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

// Step 4: Token Launch
const TokenLaunchStep = ({ onBack }) => {
  const [launchComplete, setLaunchComplete] = useState(false);
  
  const handleLaunch = () => {
    setLaunchComplete(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Launch Your Creator Token
        </h2>
        
        {!launchComplete ? (
          <>
            <div className="mb-8">
              <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 mb-6">
                <h3 className="text-lg font-medium mb-4">Token Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Token Name</label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                        defaultValue="CREATOR"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Token Symbol</label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                        defaultValue="CRT"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Initial Supply</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                      defaultValue="1,000,000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-xl bg-gray-800 border border-gray-700">
                <h3 className="text-lg font-medium mb-4">Token Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Creator Reserve</span>
                    <div className="flex items-center">
                      <span className="text-white font-medium">20%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-400">Community Rewards</span>
                    <div className="flex items-center">
                      <span className="text-white font-medium">50%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-400">Public Sale</span>
                    <div className="flex items-center">
                      <span className="text-white font-medium">30%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full" style={{ width: '30%' }}></div>
                  </div>
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
                onClick={handleLaunch}
                className="flex items-center px-8 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium"
              >
                Launch Token
                <Zap className="h-5 w-5 ml-2" />
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
              Your creator token has been successfully launched.
              <br />You're now ready to start building your community!
            </p>
            
            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-gray-700 mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-gray-400 text-sm">Token Name:</span>
                  <h4 className="text-white font-medium">CREATOR (CRT)</h4>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 text-sm">Initial Supply:</span>
                  <h4 className="text-white font-medium">1,000,000 CRT</h4>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-400 text-sm">Contract Address:</span>
                  <h4 className="text-white font-mono text-sm">0x7Fc...A39d</h4>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center">
                  View on Explorer
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            
            <button 
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium"
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