-- AlterTable
ALTER TABLE "DocumentSubmission" ADD COLUMN "reopeningRationale" TEXT;

-- CreateTable
CREATE TABLE "DocumentSubmissionEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "priorState" TEXT NOT NULL,
    "newState" TEXT NOT NULL,
    "rationale" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocumentSubmissionEvent_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "DocumentSubmission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "DocumentSubmissionEvent_submissionId_createdAt_idx" ON "DocumentSubmissionEvent"("submissionId", "createdAt");
