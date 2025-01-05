import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'))
    const maxRetries = 3;
    let lastError = null;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const prompt = "A cute 3D robot car mechanic apprentice, wearing a purple and neon green mechanic uniform, friendly face with glowing eyes, holding a wrench, minimalist design, completely transparent background with no color or elements, high quality render, clean design, white and purple color scheme with neon green accents, similar to a Pixar character, isolated object with alpha channel"

        const image = await hf.textToImage({
          inputs: prompt,
          model: 'black-forest-labs/FLUX.1-schnell',
        })

        const arrayBuffer = await image.arrayBuffer()
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

        return new Response(
          JSON.stringify({ image: `data:image/png;base64,${base64}` }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error)
        lastError = error
        
        // Rate limit hatası durumunda bekle
        if (error.message?.includes('Max requests')) {
          await sleep(10000) // 10 saniye bekle
          continue
        }
        
        throw error
      }
    }

    throw lastError || new Error('Failed after max retries')
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred', 
        details: error.message,
        retryAfter: error.message?.includes('Max requests') ? 60 : null 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})