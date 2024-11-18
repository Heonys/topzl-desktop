import { expect, it, vi } from "vitest";

const mockFn = vi.fn();

it("renderer unit test", () => {
  mockFn();
  expect(mockFn).toHaveBeenCalled();
});
