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
