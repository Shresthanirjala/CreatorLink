import React, { useState, useRef, useEffect } from "react"
import {
  ChevronRight,
  ChevronLeft,
  Wallet,
  User,
  Upload,
  Zap,
  Check,
  CheckIcon,
  AlertCircle,
  X,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import { useNavigate } from "react-router-dom"

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

// Form validation utility functions
const validateUsername = (username) => {
  if (!username) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers and underscores";
  return "";
};

const validateDisplayName = (name) => {
  if (!name) return "Display name is required";
  if (name.length < 2) return "Display name must be at least 2 characters";
  return "";
};

const validateBio = (bio) => {
  if (!bio) return "Bio is required";
  if (bio.length < 10) return "Bio must be at least 10 characters";
  if (bio.length > 500) return "Bio must be less than 500 characters";
  return "";
};

const validateUrl = (url) => {
  if (!url) return "";
  const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  if (!urlPattern.test(url)) return "Please enter a valid URL";
  return "";
};

const WalletConnectStep = ({ onNext }) => {
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState(null)
  const [error, setError] = useState("")

  const handleConnect = (walletName) => {
    setSelectedWallet(walletName)
    setError("")
    setConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      // For demo purposes, let's simulate a connection error with some wallets
      if (walletName === "WalletConnect") {
        setError("Connection failed. Please try again or use a different wallet.");
        setConnecting(false);
        return;
      }

      setConnecting(false)
      setConnected(true)
      
      // Wait a bit before proceeding to the next step
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

        {error && (
          <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name)}
              disabled={connecting || connected}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                connected && wallet.name === selectedWallet
                  ? "border-cyan-500 bg-gray-800/60"
                  : "border-gray-700 hover:border-cyan-500 hover:bg-gray-800"
              } ${
                connecting || (connected && wallet.name !== selectedWallet)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{wallet.icon}</span>
                <span>{wallet.name}</span>
              </div>
              {connected && wallet.name === selectedWallet ? (
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
            <p className="mt-2 text-gray-400">Connecting to {selectedWallet}...</p>
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

const InputField = ({ label, name, value, onChange, error, placeholder, icon, type = "text", ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        {label} {props.required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-800 border ${
            error ? "border-red-500" : "border-gray-700"
          } rounded-lg py-2 px-4 ${icon ? "pl-8" : ""} text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500`}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

const TextareaField = ({ label, name, value, onChange, error, placeholder, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        {label} {props.required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={props.rows || 3}
        className={`w-full bg-gray-800 border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500`}
        placeholder={placeholder}
        {...props}
      ></textarea>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

const ProfileSetupStep = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
    youtube: "",
    youtubeUrl: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    displayName: "",
    bio: "",
    youtube: "",
    youtubeUrl: "",
  })

  const [touched, setTouched] = useState({
    username: false,
    displayName: false,
    bio: false,
    youtube: false,
    youtubeUrl: false,
  })

  const [formValid, setFormValid] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  // Validate form fields on change
  useEffect(() => {
    const newErrors = {
      username: touched.username ? validateUsername(formData.username) : "",
      displayName: touched.displayName ? validateDisplayName(formData.displayName) : "",
      bio: touched.bio ? validateBio(formData.bio) : "",
      youtube: "", // Optional field
      youtubeUrl: touched.youtubeUrl ? validateUrl(formData.youtubeUrl) : "",
    }
    
    setErrors(newErrors)
    
    // Check if the form is valid (required fields are filled and no errors)
    const isValid = !newErrors.username && 
                    !newErrors.displayName && 
                    !newErrors.bio && 
                    !newErrors.youtubeUrl;
    
    setFormValid(isValid)
  }, [formData, touched])

  const validateForm = () => {
    // Touch all fields to trigger validation
    setTouched({
      username: true,
      displayName: true,
      bio: true,
      youtube: true,
      youtubeUrl: true,
    })
    
    return formValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onNext()
    } else {
      // Scroll to the first error
      const firstErrorField = document.querySelector('.text-red-500')
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
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
              <InputField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={() => handleBlur('username')}
                error={errors.username}
                placeholder="username"
                icon="@"
                required
              />

              <InputField
                label="Display Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                onBlur={() => handleBlur('displayName')}
                error={errors.displayName}
                placeholder="Your Name"
                required
              />
            </div>

            <TextareaField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              onBlur={() => handleBlur('bio')}
              error={errors.bio}
              placeholder="Tell your audience about yourself..."
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Youtube Username"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                onBlur={() => handleBlur('youtube')}
                error={errors.youtube}
                placeholder="Your YouTube username"
                icon="@"
              />

              <InputField
                label="Youtube URL"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleChange}
                onBlur={() => handleBlur('youtubeUrl')}
                error={errors.youtubeUrl}
                placeholder="https://youtube.com/c/yourhandle"
              />
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
              className={`flex items-center px-8 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 ${
                !formValid && 'opacity-70 cursor-not-allowed hover:from-purple-500 hover:to-cyan-500'
              } hover:from-purple-600 hover:to-cyan-600 text-white font-medium`}
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
  const [selectedFiles, setSelectedFiles] = useState([])
  const [contentDetails, setContentDetails] = useState({
    title: "",
    description: "",
    tags: ""
  })
  const [errors, setErrors] = useState({
    files: "",
    title: "",
    description: ""
  })
  const [touched, setTouched] = useState({
    title: false,
    description: false,
    tags: false
  })
  const [formValid, setFormValid] = useState(false)
  const fileInputRef = useRef(null)

  const validateContentDetails = () => {
    const newErrors = {}
    
    if (!selectedFiles.length) {
      newErrors.files = "Please select at least one file"
    } else {
      // Check file sizes
      const invalidFiles = selectedFiles.filter(file => file.size > 100 * 1024 * 1024) // 100MB
      if (invalidFiles.length) {
        newErrors.files = `${invalidFiles.length} file(s) exceed the 100MB limit`
      }
    }
    
    if (!contentDetails.title && touched.title) {
      newErrors.title = "Title is required"
    } else if (contentDetails.title.length > 100 && touched.title) {
      newErrors.title = "Title must be less than 100 characters"
    }
    
    if (!contentDetails.description && touched.description) {
      newErrors.description = "Description is required"
    }
    
    return newErrors
  }

  useEffect(() => {
    const newErrors = validateContentDetails()
    setErrors(newErrors)
    
    // Form is valid if there are no errors and at least one file is selected
    const isValid = !Object.values(newErrors).some(error => error) && selectedFiles.length > 0
    setFormValid(isValid)
  }, [selectedFiles, contentDetails, touched])

  const handleFileInputClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
    setTouched(prev => ({ ...prev, files: true }))
  }

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const files = Array.from(e.dataTransfer.files)
    setSelectedFiles(files)
    setTouched(prev => ({ ...prev, files: true }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContentDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = () => {
    // Touch all fields to trigger validation
    setTouched({
      title: true,
      description: true,
      tags: true,
      files: true
    })
    
    const newErrors = validateContentDetails()
    setErrors(newErrors)
    
    if (!Object.values(newErrors).some(error => error) && selectedFiles.length > 0) {
      onNext()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Upload Your Content
        </h2>

        <div className="mb-8">
          <div
            className={`border-2 border-dashed ${
              errors.files 
                ? "border-red-500" 
                : selectedFiles.length > 0 
                  ? "border-cyan-500" 
                  : "border-gray-700"
            } rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer`}
            onClick={handleFileInputClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              multiple
              accept=".jpg,.jpeg,.png,.gif,.mp4,.mp3"
              className="hidden"
            />

            {selectedFiles.length === 0 ? (
              <>
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">
                  Drag and drop files here
                </h3>
                <p className="text-gray-400 mb-4">
                  Or click to browse your files
                </p>
                <p className="text-gray-500 text-sm">
                  Supported formats: JPG, PNG, GIF, MP4, MP3 (Max 100MB)
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current.click()
                  }}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg text-white font-medium"
                >
                  Choose Files
                </button>
              </>
            ) : (
              <div className="py-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-cyan-500 rounded-full p-2">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {selectedFiles.length} {selectedFiles.length === 1 ? "File" : "Files"} Selected
                </h3>
                <ul className="max-h-40 overflow-y-auto mb-4 px-4">
                  {selectedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center mr-3">
                          {file.type.startsWith("image/")
                            ? "🖼️"
                            : file.type.startsWith("video/")
                            ? "🎬"
                            : file.type.startsWith("audio/")
                            ? "🎵"
                            : "📄"}
                        </div>
                        <span className="text-sm text-gray-300 truncate max-w-xs">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-400 mr-2">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(index);
                          }}
                          className="p-1 hover:bg-gray-700 rounded-full"
                        >
                          <X className="h-4 w-4 text-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current.click()
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg text-white font-medium"
                >
                  Choose {selectedFiles.length > 0 ? "More" : ""} Files
                </button>
              </div>
            )}
          </div>
          
          {errors.files && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.files}
            </p>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Content Details</h3>
          <div className="space-y-4">
            <InputField
              label="Title"
              name="title"
              value={contentDetails.title}
              onChange={handleInputChange}
              onBlur={() => handleBlur('title')}
              error={errors.title}
              placeholder="Give your content a title"
              required
            />
            
            <TextareaField
              label="Description"
              name="description"
              value={contentDetails.description}
              onChange={handleInputChange}
              onBlur={() => handleBlur('description')}
              error={errors.description}
              placeholder="Describe your content..."
              required
            />
            
            <InputField
              label="Tags"
              name="tags"
              value={contentDetails.tags}
              onChange={handleInputChange}
              onBlur={() => handleBlur('tags')}
              placeholder="Add tags separated by commas"
            />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-gray-700 mb-8">
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <Zap className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                Monetize your content through your own token
              </h4>
              <p className="text-sm text-gray-300">
                After completing your profile setup, you'll launch your creator
                token so fans can invest in your success.
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
  )
}

// Step 4: Finalize Profile
const FinalizeProfileStep = ({ onBack }) => {
  const [profileComplete, setProfileComplete] = useState(false)
  const [redirectToCreate, setRedirectToCreate] = useState(false)
  const navigate = useNavigate()

  const handleFinalize = () => {
    setProfileComplete(true)
  }

  const handleCreateToken = () => {
    // Navigate to token creation page
    navigate("/create")
    console.log("Navigating to token creation page")
  }

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
                    <span className="text-white font-medium">
                      Akanshya thapa
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Username:</span>
                    <span className="text-white font-medium">@akanshya</span>
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
                    <span className="text-gray-300">
                      Launch your own creator token on Solana
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300">
                      Attract investment from fans who believe in your content
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300">
                      Grow your community through token-based incentives
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300">
                      Enable subscribers to invest directly in your success
                    </span>
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
              <br />
              You're now ready to launch your token and attract investors!
            </p>

            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-gray-700 mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <Zap className="h-8 w-8 text-cyan-400" />
                </div>
              </div>

              <h4 className="text-lg font-medium mb-2 text-center">
                Ready to launch your Creator Token?
              </h4>
              <p className="text-gray-400 text-center mb-4">
                Create your own token on Solana and let fans invest in your
                growth story.
              </p>

              <button
                onClick={handleCreateToken}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium flex items-center justify-center"
              >
                Create Your Token
                <Zap className="h-5 w-5 ml-2" />
              </button>
            </div>

            <button className="px-8 py-3 rounded-lg border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium transition-colors">
              Go to Creator Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreatorOnboarding
