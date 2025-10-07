export async function loadNetworkProvider() {
  let module;
  if(typeof window !== "undefined") {
    module = await import('./browser');
  } else {
    module = await import('./node');
  }
  return module;
}