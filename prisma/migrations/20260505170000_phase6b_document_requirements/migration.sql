ALTER TABLE "ProcedureDefinition" ADD COLUMN "acceptedMimeTypesJson" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "ProcedureDefinition" ADD COLUMN "maxSizeBytes" INTEGER NOT NULL DEFAULT 5242880;
ALTER TABLE "ProcedureDefinition" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "ProcedureDefinition" ADD COLUMN "createdById" TEXT;
CREATE INDEX "ProcedureDefinition_isActive_idx" ON "ProcedureDefinition"("isActive");
