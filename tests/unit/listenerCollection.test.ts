import { expect, test, vi } from 'vitest';
import ListenerCollection from '../../src/utils/listenerCollection';

const listener = new ListenerCollection();

const listeners = vi.fn();
listeners.prototype.test1 = vi.fn();
listeners.prototype.test2 = vi.fn();

test('should add new callback listener', () => {
  const instance = new listeners();

  listener.add('main', this, instance.test1);
  expect(listener._listeners.length).toBeGreaterThan(0);

  listener.add('main', this, instance.test2);
  expect(listener._listeners.length).toBeGreaterThan(1);
});

test('should call the listener callback', async () => {
  const instance = new listeners();
  vi.spyOn(instance, 'test1').mockImplementation(listeners);
  vi.spyOn(instance, 'test2').mockImplementation(listeners);

  listener.add('main', instance, instance.test1);
  await listener.fire();
  expect(instance.test1).toHaveBeenCalledOnce();

  listener.add('main', instance, instance.test2);
  await listener.fire();
  expect(instance.test1).toHaveBeenCalledTimes(2);
  expect(instance.test2).toHaveBeenCalledOnce();
});

test('should remove listener', () => {
  const instance = new listeners();

  listener.add('main', instance, instance.test1);
  listener.add('secondary', instance, instance.test2);
  expect(listener._listeners.length).toBeGreaterThan(1);

  listener.remove('main');
  expect(listener._listeners.length).equals(1);

  listener.remove('secondary');
  expect(listener._listeners.length).equals(0);
});

// test('should call pre and post', async () => {
//   const instance1 = new listeners();
//   let instance2: any;

//   const listenerCollection = vi.fn(() => new ListenerCollection());
//   listenerCollection.prototype.pre = vi.fn();
//   listenerCollection.prototype.post = vi.fn();
//   listenerCollection.prototype.fire = vi.fn(function () {
//     (this as any).pre();
//     (this as any).post();
//   });
//   instance2 = new listenerCollection();
//   instance2.add('main', instance1, instance1.test1);

//   vi.spyOn(instance2, 'pre').mockImplementation(listenerCollection);
//   vi.spyOn(instance2, 'post').mockImplementation(listenerCollection);

//   await instance2.fire();
//   expect(instance2.pre).toHaveBeenCalledOnce();
// });
