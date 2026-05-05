-- CreateTable
CREATE TABLE "SocialReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reporterProfileId" TEXT NOT NULL,
    "targetProfileId" TEXT,
    "targetMessageId" TEXT,
    "reason" TEXT NOT NULL,
    "details" TEXT,
    "status" TEXT NOT NULL,
    "decisionRationale" TEXT,
    "reviewedById" TEXT,
    "reviewedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SocialReport_reporterProfileId_fkey" FOREIGN KEY ("reporterProfileId") REFERENCES "SocialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SocialReport_targetProfileId_fkey" FOREIGN KEY ("targetProfileId") REFERENCES "SocialProfile" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SocialReport_targetMessageId_fkey" FOREIGN KEY ("targetMessageId") REFERENCES "SocialMessage" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SocialReport_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "SocialReport_status_createdAt_idx" ON "SocialReport"("status", "createdAt");

-- CreateIndex
CREATE INDEX "SocialReport_reporterProfileId_status_idx" ON "SocialReport"("reporterProfileId", "status");
