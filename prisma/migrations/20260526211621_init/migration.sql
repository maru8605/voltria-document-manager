-- CreateTable
CREATE TABLE "Remito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "observacion" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "RemitoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "producto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" REAL NOT NULL,
    "remitoId" INTEGER NOT NULL,
    CONSTRAINT "RemitoItem_remitoId_fkey" FOREIGN KEY ("remitoId") REFERENCES "Remito" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
