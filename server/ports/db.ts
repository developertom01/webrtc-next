export interface DbPort {
  authenticate: () => Promise<void>;
}
