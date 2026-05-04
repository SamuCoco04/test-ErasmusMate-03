-- CreateTable
CREATE TABLE "SocialConnection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pairKey" TEXT NOT NULL,
    "requesterProfileId" TEXT NOT NULL,
    "receiverProfileId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "requestedAt" DATETIME NOT NULL,
    "respondedAt" DATETIME,
    "blockedAt" DATETIME,
    "lastActionByProfileId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SocialConnection_requesterProfileId_fkey" FOREIGN KEY ("requesterProfileId") REFERENCES "SocialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SocialConnection_receiverProfileId_fkey" FOREIGN KEY ("receiverProfileId") REFERENCES "SocialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialConnection_pairKey_key" ON "SocialConnection"("pairKey");

-- CreateIndex
CREATE INDEX "SocialConnection_requesterProfileId_state_idx" ON "SocialConnection"("requesterProfileId", "state");

-- CreateIndex
CREATE INDEX "SocialConnection_receiverProfileId_state_idx" ON "SocialConnection"("receiverProfileId", "state");
