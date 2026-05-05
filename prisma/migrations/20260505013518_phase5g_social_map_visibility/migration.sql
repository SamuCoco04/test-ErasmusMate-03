-- AlterTable
ALTER TABLE "SocialProfile" ADD COLUMN "mapVisibility" TEXT NOT NULL DEFAULT 'HIDDEN';
ALTER TABLE "SocialProfile" ADD COLUMN "approximateLatitude" REAL;
ALTER TABLE "SocialProfile" ADD COLUMN "approximateLongitude" REAL;

-- RedefineIndex
DROP INDEX IF EXISTS "SocialProfile_visibility_moderationState_idx";
CREATE INDEX "SocialProfile_visibility_moderationState_mapVisibility_idx" ON "SocialProfile"("visibility", "moderationState", "mapVisibility");
