-- Ejecutar UNA SOLA VEZ sobre la base de datos correcta, después de un backup.
-- No elimina tablas ni filas existentes.
BEGIN;

ALTER TABLE "Usuarios"
  ADD COLUMN IF NOT EXISTS "rol" VARCHAR(20) NOT NULL DEFAULT 'CENSISTA';

ALTER TABLE "Usuarios"
  DROP CONSTRAINT IF EXISTS "Usuarios_rol_check";
ALTER TABLE "Usuarios"
  ADD CONSTRAINT "Usuarios_rol_check"
  CHECK ("rol" IN ('ADMINISTRADOR', 'CENSISTA'));

-- Mantiene la tabla Perfil existente y asegura que cada usuario tenga como máximo un perfil.
ALTER TABLE "Perfil"
  ADD COLUMN IF NOT EXISTS "usuarioId" INTEGER;

CREATE UNIQUE INDEX IF NOT EXISTS "Perfil_usuarioId_unique"
  ON "Perfil" ("usuarioId")
  WHERE "usuarioId" IS NOT NULL;

CREATE TABLE IF NOT EXISTS "Censos" (
  "id" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(100) NOT NULL,
  "apellido" VARCHAR(100) NOT NULL,
  "integrantes" INTEGER NOT NULL CHECK ("integrantes" >= 1),
  "televisores" INTEGER NOT NULL CHECK ("televisores" >= 0),
  "latitud" DECIMAL(10,7) NULL CHECK ("latitud" IS NULL OR ("latitud" >= -90 AND "latitud" <= 90)),
  "longitud" DECIMAL(10,7) NULL CHECK ("longitud" IS NULL OR ("longitud" >= -180 AND "longitud" <= 180)),
  "usuarioId" INTEGER NOT NULL REFERENCES "Usuarios"("id") ON UPDATE CASCADE ON DELETE RESTRICT,
  "origen" VARCHAR(20) NOT NULL DEFAULT 'INDIVIDUAL' CHECK ("origen" IN ('INDIVIDUAL', 'MASIVO')),
  "creadoEn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Censos_usuarioId_idx" ON "Censos" ("usuarioId");
CREATE INDEX IF NOT EXISTS "Censos_coordenadas_idx" ON "Censos" ("latitud", "longitud");

COMMIT;

-- Después de iniciar sesión con una cuenta existente, promueve SOLO la cuenta
-- que tú elijas ejecutando por separado, sustituyendo el usuario:
-- UPDATE "Usuarios" SET "rol" = 'ADMINISTRADOR' WHERE "usuario" = 'TU_USUARIO';
