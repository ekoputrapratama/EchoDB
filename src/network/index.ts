import { NetworkProvider } from '../types';

export async function loadNetworkProvider(): Promise<NetworkProvider> {
  let module;
  if (typeof window !== 'undefined') {
    module = await import('./browser');
  } else {
    module = await import('./node');
  }
  return module;
}
