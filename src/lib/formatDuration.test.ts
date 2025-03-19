import { describe, it, expect } from "vitest";
import { formatDuration } from "./formatDuration";

describe("formatDuration", () => {
  it("should convert minutes (number) to string with <hour>h<minute>m format", () => {
    const minute = 140;
    const result = formatDuration(minute);
    expect(result).toBe("2h20m");
  });

  it("should still show hour if minutes(number) is less than 1 hour", () => {
    const minute = 59;
    const result = formatDuration(minute);
    expect(result).toBe("0h59m");
  });
});
