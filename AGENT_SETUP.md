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

## Branch workflow: don’t build on main

Best practice is to work on a branch and only merge to `main` when you’re happy. Vercel can build **every branch** and give you a **preview URL** for it—so you get a real deployment (including the chat API) to test before anything goes to production.

**Workflow:**

1. Work on your branch (e.g. `refining-TimeaAgent`). Make small changes.
2. **Push the branch** to GitHub:
   ```bash
   git add .
   git commit -m "your message"
   git push origin refining-TimeaAgent
   ```
3. **Vercel builds it** and creates a **Preview** deployment. In Vercel: **Deployments** → find the row for your branch (it may say “Preview” or the branch name) → click **Visit** (or the URL). That’s your test URL; the chat API runs there too (same project, same env vars).
4. Test the chat on that preview URL. Repeat: edit → commit → push → wait for build → test.
5. When you’re happy, **merge into `main`** (e.g. via GitHub or `git checkout main && git merge refining-TimeaAgent && git push origin main`). The **production** site (your main Vercel URL) will then deploy from `main`.

**If your branch doesn’t get a deployment:** In Vercel go to **Settings** → **Git**. Ensure something like “Preview” deployments or “Deploy all branches” is enabled so non‑production branches get built. Then push the branch again.

---

## How to check if the LLM is working

If the chat only gives the “I’m not sure—please email me…” line for questions it should know (e.g. “what is it like working with you?”), the **API isn’t being used**—the site is using the simple keyword fallback. Here’s how to verify.

### 1. Check Vercel (API key and deployment)

1. Go to [vercel.com](https://vercel.com) and open your portfolio project.
2. **Environment variable:**  
   Click **Settings** → **Environment Variables**.  
   Check that **`OPENAI_API_KEY`** is there and has a value (you’ll see a masked value like `sk-...`). If it’s missing, add it (name: `OPENAI_API_KEY`, value: your key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)), then **Redeploy** the project.
3. **Which branch is live:**  
   Click **Deployments**. The top deployment should be from the branch you pushed (e.g. `main`). If you changed the agent or prompt, make sure that branch was deployed (trigger a new deploy from that branch if needed).

### 2. Check in the browser (is the API being called?)

1. Open your **live site** (the Vercel URL, e.g. `https://your-project.vercel.app`).
2. Open **Developer Tools:**  
   - **Mac:** `Cmd + Option + I` (Chrome/Edge) or `Cmd + Option + C` (Safari).  
   - **Windows:** `F12` or `Ctrl + Shift + I`.
3. Go to the **Network** tab. If you see a filter bar, choose **Fetch/XHR** so you only see API-style requests.
4. In the chat bar, type a question and send it (e.g. “what is it like working with you?”).
5. Look for a request named **`chat`** (or similar). Click it.
   - **If you see `chat` with status 200:** The API is being called. Check the **Response** (or **Preview**) tab: you should see JSON with a `reply` field. If the reply is still generic, the API might be returning an error message—check the response body.
   - **If there is no `chat` request**, or it’s **red** (failed): The frontend can’t reach the API. Common causes:  
     - You’re on `localhost` (e.g. `npm run dev`) — the API only runs on Vercel, so the fallback is expected.  
     - The site is hosted somewhere other than Vercel but `VITE_CHAT_API_URL` wasn’t set to your Vercel URL, so the chat is calling the wrong place.

**Quick rule:** Testing on the **Vercel URL** (same domain as the API) is the simplest way to get the LLM. On localhost with `npm run dev`, only the keyword fallback runs.

---

## Cost

`gpt-4o-mini` is low cost; a few hundred questions per month usually stay within a few dollars. You can set usage limits in your OpenAI account.
