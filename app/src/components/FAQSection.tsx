
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is CreatorLink?",
    answer: "CreatorLink is a decentralized platform that allows fans to invest in creators through tokenization. Creators can launch their own tokens, and fans can buy, hold, and trade these tokens, sharing in the creator's success as they grow."
  },
  {
    question: "How do creator tokens work?",
    answer: "Creator tokens represent a form of social investment in a creator. When you buy a creator's token, you're supporting them directly while also gaining potential upside if their popularity and demand increases. Tokens can also provide access to exclusive content and community benefits."
  },
  {
    question: "Do I need cryptocurrency to use CreatorLink?",
    answer: "Yes, CreatorLink operates on the Solana blockchain, so you'll need SOL to purchase creator tokens. We have simple onboarding tools to help you get started if you're new to crypto."
  },
  {
    question: "How do creators benefit from CreatorLink?",
    answer: "Creators receive direct funding from their community, retain creative independence, build a more engaged fan base, and can offer special perks to token holders. They also earn a percentage from secondary market transactions of their tokens."
  },
  {
    question: "Is my investment safe?",
    answer: "While we use secure blockchain technology, please be aware that investing in creator tokens carries risks. Token values can fluctuate based on creator popularity and market demand. Always do your research before investing."
  }
];

const FAQSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 border-t border-gray-800">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
          <p className="text-gray-300">
            Have questions about how CreatorLink works? We've got answers to the most common questions.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
                <AccordionTrigger className="text-left font-medium text-white">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
