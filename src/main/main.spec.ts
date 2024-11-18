import { expect, it, vi } from "vitest";

const mockFn = vi.fn();

it("main unit test", () => {
  mockFn();
  expect(mockFn).toHaveBeenCalled();
});
