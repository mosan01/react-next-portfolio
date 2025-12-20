import { createClient } from "microcms-js-sdk";

export const BLOG_ENDPOINT = "blogs";

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : undefined;
}

export function getMicroCMSClient() {
  const serviceDomain = getEnv("MICROCMS_SERVICE_DOMAIN");
  const apiKey = getEnv("MICROCMS_API_KEY");

  if (!serviceDomain || !apiKey) return null;

  return createClient({
    serviceDomain,
    apiKey,
  });
}

export function isMicroCMSConfigured() {
  return Boolean(getEnv("MICROCMS_SERVICE_DOMAIN") && getEnv("MICROCMS_API_KEY"));
}
