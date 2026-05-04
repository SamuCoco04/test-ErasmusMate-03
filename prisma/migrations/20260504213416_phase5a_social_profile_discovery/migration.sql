-- CreateTable
CREATE TABLE "SocialProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "homeCity" TEXT,
    "hostCity" TEXT,
    "hostCountry" TEXT,
    "homeInstitutionName" TEXT,
    "hostInstitutionName" TEXT,
    "studyArea" TEXT,
    "mobilityPhase" TEXT,
    "languagesJson" TEXT NOT NULL,
    "interestsJson" TEXT NOT NULL,
    "bio" TEXT,
    "visibility" TEXT NOT NULL,
    "contactPreference" TEXT NOT NULL,
    "moderationState" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SocialProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialProfile_userId_key" ON "SocialProfile"("userId");

-- CreateIndex
CREATE INDEX "SocialProfile_visibility_moderationState_idx" ON "SocialProfile"("visibility", "moderationState");

-- CreateIndex
CREATE INDEX "SocialProfile_hostCity_studyArea_idx" ON "SocialProfile"("hostCity", "studyArea");
