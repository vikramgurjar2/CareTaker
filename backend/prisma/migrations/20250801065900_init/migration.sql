-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PATIENT', 'DOCTOR');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('MARRIED', 'UNMARRIED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "gender" "Gender",
    "country" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "bloodGroup" TEXT,
    "userRole" "UserRole" NOT NULL DEFAULT 'PATIENT',
    "maritalStatus" "MaritalStatus",
    "profile_pic" TEXT NOT NULL,
    "documents" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "experiance" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "profile_pic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
