/// <reference types="expo-router/types" />

declare module "expo-router" {
  interface ExpoExtraRouterConfig {
    router?: {
      origin?: string;
      generatedOrigin?: string;
    };
  }
}

// Ensure this is treated as a module
export {};
