-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deadline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mobilityRecordId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "state" TEXT NOT NULL,
    "overrideDueDate" DATETIME,
    "fulfilledAt" DATETIME,
    "relatedProcedureId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deadline_mobilityRecordId_fkey" FOREIGN KEY ("mobilityRecordId") REFERENCES "MobilityRecord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deadline_relatedProcedureId_fkey" FOREIGN KEY ("relatedProcedureId") REFERENCES "ProcedureDefinition" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deadline" ("createdAt", "dueDate", "fulfilledAt", "id", "mobilityRecordId", "state", "title", "updatedAt") SELECT "createdAt", "dueDate", "fulfilledAt", "id", "mobilityRecordId", "state", "title", "updatedAt" FROM "Deadline";
DROP TABLE "Deadline";
ALTER TABLE "new_Deadline" RENAME TO "Deadline";
CREATE INDEX "Deadline_mobilityRecordId_state_idx" ON "Deadline"("mobilityRecordId", "state");
CREATE INDEX "Deadline_dueDate_idx" ON "Deadline"("dueDate");
CREATE INDEX "Deadline_relatedProcedureId_idx" ON "Deadline"("relatedProcedureId");
CREATE TABLE "new_ExceptionRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mobilityRecordId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "title" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "deadlineId" TEXT,
    "coordinatorRationale" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExceptionRequest_mobilityRecordId_fkey" FOREIGN KEY ("mobilityRecordId") REFERENCES "MobilityRecord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExceptionRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExceptionRequest_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ExceptionRequest_deadlineId_fkey" FOREIGN KEY ("deadlineId") REFERENCES "Deadline" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ExceptionRequest" ("createdAt", "id", "mobilityRecordId", "reason", "requestedById", "reviewedById", "state", "title", "updatedAt") SELECT "createdAt", "id", "mobilityRecordId", "reason", "requestedById", "reviewedById", "state", "title", "updatedAt" FROM "ExceptionRequest";
DROP TABLE "ExceptionRequest";
ALTER TABLE "new_ExceptionRequest" RENAME TO "ExceptionRequest";
CREATE INDEX "ExceptionRequest_mobilityRecordId_state_idx" ON "ExceptionRequest"("mobilityRecordId", "state");
CREATE INDEX "ExceptionRequest_requestedById_idx" ON "ExceptionRequest"("requestedById");
CREATE INDEX "ExceptionRequest_deadlineId_idx" ON "ExceptionRequest"("deadlineId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
