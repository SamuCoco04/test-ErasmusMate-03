import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.institution.upsert({
    where: { id: "inst-home-1" },
    update: {
      name: "Universidad de Sevilla",
      code: "US",
      country: "Spain",
    },
    create: {
      id: "inst-home-1",
      name: "Universidad de Sevilla",
      code: "US",
      country: "Spain",
    },
  });

  await prisma.institution.upsert({
    where: { id: "inst-host-1" },
    update: {
      name: "KU Leuven",
      code: "KUL",
      country: "Belgium",
    },
    create: {
      id: "inst-host-1",
      name: "KU Leuven",
      code: "KUL",
      country: "Belgium",
    },
  });

  await prisma.user.upsert({
    where: { id: "student-1" },
    update: {
      email: "student1@erasmusmate.demo",
      displayName: "Student One",
      role: "STUDENT",
      institutionId: "inst-home-1",
    },
    create: {
      id: "student-1",
      email: "student1@erasmusmate.demo",
      displayName: "Student One",
      role: "STUDENT",
      institutionId: "inst-home-1",
    },
  });

  await prisma.user.upsert({
    where: { id: "coordinator-1" },
    update: {
      email: "coordinator1@erasmusmate.demo",
      displayName: "Coordinator One",
      role: "COORDINATOR",
      institutionId: "inst-home-1",
    },
    create: {
      id: "coordinator-1",
      email: "coordinator1@erasmusmate.demo",
      displayName: "Coordinator One",
      role: "COORDINATOR",
      institutionId: "inst-home-1",
    },
  });

  await prisma.user.upsert({
    where: { id: "admin-1" },
    update: {
      email: "admin1@erasmusmate.demo",
      displayName: "Admin One",
      role: "ADMIN",
      institutionId: "inst-home-1",
    },
    create: {
      id: "admin-1",
      email: "admin1@erasmusmate.demo",
      displayName: "Admin One",
      role: "ADMIN",
      institutionId: "inst-home-1",
    },
  });

  await prisma.mobilityRecord.upsert({
    where: { id: "mobility-1" },
    update: {
      studentId: "student-1",
      homeInstitutionId: "inst-home-1",
      hostInstitutionId: "inst-host-1",
      mobilityStatus: "DRAFT",
      startDate: new Date("2026-09-01T00:00:00.000Z"),
      endDate: new Date("2027-01-31T00:00:00.000Z"),
    },
    create: {
      id: "mobility-1",
      studentId: "student-1",
      homeInstitutionId: "inst-home-1",
      hostInstitutionId: "inst-host-1",
      mobilityStatus: "DRAFT",
      startDate: new Date("2026-09-01T00:00:00.000Z"),
      endDate: new Date("2027-01-31T00:00:00.000Z"),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
