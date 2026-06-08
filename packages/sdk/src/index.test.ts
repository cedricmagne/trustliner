import { describe, expect, it } from "vitest";
import { VERSION } from "./index.js";

describe("@trustline-onboarder/sdk", () => {
  it("exposes a version", () => {
    expect(VERSION).toBe("0.0.0");
  });
});
