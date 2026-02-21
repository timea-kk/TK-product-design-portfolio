# Timea Agent (LLM chat) – setup

The chat bar at the bottom of the site can use a **real LLM** (OpenAI) so visitors get smart, first‑person answers as you. If the API isn’t set up or fails, the site falls back to simple keyword answers.

## What you need

1. **OpenAI API key**  
   Create one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys). The chat uses `gpt-4o-mini` (cheap and fast).

2. **Deploy the project to Vercel** (so the `/api/chat` route runs)  
   - Push the repo to GitHub (you already have it).  
   - Go to [vercel.com](https://vercel.com) → Add New Project → Import your `TK-product-design-portfolio` repo.  
   - In **Settings → Environment Variables**, add:
     - **Name:** `OPENAI_API_KEY`  
     - **Value:** your OpenAI API key  
   - Deploy. Your site will be at `https://your-project.vercel.app`.  
   - The chat will call `https://your-project.vercel.app/api/chat` automatically (same origin).

3. **If you host the frontend elsewhere (e.g. GitHub Pages)**  
   - Deploy the **same repo** to Vercel as well (you can have both).  
   - In the GitHub Pages build (or in your static host), set an env var for the frontend:
     - **Name:** `VITE_CHAT_API_URL`  
     - **Value:** `https://your-vercel-app.vercel.app/api/chat`  
   - Rebuild the site so the chat bar uses that URL.

## Local development with the LLM

- **Option A:** Run the full app on Vercel locally:
  ```bash
  npx vercel dev
  ```
  Then open the URL it prints (e.g. http://localhost:3000). Create a `.env.local` with `OPENAI_API_KEY=sk-...` so the API can call OpenAI.

- **Option B:** Run only the frontend:
  ```bash
  npm run dev
  ```
  The chat will try `http://localhost:5173/api/chat`, which doesn’t exist, so it will **fall back to the simple keyword answers**. That’s fine for UI work.

## Files involved

- **`api/chat.js`** – Serverless handler: receives `{ message }`, calls OpenAI with your system prompt, returns `{ reply }`.
- **`api/timeaSystemPrompt.js`** – The “you” the LLM plays: summary of your CV and tone. Edit this to change what the agent says.
- **`src/components/TimeaAgent.jsx`** – Chat UI: POSTs to `/api/chat` (or `VITE_CHAT_API_URL`); on failure uses the local keyword answers.
- **`src/data/timeaAgentKnowledge.js`** – Fallback Q&A when the API isn’t available.

## Cost

`gpt-4o-mini` is low cost; a few hundred questions per month usually stay within a few dollars. You can set usage limits in your OpenAI account.
