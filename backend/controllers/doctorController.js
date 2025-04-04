const prisma = new (require("@prisma/client").PrismaClient)();

const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await prisma.doctor.findMany();
  res.status(200).json({
    success: true,
    doctors,
  });
});

exports.addDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctorData = req.body;
  const newdoctor = await prisma.doctor.create({
    data: {
      ...doctorData,
      name: doctorData.name.toUpperCase(),
      speciality: doctorData.speciality,
      experiance: doctorData.experiance,
      address: doctorData.address,
      profile_pic: doctorData.profile_pic,
    },
  });

  res.status(200).json(newdoctor);
});
