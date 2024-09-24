This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# open-claude

Men will do anything but pay for monthly SaaS

# Description

This is a simple clone of chatbots like Claude or chatGPT. It allows users to ask questions and receive answers from a chatbot.

Features:

- Ask questions
- Receive answers
- Multi-turn conversations that allow users to ask follow-up questions
- Markdown support for answers

# Technologies used

- Next.js
- TailwindCSS
- Vercel

# Setup and Running the Project

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/open-claude.git
   cd open-claude
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Copy the `.env.example` file to a new file named `.env`:
     ```
     cp .env.example .env
     ```
   - Open the `.env` file and replace `your_openai_api_key_here` with your actual OpenAI API key.

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Deployment

This project is set up to be easily deployed on Vercel. Connect your GitHub repository to Vercel for automatic deployments.
