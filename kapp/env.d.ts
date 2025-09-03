declare module 'expo-router' {
  import { LinkProps as OriginalLinkProps } from 'expo-router/build/link/Link';
  
  export interface ExpoRouterContext {
    origin?: string;
    generatedOrigin?: string;
  }

  export interface LinkProps extends OriginalLinkProps {
    // Add any additional props if needed
  }
}

export {};
