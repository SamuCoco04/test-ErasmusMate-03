-- CreateTable
CREATE TABLE "CityRecommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdByProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "addressLabel" TEXT NOT NULL,
    "approximateLatitude" REAL,
    "approximateLongitude" REAL,
    "visibility" TEXT NOT NULL,
    "moderationState" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CityRecommendation_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES "SocialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SocialReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reporterProfileId" TEXT NOT NULL,
    "targetProfileId" TEXT,
    "targetMessageId" TEXT,
    "targetRecommendationId" TEXT,
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
    CONSTRAINT "SocialReport_targetRecommendationId_fkey" FOREIGN KEY ("targetRecommendationId") REFERENCES "CityRecommendation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SocialReport_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SocialReport" ("createdAt", "decisionRationale", "details", "id", "reason", "reporterProfileId", "reviewedAt", "reviewedById", "status", "targetMessageId", "targetProfileId", "updatedAt") SELECT "createdAt", "decisionRationale", "details", "id", "reason", "reporterProfileId", "reviewedAt", "reviewedById", "status", "targetMessageId", "targetProfileId", "updatedAt" FROM "SocialReport";
DROP TABLE "SocialReport";
ALTER TABLE "new_SocialReport" RENAME TO "SocialReport";
CREATE INDEX "SocialReport_status_createdAt_idx" ON "SocialReport"("status", "createdAt");
CREATE INDEX "SocialReport_reporterProfileId_status_idx" ON "SocialReport"("reporterProfileId", "status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "CityRecommendation_city_category_idx" ON "CityRecommendation"("city", "category");

-- CreateIndex
CREATE INDEX "CityRecommendation_visibility_moderationState_idx" ON "CityRecommendation"("visibility", "moderationState");
