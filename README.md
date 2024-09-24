This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# open-claude

Men will do anything but pay for monthly SaaS

# Description

This is a simple clone of chatbots like Claude or chatGPT. It allows users to ask questions and receive answers from a chatbot powered by Claude 3.5 Sonnet via AWS Bedrock.

Features:

- Ask questions
- Receive answers from Claude 3.5 Sonnet
- Multi-turn conversations that allow users to ask follow-up questions
- Markdown support for answers

# Technologies used

- Next.js
- TailwindCSS
- Vercel
- AWS Bedrock (Claude 3.5 Sonnet)

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
   - Open the `.env` file and replace the placeholder values with your actual AWS credentials and region.

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Deployment

This project is set up to be easily deployed on Vercel. Connect your GitHub repository to Vercel for automatic deployments.
