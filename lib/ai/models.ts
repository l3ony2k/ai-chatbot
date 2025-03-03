import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { deepseek } from '@ai-sdk/deepseek';
import { perplexity } from '@ai-sdk/perplexity';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'gpt-4o-mini';

// Common configuration for all models
const commonConfig = {
  baseURL: 'https://api.hyprlab.io',
  apiKey: process.env.HYPRLAB_API_KEY // Single API key for all models
};

// Helper functions to create models with common configuration
const createOpenAI = (model: string) => openai(model, commonConfig);
const createAnthropic = (model: string) => anthropic(model, commonConfig);
const createDeepseek = (model: string) => deepseek(model, commonConfig);
const createPerplexity = (model: string) => perplexity(model, commonConfig);

export const myProvider = customProvider({
  languageModels: {
    'gpt-4o-mini': createOpenAI('gpt-4o-mini'),
    'gpt-4o': createOpenAI('gpt-4o'),
    'chatgpt-4o-latest': createOpenAI('chatgpt-4o-latest'),
    'o3-mini': createOpenAI('o3-mini'),
    'claude-3-7-sonnet-latest': createAnthropic('claude-3-7-sonnet-latest'),
    'deepseek-reasoner': wrapLanguageModel({
      model: createDeepseek('deepseek-reasoner'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'deepseek-chat': createDeepseek('deepseek-chat'),
    'sonar-deep-research': createPerplexity('sonar-deep-research'),
    'title-model': createOpenAI('gpt-4o-mini'),
    'artifact-model': createOpenAI('gpt-4o-mini'),
  },
  imageModels: {
    'small-model': openai.image('dall-e-2', commonConfig),
    'large-model': openai.image('dall-e-3', commonConfig),
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
    name: 'ChatGPT-4o',
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