CREATE TABLE "SocialMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "connectionId" TEXT NOT NULL,
    "senderProfileId" TEXT NOT NULL,
    "recipientProfileId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SocialMessage_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "SocialConnection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SocialMessage_senderProfileId_fkey" FOREIGN KEY ("senderProfileId") REFERENCES "SocialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SocialMessage_recipientProfileId_fkey" FOREIGN KEY ("recipientProfileId") REFERENCES "SocialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "SocialMessage_connectionId_idx" ON "SocialMessage"("connectionId");
CREATE INDEX "SocialMessage_senderProfileId_idx" ON "SocialMessage"("senderProfileId");
CREATE INDEX "SocialMessage_recipientProfileId_idx" ON "SocialMessage"("recipientProfileId");
CREATE INDEX "SocialMessage_createdAt_idx" ON "SocialMessage"("createdAt");
