import { vi, expect, it, describe } from "vitest";
import fetchData from "./fetchData";

describe("fetchData", () => {
  it("should return data when response is successful", async () => {
    // Mock fetch to return a successful response with a JSON body
    const mockResponse = { data: "some data" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await fetchData("https://api.example.com/data");

    expect(result).toEqual(mockResponse); // Assert the returned data matches the mock

    vi.unstubAllGlobals();
  });

  it("should throw an error when response is not ok", async () => {
    // Mock fetch to return an error response
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      })
    );

    try {
      await fetchData("https://api.example.com/data");
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Ensure the error is an instance of Error
      if (error instanceof Error) {
        // Check error message
        expect(error.message).toBe("Server Error! Status: 500");
      }
    }

    vi.unstubAllGlobals();
  });

  it("should handle network errors", async () => {
    // Mock fetch to simulate a network error
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValueOnce(new Error("Network error"))
    );

    try {
      await fetchData("https://api.example.com/data");
    } catch (error) {
      expect(error).toBeInstanceOf(Error); // Ensure the error is an instance of Error
      if (error instanceof Error) {
        // Check error message
        expect(error.message).toBe("Network error");
      }
    }

    vi.unstubAllGlobals();
  });
});
