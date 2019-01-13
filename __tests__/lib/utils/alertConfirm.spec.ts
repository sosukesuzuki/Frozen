import alertConfirm from "@lib/utils/alertConfirm";

describe("alertConfirm", () => {
  it("returns value returned passed function when confirm returns true", () => {
    // Given
    (global as any).confirm = jest.fn(() => true);
    function returnOne(): number {
      return 1;
    }

    // When
    const result = alertConfirm("test", returnOne);

    // Then
    expect(result).toBe(1);
  });

  it("returns undefined when confirm returns false and log to console", () => {
    // Given
    (global as any).confirm = jest.fn(() => false);
    global.console.info = jest.fn();
    function returnOne(): number {
      return 1;
    }

    // When
    const result = alertConfirm("test", returnOne);

    // Then
    expect(result).toBeUndefined();
    expect(global.console.info).toBeCalledWith("Canceled!");
  });
});
