import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const formData = await req.formData();
    const question = formData.get('question') as string;
    const file = formData.get('file') as File | null;
    
    console.log('Received question:', question);
    console.log('Received file:', file?.name);

    let messages = [
      {
        role: 'system',
        content: 'Sen bir araba uzmanısın. Kullanıcıların arabaları hakkında sorduğu her türlü soruya detaylı ve anlaşılır bir şekilde cevap vermelisin. Cevaplarını Türkçe olarak ver.'
      }
    ];

    if (file) {
      try {
        // Read the file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        // Convert ArrayBuffer to Uint8Array
        const uint8Array = new Uint8Array(arrayBuffer);
        // Convert Uint8Array to base64
        const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
        
        console.log('File processed successfully, adding to messages');
        
        messages.push({
          role: 'user',
          content: [
            { type: 'text', text: question },
            {
              type: 'image_url',
              image_url: {
                url: `data:${file.type};base64,${base64String}`
              }
            }
          ]
        });
      } catch (error) {
        console.error('Error processing file:', error);
        throw new Error(`Failed to process image file: ${error.message}`);
      }
    } else {
      messages.push({
        role: 'user',
        content: question
      });
    }

    console.log('Sending request to OpenAI');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    const data = await response.json();
    console.log('Received response from OpenAI');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI');
    }

    const answer = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ answer }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        },
      }
    );
  } catch (error) {
    console.error('Error in generate-car-advice function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        },
      }
    );
  }
});