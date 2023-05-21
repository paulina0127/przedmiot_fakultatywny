import React from "react";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

import { Row, Table } from "../general";

const AppointmentsTable = ({ appointments, min, type }) => {
  const headers =
    type === "Pacjent"
      ? min
        ? ["Data", "Godzina", "Lekarz", "Szczegóły"]
        : ["Data", "Godzina", "Lekarz", "Status", "Szczegóły"]
      : type === "Lekarz"
      ? min
        ? ["Data", "Godzina", "Pacjent", "Szczegóły"]
        : ["Data", "Godzina", "Pacjent", "Status", "Szczegóły"]
      : min
      ? ["Data", "Godzina", "Lekarz", "Pacjent", "Szczegóły"]
      : ["Data", "Godzina", "Lekarz", "Pacjent", "Status", "Szczegóły"];

  const values =
    type === "Pacjent"
      ? min
        ? ["date", "time", "doctor"]
        : ["date", "time", "doctor", "status"]
      : type === "Lekarz"
      ? min
        ? ["date", "time", "patient"]
        : ["date", "time", "patient", "status"]
      : min
      ? ["date", "time", "doctor", "patient"]
      : ["date", "time", "doctor", "patient", "status"];

  console.log(headers, values);
  return (
    <Table headers={headers}>
      {appointments?.map((appointment, index) => (
        <Row key={index} number={index} object={appointment} values={values}>
          {
            <Link to={`/wizyty/${appointment?.id}`}>
              <BiDetail size="2rem" />
            </Link>
          }
        </Row>
      ))}
    </Table>
  );
};

export default AppointmentsTable;
