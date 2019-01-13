export default function alertConfirm<T>(message: string, after: (args?: any) => T): T | undefined {
  const result = confirm(message);
  if (result) {
    return after();
  } else {
    if (process.env.NODE_ENV !== "production") {
      console.info("Canceled!");
    }
    return undefined;
  }
}
