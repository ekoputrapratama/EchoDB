export function createWorker(workerFunc, imports: Function[] = []) {
  if (!(workerFunc instanceof Function)) {
    throw new Error('Argument must be function');
  }
  let src = '';
  imports.forEach((i) => {
    const script = createWorkerImportScript(i);
    src += `importScripts('${script}');
    `;
  });
  src += `(
    ${workerFunc}
  )();`;
  const blob = new Blob([src], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  return new Worker(url);
}

export function createWorkerImportScript(scriptFn: Function) {
  if (!(scriptFn instanceof Function)) {
    throw new Error('Argument must be function');
  }
  const src = `(${scriptFn})();`;
  const blob = new Blob([src], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  return url;
}

export function isDate(value: any) {
  return (
    Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)
  );
}

export function isWorkerAvailable() {
  let satisfied = true;

  if (typeof window === 'undefined' && typeof Worker !== 'undefined') {
    const keys = Object.keys(Worker.prototype);
    if (keys.length < 4) satisfied = false;
  }
  return satisfied;
}

export function isNodejs() {
  return (
    // eslint-disable-next-line no-constant-binary-expression
    new Function('try {return this===global;}catch(e){return false;}') &&
    typeof process === 'object' &&
    typeof process.versions === 'object' &&
    typeof process.versions.node !== 'undefined'
  );
}

export function isBrowser() {
  return new Function(
    'try {return this===window;}catch(e){ return false;}'
  ).call(undefined);
}

export function workerScriptPath() {
  const currentScript: HTMLScriptElement = document.querySelector(
    'script[src*="sonicdb"]'
  ) as HTMLScriptElement;
  const src = currentScript.src;
  const regex = /https?:\/\//;
  const withDomain = regex.test(src);
  const path = src.replace(regex, '').split('/');
  if (withDomain || path[0].length < 1) {
    path.shift();
  }
  path.pop();
  if (path.length < 1) {
    return '/' + 'worker.js';
  }
  return '/' + path.join('/') + '/worker.js';
}

export function isInWorker() {
  return (
    typeof document === 'undefined' &&
    typeof window === 'undefined' &&
    typeof global === 'undefined'
  );
}

export function isNestedQuery(spec: any) {
  return Object.keys(spec).some((key, index, keys) => {
    if (key === '$and' || key === '$or' || key === '$nor') {
      console.log('isNestedQuery', spec);
      return (spec[key] as any[]).some((field) => {
        return Object.keys(field).some((name) => {
          const splitted = name.split('.');
          return splitted.length > 0;
        });
      });
    }
  });
}
