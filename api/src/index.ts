import { Hono } from 'hono'

type Bindings = {
  AI: Ai
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/generate/:prompt', async (c) => {
  const prompt = c.req.param('prompt');
  
  const image = await c.env.AI.run('@cf/lykon/dreamshaper-8-lcm', { prompt })
  
  return new Response(image, {
    headers: {
      "content-type": "image/png",
    },
  });
})

export default app