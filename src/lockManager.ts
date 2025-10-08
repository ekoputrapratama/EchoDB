export default abstract class LockManager {
  abstract readonly isLocked: boolean;
  abstract lock(): Promise<void>;
  abstract unlock(): Promise<void>;
}
