const express = require("express");
const {
  createWashingMachine,
  getAllWashingMachines,
  getSingleWashingMachine,
  updateWashingMachine,
} = require("../controllers/washingMachine");

const router = express.Router();

router.route("/create/watching/machine").post(createWashingMachine);
router.route("/all/watching/machines").get(getAllWashingMachines);
router.route("/single/watching/machine/:id").get(getSingleWashingMachine);
router.route("/update/watching/machine/:id").put(updateWashingMachine);

module.exports = router;
