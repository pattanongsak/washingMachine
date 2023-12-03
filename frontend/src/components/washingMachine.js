import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./washing_MDetails.css";
import {
  clearErrors,
  getWashingMachineDetails,
  updateWashingMachine,
} from "../actions/washingM_Actions";
import { UPDATE_WASHING_MACHINE_RESET } from "../constants/washingM_constants";

function WashingMachine({ match, history }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, washingMachine } = useSelector(
    (state) => state.washingMachineDetail
  );

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.washingMachine
  );

  const [washingMachineCoin, setWashingMachineCoin] = useState("");
  const [washingMachineStatus, setWashingMachineStatus] = useState(0);

  const washingMachineId = match.params.id;

  useEffect(() => {
    if (washingMachine && washingMachine._id !== washingMachineId) {
      dispatch(getWashingMachineDetails(washingMachineId));
    } else {
      setWashingMachineCoin(washingMachine.washingMachineCoin);
      setWashingMachineStatus(washingMachine.washingMachineStatus);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("บันทุกข้อมูลสำเร็จ");
      history.push("/");
      dispatch({ type: UPDATE_WASHING_MACHINE_RESET });
      window.location.reload();
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    washingMachineId,
    isUpdated,
    updateError,
    washingMachine
  ]);

  const updateWashingMachineSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("washingMachineCoin", washingMachineCoin);
    myForm.set("washingMachineStatus", washingMachineStatus);

    dispatch(updateWashingMachine(washingMachineId, myForm));
  };

  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <form
          className="boxDetails"
          encType="multipart/form-data"
          onSubmit={updateWashingMachineSubmitHandler}
        >
          <div className="WashingMachineDetails">
            <div className="grid-item">
              <div className="imgDetail">
                <img
                  src={washingMachine.washingMachineImage}
                  alt="washingMachine"
                />
              </div>
            </div>

            <div className="grid-item">
              <div className="derailsBlock">
                <p>
                  เครื่องที่ : <b>{washingMachine.washingMachineNumber}</b>
                </p>
                <h2>ยี่ห้อ : {washingMachine.washingMachineName}</h2>
                <p>รุ่น : {washingMachine.washingMachineModel} </p>
                <p>สถานะ : {washingMachine.washingMachineStatus}</p>

                <select
                  name="washingMachineCoin"
                  value={washingMachineCoin}
                  onChange={(e) =>
                    setWashingMachineCoin(Number(e.target.value))
                  }
                >
                  <option value="">เลือก</option>
                  <option value="20">20 บาท</option>
                  <option value="50">50 บาท</option>
                </select>

                <button
                  type="submit"
                  onClick={() => setWashingMachineStatus("กำลังใช้งาน")}
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
}

export default WashingMachine;
