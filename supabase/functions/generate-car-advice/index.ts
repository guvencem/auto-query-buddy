import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const ASSISTANT_ID = 'g-676b66ba8af88191b5294153271fc417';

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

    const { question } = await req.json();
    console.log('Received question:', question);

    // Create a thread with detailed error logging
    console.log('Creating thread...');
    const threadResponse = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'  // Updated to v2
      }
    });

    if (!threadResponse.ok) {
      const errorText = await threadResponse.text();
      console.error('Thread creation failed:', {
        status: threadResponse.status,
        statusText: threadResponse.statusText,
        error: errorText
      });
      throw new Error(`Failed to create thread: ${errorText}`);
    }

    const thread = await threadResponse.json();
    console.log('Thread created successfully:', thread.id);

    // Add message to thread
    console.log('Adding message to thread...');
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'  // Updated to v2
      },
      body: JSON.stringify({
        role: 'user',
        content: question
      })
    });

    if (!messageResponse.ok) {
      const errorText = await messageResponse.text();
      console.error('Message creation failed:', {
        status: messageResponse.status,
        statusText: messageResponse.statusText,
        error: errorText
      });
      throw new Error(`Failed to add message: ${errorText}`);
    }

    console.log('Message added successfully');

    // Run the assistant
    console.log('Starting assistant run...');
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'  // Updated to v2
      },
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID
      })
    });

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      console.error('Run creation failed:', {
        status: runResponse.status,
        statusText: runResponse.statusText,
        error: errorText
      });
      throw new Error(`Failed to start assistant run: ${errorText}`);
    }

    const run = await runResponse.json();
    console.log('Run created successfully:', run.id);

    // Poll for completion with timeout
    let runStatus;
    let attempts = 0;
    const maxAttempts = 30;
    const pollInterval = 1000; // 1 second

    do {
      if (attempts >= maxAttempts) {
        throw new Error('Timeout waiting for assistant response');
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval));
      
      console.log(`Checking run status (attempt ${attempts + 1}/${maxAttempts})...`);
      const statusResponse = await fetch(
        `https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}`,
        {
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
            'OpenAI-Beta': 'assistants=v2'  // Updated to v2
          }
        }
      );

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('Status check failed:', {
          status: statusResponse.status,
          statusText: statusResponse.statusText,
          error: errorText
        });
        throw new Error(`Failed to check run status: ${errorText}`);
      }

      runStatus = await statusResponse.json();
      console.log('Current run status:', runStatus.status);

      if (runStatus.status === 'failed') {
        console.error('Run failed:', runStatus);
        throw new Error(`Assistant run failed: ${JSON.stringify(runStatus.last_error || {})}`);
      }

      attempts++;
    } while (runStatus.status !== 'completed');

    // Get the messages
    console.log('Retrieving messages...');
    const messagesResponse = await fetch(
      `https://api.openai.com/v1/threads/${thread.id}/messages`,
      {
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'  // Updated to v2
        }
      }
    );

    if (!messagesResponse.ok) {
      const errorText = await messagesResponse.text();
      console.error('Messages retrieval failed:', {
        status: messagesResponse.status,
        statusText: messagesResponse.statusText,
        error: errorText
      });
      throw new Error(`Failed to retrieve messages: ${errorText}`);
    }

    const messages = await messagesResponse.json();
    const answer = messages.data[0].content[0].text.value;
    console.log('Answer received:', answer);

    return new Response(
      JSON.stringify({ answer }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});