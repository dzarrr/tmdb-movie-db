import { describe, it, expect } from "vitest";
import { getQueryParamString } from "./getQueryParamString";

describe("getQueryParamString", () => {
  it("should convert numbers to strings and generate the correct query string", () => {
    const params = { page: 1, limit: 25, search: "Vitest" };
    const result = getQueryParamString(params);
    expect(result).toBe("page=1&limit=25&search=Vitest");
  });

  it("should work with all string values", () => {
    const params = { search: "Vitest", category: "testing" };
    const result = getQueryParamString(params);
    expect(result).toBe("search=Vitest&category=testing");
  });

  it("should return an empty string for an empty object", () => {
    const params = {};
    const result = getQueryParamString(params);
    expect(result).toBe("");
  });

  it("should handle special characters in keys and values", () => {
    const params = { "search term": "Vitest test!", category: "frameworks" };
    const result = getQueryParamString(params);
    expect(result).toBe("search+term=Vitest+test%21&category=frameworks");
  });

  it("should handle numbers as keys and values", () => {
    const params = { "1": 1, "2": 2 };
    const result = getQueryParamString(params);
    expect(result).toBe("1=1&2=2");
  });
});
