import { describe, it, expect } from "vitest";
import isValidId from "../utils/isValidId.js";

describe("isValidId", () => {
  it("returns true for a positive integers", () => {
    expect(isValidId("5")).toBe(true);

    expect(isValidId("1")).toBe(true);
  });

  it("returns false for non number id", () => {
    expect(isValidId("duck")).toBe(false);
  });

  it("returns false for a decimal id", () => {
    expect(isValidId("1.5")).toBe(false);
  });

  it("returns false for 0 and negative integer", () => {
    expect(isValidId("0")).toBe(false);

    expect(isValidId("-1")).toBe(false);
  });
});
