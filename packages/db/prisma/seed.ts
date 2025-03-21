import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt';
async function main() {
  const hashedPassword1 = await bcrypt.hash('kshitu', 10); // Hash password
  const hashedPassword2 = await bcrypt.hash('vaishnavi', 10);

  const kshitu = await prisma.user.upsert({
    where: { number: '9370492280' },
    update: {},
    create: {
      number: '9370492280',
      password: hashedPassword1,
      name: 'Kshitija',
      onRamp: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "120",
          provider: "HDFC Bank",
        },
      },
    },
  })
  // const vaishnavi = await prisma.user.upsert({
  //   where: { number: '9130806444' },
  //   update: {},
  //   create: {
  //     number: '9130806444',
  //     password: '12345678',
  //     name: '12345678',
  //     onRamp: {
  //       create: {
  //         startTime: new Date(),
  //         status: "Success",
  //         amount: 10000,
  //         token: "124",
  //         provider: "HDFC Bank",
  //       },
  //     },
  //   },
  // })
  // const kalpana = await prisma.user.upsert({
  //   where: { number: '9921040934' },
  //   update: {},
  //   create: {
  //     number: '9921040934',
  //     password: 'kalpana',
  //     name: 'Kalpana',
  //     onRamp: {
  //       create: {
  //         startTime: new Date(),
  //         status: "Failure",
  //         amount: 2000,
  //         token: "129",
  //         provider: "HDFC Bank",
  //       },
  //     },
  //   },
  // })
  // const krushna = await prisma.user.upsert({
  //   where: { number: '8552900963' },
  //   update: {},
  //   create: {
  //     number: '8552900963',
  //     password: '123456',
  //     name: 'Krushna',
  //     onRamp: {
  //       create: {
  //         startTime: new Date(),
  //         status: "Failure",
  //         amount: 2000,
  //         token: "130",
  //         provider: "HDFC Bank",
  //       },
  //     },
  //   },
  // })

  const vaishnavi = await prisma.user.upsert({
    where: { number: '1234567890' },
    update: {},
    create: {
      number: '1234567890',
      password: hashedPassword2,
      name: '12345678',
      onRamp: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 300,
          token: "230",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ kshitu,vaishnavi})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })