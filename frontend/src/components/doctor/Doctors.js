import React from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Row, Table } from "../general";

const Doctors = ({ doctors }) => {
  return (
    <Table headers={["Imię", "Nazwisko", "Specjalizacje", "Karta lekarza"]}>
      {doctors.map((doctor, index) => (
        <Row
          key={index}
          number={index}
          object={doctor}
          values={["first_name", "last_name"]}
        >
          {doctor?.specializations
            .map((spec) =>
              doctor?.gender === "Kobieta" ? spec.fem_name : spec.name
            )
            .join(", ")}
          {
            <Link to={`/lekarze/${doctor?.id}`}>
              <BsFillPersonVcardFill size="2rem" />
            </Link>
          }
        </Row>
      ))}
    </Table>
  );
};

export default Doctors;
