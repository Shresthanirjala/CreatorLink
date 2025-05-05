
import React, { useState } from "react";
import OnboardingHeader from "@/components/CreatorOnboarding/OnboardingHeader";
import WalletConnect from "@/components/CreatorOnboarding/WalletConnect";
import ProfileSetup from "@/components/CreatorOnboarding/ProfileSetup";
import Footer from "@/components/Footer";

const CreatorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingHeader currentStep={currentStep} />
      <main className="flex-grow pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          {currentStep === 1 && <WalletConnect onNext={handleNext} />}
          {currentStep === 2 && <ProfileSetup onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && (
            <div className="text-center py-16 text-gray-500">
              Content upload step will be implemented here
            </div>
          )}
          {currentStep === 4 && (
            <div className="text-center py-16 text-gray-500">
              Token launch confirmation step will be implemented here
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorOnboarding;
