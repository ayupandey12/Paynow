-- CreateTable
CREATE TABLE "p2ptransfer" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startdate" TIMESTAMP(3) NOT NULL,
    "fromuserID" TEXT NOT NULL,
    "touserID" TEXT NOT NULL,

    CONSTRAINT "p2ptransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2ptransfer" ADD CONSTRAINT "p2ptransfer_fromuserID_fkey" FOREIGN KEY ("fromuserID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2ptransfer" ADD CONSTRAINT "p2ptransfer_touserID_fkey" FOREIGN KEY ("touserID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
