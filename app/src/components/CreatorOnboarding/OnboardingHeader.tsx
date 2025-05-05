
import React from "react";
import { Link } from "react-router-dom";

interface OnboardingHeaderProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Connect Wallet" },
  { id: 2, name: "Create Profile" },
  { id: 3, name: "Upload Content" },
  { id: 4, name: "Launch Token" }
];

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ currentStep }) => {
  return (
    <div className="container py-8">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-creator-purple to-creator-blue flex items-center justify-center text-white font-bold">C</div>
        <span className="text-xl font-semibold bg-gradient-to-r from-creator-purple to-creator-blue text-transparent bg-clip-text">CreatorLink</span>
      </Link>
      
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Launch Your Creator Token</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Connect with your fans, build your community, and get direct support through your personal token.
        </p>
      </div>
      
      <div className="hidden md:flex items-center justify-center mb-12">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step.id ? 'bg-creator-purple text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <p className={`text-sm mt-2 ${currentStep >= step.id ? 'text-creator-purple font-medium' : 'text-gray-500'}`}>{step.name}</p>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`h-[2px] w-24 mx-2 ${currentStep > index + 1 ? 'bg-creator-purple' : 'bg-gray-100 dark:bg-gray-800'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="md:hidden mb-6">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep} of {steps.length}
        </p>
        <p className="text-center font-medium">{steps[currentStep - 1].name}</p>
      </div>
    </div>
  );
};

export default OnboardingHeader;
