export interface Action<Payload = any> {
  type: string;
  payload: Payload;
}
