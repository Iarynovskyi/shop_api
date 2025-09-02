-- CreateTable
CREATE TABLE "public"."Products" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("Id")
);
