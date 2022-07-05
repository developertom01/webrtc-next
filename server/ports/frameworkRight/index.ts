export interface RunOptions {
  port: number;
  callBack: () => void;
}
export interface FrameworkRightPort<T> {
  instance: T;
}
