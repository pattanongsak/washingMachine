const WashingMachine = require("../models/washingMachine");
const catchAsyncErrors = require("./catchAsyncErrors");
const { lineNotify } = require("../lineNotify/lineNotify");

const tokenLine = "cdLhyCGETUAfEmQTk2eJP43Qri7eGOYq52r5mril4MV";

exports.createWashingMachine = catchAsyncErrors(async (req, res, next) => {
  const {
    washingMachineNumber,
    washingMachineName,
    washingMachineModel,
    washingMachineImage,
  } = req.body;

  const washingMachineData = await WashingMachine.create({
    washingMachineNumber,
    washingMachineName,
    washingMachineModel,
    washingMachineImage,
  });

  res.status(201).json({
    success: true,
    washingMachineData,
  });
});

exports.getAllWashingMachines = catchAsyncErrors(async (req, res, next) => {
  const washingMachines = await WashingMachine.find();

  res.status(200).json({
    success: true,
    washingMachines,
  });
});

exports.getSingleWashingMachine = catchAsyncErrors(async (req, res, next) => {
  const washingMachine = await WashingMachine.findById(req.params.id);

  if (!washingMachine) {
    return console.log("ไม่มีข้อมูล");
  }

  res.status(200).json({
    success: true,
    washingMachine,
  });
});

exports.updateWashingMachine = catchAsyncErrors(async (req, res, next) => {
  let washingMachineDataGlobal = await WashingMachine.findById(req.params.id);

  const updateWashingMachineData = {
    washingMachineCoin: req.body.washingMachineCoin,
    washingMachineStatus: req.body.washingMachineStatus,
  };

  try {
    if (updateWashingMachineData.washingMachineCoin) {

      setTimeout(async () => {
        washingMachineDataGlobal = await WashingMachine.findById(req.params.id);

        const text =
          "เครื่องที่ " +
          washingMachineDataGlobal.washingMachineNumber +
          " เหลือเวลา 1 นาที";
        await lineNotify(tokenLine, text);

        washingMachineDataGlobal.washingMachineStatus = "เหลือเวลา 1 นาที";
        await washingMachineDataGlobal.save();

        setTimeout(async () => {
          washingMachineDataGlobal = await WashingMachine.findById(
            req.params.id
          );

          const text =
            "เครื่องที่ " +
            washingMachineDataGlobal.washingMachineNumber +
            " หมดเวลาแล้ว";
          await lineNotify(tokenLine, text);

          washingMachineDataGlobal.washingMachineCoin = 0;
          washingMachineDataGlobal.washingMachineStatus = "พร้อมใช้งาน";
          await washingMachineDataGlobal.save();
          next();
        }, 60000);
      }, 120000);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server fail");
  }

  const washingMachine = await WashingMachine.findByIdAndUpdate(
    req.params.id,
    updateWashingMachineData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    washingMachine,
  });
});
