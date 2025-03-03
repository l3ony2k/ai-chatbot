import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createPerplexity } from '@ai-sdk/perplexity';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'gpt-4o-mini';

// Use a different variable name to avoid conflicts
const openaiClient = createOpenAI({
  baseURL: 'https://api.hyprlab.io/v1',
  apiKey: process.env.HYPRLAB_API_KEY,
  compatibility: 'compatible' // This is key - use compatible mode for third-party APIs
});
const anthropicClient = createAnthropic({
  baseURL: 'https://api.hyprlab.io/v1',
  apiKey: process.env.HYPRLAB_API_KEY,
});
const deepseekClient = createDeepSeek({
  baseURL: 'https://api.hyprlab.io/v1',
  apiKey: process.env.HYPRLAB_API_KEY,
});
const perplexityClient = createPerplexity({
  baseURL: 'https://api.hyprlab.io/v1',
  apiKey: process.env.HYPRLAB_API_KEY,
});


export const myProvider = customProvider({
  languageModels: {
    'gpt-4o-mini': openaiClient('gpt-4o-mini'),
    'gpt-4o': openaiClient('gpt-4o'),
    'chatgpt-4o-latest': openaiClient('chatgpt-4o-latest'),
    'o3-mini': openaiClient('o3-mini'),
    'claude-3-7-sonnet-latest': anthropicClient('claude-3-7-sonnet-latest'),
    'deepseek-reasoner': wrapLanguageModel({
      model: deepseekClient('deepseek-reasoner'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'deepseek-chat': deepseekClient('deepseek-chat'),
    'sonar-deep-research': perplexityClient('sonar-deep-research'),
    'title-model': openaiClient('gpt-4o-mini'),
    'artifact-model': openaiClient('gpt-4o-mini'),
  },
  imageModels: {
    'small-model': openaiClient.image('dall-e-2'),
    'large-model': openaiClient.image('dall-e-3'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chatgpt-4o-latest',
    name: 'ChatGPT 4o',
    description: 'The latest version of GPT-4o with up-to-date capabilities'
  },
  {
    id: 'gpt-4o',
    name: 'GPT 4o',
    description: 'OpenAI\'s multimodal model with strong reasoning abilities'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT 4o mini',
    description: 'A smaller, faster version of GPT-4o for everyday tasks'
  },
  {
    id: 'o3-mini',
    name: 'o3 mini',
    description: 'Fast at advanced reasoning'
  },
  {
    id: 'claude-3-7-sonnet-latest',
    name: 'Claude 3.7 Sonnet',
    description: 'Anthropic\'s latest Claude model with advanced capabilities'
  },
  {
    id: 'deepseek-reasoner',
    name: 'DeepSeek R1',
    description: 'Specialized for complex reasoning with step-by-step thinking'
  },
  {
    id: 'deepseek-chat',
    name: 'DeepSeek V3',
    description: 'General purpose chat model from DeepSeek'
  },
  {
    id: 'sonar-deep-research',
    name: 'Sonar Deep Research',
    description: 'Perplexity\'s model for in-depth research and analysis'
  }
];