export interface RunOptions {
  port?: number;
  callBack?: () => void;
}
export interface AppPort<T = {}> {
  instance: T;
  //   run: (options: RunOptions) => Promise<void>;
}
