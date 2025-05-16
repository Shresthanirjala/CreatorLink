 🌟 Creator Link

Creator Link is a simple smart contract (program) built on the **Solana blockchain** that helps **creators** sell their own **custom tokens** to fans and supporters.

Think of it like this: A YouTuber, artist, or influencer can create their own token and share a link. Fans can buy the token to support the creator or get special access to content, communities, etc.

---
 🧠 What’s the Idea?

Creators can:

- 🎨 Set up their profile and token
- 💰 Sell their token to fans using a dynamic pricing system (price increases as more are sold)
- 💵 Collect the SOL (Solana) they earn

Supporters (fans) can:

- 💳 Buy the creator’s token
- 📈 Get in early and benefit from rising prices
- 💬 Get access to the link/content provided by the creator

 💡 How It Works (Simple Explanation)

 Step 1: Creator Sets Things Up

A creator runs the `initialize_creator` function to:

- Create their own token
- Set how much 1 token costs (starting price)
- Decide how much the price increases with each new buyer
- Share a custom link (e.g., their website or a private group)

---

 Step 2: Fans Buy Tokens

When someone wants to support a creator:

- They run the `buy_t` function
- The price is automatically calculated using a formula
  - Example: If the starting price is 1 SOL and the price goes up by 0.1 SOL per buyer, the 5th buyer pays `1 + 0.1*5 = 1.5 SOL`
- The fan gets the token in their wallet
- The SOL goes to the creator (securely)


 Step 3: Creator Withdraws Earnings

At any time, the creator can run `withdraw` to:

- Move the SOL they earned from the platform to their wallet

 📦 What’s Inside

The smart contract has:

- `initialize_creator` – For creators to register and set up their tokens
- `buy_t` – For fans to buy tokens
- `withdraw` – For creators to take out their earnings
- `CreatorState` – A saved file (account) on the blockchain that stores each creator’s data



 🧾 Real-World Example

> Imagine Alex is a content creator.
>
> - He uses Creator Link to launch **AlexCoin**
> - He sets the base price to 1 SOL, and price increases by 0.2 SOL per buyer
> - Alex shares his link
> - 5 fans buy 1 token each, and the price goes up every time
> - Alex earns ~7 SOL
> - He later uses the `withdraw` feature to transfer his SOL earnings



 👥 Who Can Use This?

- Creators (YouTubers, musicians, writers)
- Fans who want to support creators early
- Communities who want to create exclusive access systems



🔒 Is It Secure?

- All funds go into a secure vault (a special account controlled by the smart contract)
- Only the creator can withdraw funds
- All token transfers are verified on-chain

---

## 📍 Coming Soon

- Token burning (reducing supply)
- Reward systems for early buyers
- Creator dashboards



## 🤝 Contribute or Learn More

This project is open source! If you're a developer, designer, or content creator, feel free to contribute or reach out with ideas.

---

Built with ❤️ using [Solana](https://solana.com) + [Anchor](https://book.anchor-lang.com/)

