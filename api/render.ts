import type { VercelRequest, VercelResponse } from "vercel";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { design, options } = req.body;
    const jobId = crypto.randomUUID();

    // Queue GitHub Action
    await fetch(
      "https://api.github.com/repos/<YOUR_GH_USER>/remotion-render-endpoint/dispatches",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GH_PAT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "render-request",
          client_payload: { design, options, jobId },
        }),
      }
    );

    // Store initial status
    await redis.set(jobId, { status: "PENDING", progress: 0 });

    return res.status(202).json({ jobId });
  }

  // GET — polling
  const { id } = req.query as { id: string };
  const data = await redis.get(id);
  if (!data) return res.status(404).end();
  return res.json(data);
}