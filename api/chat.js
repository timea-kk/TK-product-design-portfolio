/**
 * Serverless API: chat with the Timea LLM agent.
 * Deploy to Vercel; set OPENAI_API_KEY in the project environment.
 * POST body: { message: string }
 * Response: { reply: string } or { error: string }
 */

import OpenAI from 'openai';
import { TIMEA_SYSTEM_PROMPT } from './timeaSystemPrompt.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
  }

  let message;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    message = body?.message;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Body must include "message" (string)' });
  }

  const text = message.trim();
  if (text.length === 0) return res.status(400).json({ error: 'Message cannot be empty' });
  if (text.length > 2000) return res.status(400).json({ error: 'Message too long' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: TIMEA_SYSTEM_PROMPT },
        { role: 'user', content: text },
      ],
      max_tokens: 400,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "I'm not sure how to answer that—please email me at work@timea.cc!";
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err?.message || err);
    const code = err?.status === 429 ? 429 : 500;
    return res.status(code).json({
      error: err?.message || 'Something went wrong. Please try again or email work@timea.cc.',
    });
  }
}
