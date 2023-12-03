import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./washingMachine.css";
import { clearErrors, getAllWashingMachine } from "../actions/washingM_Actions";
import { Link } from "react-router-dom";

function WashingMachine() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, washingMachines } = useSelector(
    (state) => state.allWashingMachine
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllWashingMachine());
  }, [dispatch, error, alert]);

  return (
    <div className="boxContainer">
      <div className="card-container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Fragment>
            {washingMachines?.map((itemData, idx) => (
              <div className="card" key={idx._id}>
                <img
                  src={itemData.washingMachineImage}
                  alt="washingMachine"
                  width={100}
                />

                <p>เครื่องที่ : {itemData.washingMachineNumber}</p>
                <h1>ยี่ห้อ : {itemData.washingMachineName}</h1>
                <p className="model">รุ่น : {itemData.washingMachineModel}</p>

                <p
                  className={
                    itemData.washingMachineStatus === "พร้อมใช้งาน"
                      ? "statusColor1"
                      : itemData.washingMachineStatus === "เหลือเวลา 1 นาที"
                        ? "statusColor2"
                        : itemData.washingMachineStatus === "กำลังใช้งาน"
                          ? "statusColor3"
                          : "statusColor1"
                  }
                >
                  สถานะ : {itemData.washingMachineStatus}
                </p>

                {itemData.washingMachineStatus === "พร้อมใช้งาน" ? (
                  <Link to={`/washing/machine/detail/${itemData._id}`}>
                    <button className="btnStart">เลือก</button>
                  </Link>
                ) : (
                  <button className="btnWait">กำลังใช้งาน</button>
                )}
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default WashingMachine;
