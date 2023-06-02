import React from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Row, Table } from "../general";

const PatientsTable = ({ patients, min }) => {
  const headers = min
    ? ["Imię", "Nazwisko", "Data urodzenia", "Karta pacjenta"]
    : [
        "Imię",
        "Nazwisko",
        "Pesel",
        "Data urodzenia",
        "Adres zamieszkania",
        "Karta pacjenta",
      ];

  const values = min
    ? ["first_name", "last_name", "birthdate"]
    : ["first_name", "last_name", "pesel", "birthdate", "location"];

  return (
    <Table headers={headers}>
      {patients?.map((patient, index) => (
        <Row key={index} number={index} object={patient} values={values}>
          {
            <Link to={`/pacjenci/${patient?.id}`} className="svgLink">
              <BsFillPersonVcardFill size="2rem" />
            </Link>
          }
        </Row>
      ))}
    </Table>
  );
};

export default PatientsTable;
