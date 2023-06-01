import React from "react";
import { BiDetail } from "react-icons/bi";
import { BsXSquare, BsCheckSquare} from "react-icons/bs";
import { Link } from "react-router-dom";

import { Row, Table } from "../general";

const AppointmentsTable = ({ appointments, min, type, to_approve }) => {
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

  return (
    <Table headers={headers}>
      {appointments?.map((appointment, index) => (
        <Row key={index} number={index} object={appointment} values={values}>
          {!to_approve ? 
            <Link to={`/wizyty/${appointment?.id}`}>
              <BiDetail size="2rem" />
            </Link>
          : 
            <>
               {/* DODAĆ MODALE DO ZMIANY STATUSU */}
              <Link >
                <BsCheckSquare size="2rem" style={{marginRight: '10px'}}/> 
              </Link>
              <Link>
                <BsXSquare size="2rem" /> 
              </Link>
            </>
          }
        </Row>
      ))}
    </Table>
  );
};

export default AppointmentsTable;
