import { NextRequest, NextResponse } from 'next/server';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function getAnthropicCompletion(messages: any[], options: any = {}) {
  const model = "anthropic.claude-3-sonnet-20240229-v1:0";
  const {
    maxTokens = 1000,
    temperature = 1.0,
    topP = 1.0,
  } = options;

  console.log(`bedrock getChatCompletion called with model ${model}`);

  let system = null;
  const systemMessage = messages.find(x => x.role === 'system');
  if (systemMessage) {
    system = systemMessage.content;
    const index = messages.findIndex(x => x.role === 'system');
    if (index > -1) {
      messages.splice(index, 1);
    }
  }

  const payload = {
    anthropic_version: 'bedrock-2023-05-31',
    messages,
    max_tokens: maxTokens,
    temperature: temperature,
    top_p: topP,
  };

  if (system) {
    payload.system = system;
  }

  console.log('payload', payload);

  const command = new InvokeModelCommand({
    contentType: 'application/json',
    body: JSON.stringify(payload),
    modelId: model,
  });

  console.log('Bedrock command prepared, sending request...');
  try {
    const apiResponse = await bedrockClient.send(command);
    console.log('Bedrock API response received', apiResponse);
    const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
    console.log('Decoded response body:', decodedResponseBody);
    const responseBody = JSON.parse(decodedResponseBody);
    console.log('Response body:', responseBody);
    return responseBody.content[0].text;
  } catch (error) {
    console.error('Error during bedrock API call:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await getAnthropicCompletion(messages, {
      maxTokens: 1000,
      temperature: 0.7,
      topP: 0.999,
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}