-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProcedureDefinition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "institutionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "acceptedMimeTypesJson" TEXT NOT NULL DEFAULT '[]',
    "maxSizeBytes" INTEGER NOT NULL DEFAULT 5242880,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProcedureDefinition_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProcedureDefinition_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProcedureDefinition" ("acceptedMimeTypesJson", "createdAt", "createdById", "description", "id", "institutionId", "isActive", "isRequired", "maxSizeBytes", "sortOrder", "title", "updatedAt") SELECT "acceptedMimeTypesJson", "createdAt", "createdById", "description", "id", "institutionId", "isActive", "isRequired", "maxSizeBytes", "sortOrder", "title", "updatedAt" FROM "ProcedureDefinition";
DROP TABLE "ProcedureDefinition";
ALTER TABLE "new_ProcedureDefinition" RENAME TO "ProcedureDefinition";
CREATE INDEX "ProcedureDefinition_institutionId_idx" ON "ProcedureDefinition"("institutionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
