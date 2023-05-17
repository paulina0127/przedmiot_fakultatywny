import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import avatar from "../../images/avatar.png";
import panel from "../UserPanel.module.css";

const DoctorForm = ({ doctorId, initialValues }) => {
  return (
    <div className="container container-bg">
      <div className="container-bg-content">
        <h2 className={panel.h2}>Karta lekarza</h2>
        <div className="threeColumnGrid gap-5">
          <div className="gridCenter">
            <div className={panel.avatarContainer}>
              <img
                src={initialValues?.image ? initialValues?.image : avatar}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
          </div>

          <div className="d-flex flex-column">
            <h3 className={panel.h3}>Dane osobowe</h3>
            <div className="formGroup">
              <h4 className={panel.h4}>Imię</h4>
              <div className="form-group mb-3">
                <label className="mx-2 my-2 text-muted"></label>
                <input
                  name="first_name"
                  type="text"
                  value={initialValues.first_name}
                  disabled={true}
                  className="form-control rounded-pill border-2 shadow-sm px-4"
                />
              </div>
            </div>

            <div className="formGroup">
              <h4 className={panel.h4}>Nazwisko</h4>
              <div className="form-group mb-3">
                <label className="mx-2 my-2 text-muted"></label>
                <input
                  name="last_name"
                  type="text"
                  value={initialValues.last_name}
                  disabled={true}
                  className="form-control rounded-pill border-2 shadow-sm px-4"
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column">
            <h3 className={panel.h3}>Specjalizacje</h3>
            <ul>
              {initialValues?.specializations?.map((specialization) => (
                <li key={specialization.name}>
                  {initialValues.gender === "Kobieta"
                    ? specialization.fem_name
                    : specialization.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="btnGroup" style={{ gridColumn: "span 3" }}>
            <Link to={`/lekarze/${doctorId}/wizyty`}>
              <button className="btnSquare bg-dark-blue clr-white">
                Wizyty
              </button>
            </Link>
            <Link to={`/lekarze/${doctorId}/pacjenci`}>
              <button className="btnSquare bg-blue clr-white">Pacjenci</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorForm;
