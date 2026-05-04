import { describe, expect, it } from "vitest";

import { DEMO_ROLE_VALUES, DEMO_USER_IDS } from "../../src/modules/shared/demo-identity";

describe("demo identity fixtures", () => {
  it("keeps deterministic user ids for seeded roles", () => {
    expect(DEMO_USER_IDS.STUDENT).toBe("student-1");
    expect(DEMO_USER_IDS.COORDINATOR).toBe("coordinator-1");
    expect(DEMO_USER_IDS.ADMIN).toBe("admin-1");
  });

  it("uses explicit role strings compatible with sqlite strategy", () => {
    expect(DEMO_ROLE_VALUES).toEqual(["STUDENT", "COORDINATOR", "ADMIN"]);
  });
});
