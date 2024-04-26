import { StreamingTextResponse } from 'ai';
import { DifyClient } from 'dify-client';

import { LobeRuntimeAI } from '../../BaseAI';
import { ChatStreamPayload } from '../../types';

export class DifyAI implements LobeRuntimeAI {
  private client: DifyClient;

  constructor() {
    this.client = new DifyClient('app-eUtC1tCiu7wTP50Emv3kiKI1', 'https://api.dify.ai/v1');
  }

  async chat(
    payload: ChatStreamPayload,
    // options?: ChatCompetitionOptions,
  ): Promise<StreamingTextResponse> {
    const latestMessage = payload?.messages?.at(-1)?.content;

    const requestData = {
      inputs: {},
      query: latestMessage,
      response_mode: 'streaming',
      user: 'userId',
    };

    console.log('sent message: -> ' + latestMessage);

    const { data } = await this.client.sendRequest(
      'POST',
      '/chat-messages',
      requestData,
      undefined,
      true,
    );

    return new StreamingTextResponse(data);
  }
}
