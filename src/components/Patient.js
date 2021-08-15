import React, { useState, useEffect } from "react";
import { fhir } from "./fhir";
import Header from "./Header";

function Patient(props) {
  const id = props.match.params.id;

  const [patient, setPatient] = useState({});
  const [state, setstate] = useState(false);

  useEffect(() => {
    const getPatientDetail = async () => {
      let data = await fhir.get(`/Patient/${id}`);
      return data;
    };
    getPatientDetail().then(
      (response) => {
        const patient = response.data;
        setPatient(patient);
        console.log(patient);
        setstate(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [id]);

  return (
    <div>
      <Header home register list tree />

      {state && (
        <div
          style={{
            border: "2px solid black",
            // width: "fit-contnet",
            margin: "40px 400px 0px 400px",
          }}
        >
          <div
            style={{
              border: "2px solid black",
              width: "350px",
              backgroundColor: "white",
              marginTop: "-25px",
              marginLeft: "170px",
              paddingLeft: "25px",
              paddingRight: "25px",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            <p>ID : {patient?.id}</p>
          </div>
          <div
            style={{
              fontSize: "23px",
              // border: "2px solid black",
              margin: "20px 50px 50px 120px",
              paddingLeft: "80px",
              paddingTop: "10px",
            }}
          >
            <p>
              {patient?.name[0] && (
                <p>
                  {patient?.resourceType} :{" "}
                  <span style={{ fontSize: "28px", fontWeight: "700" }}>
                    {patient?.name[0].given[0]}
                    {patient?.name[0].family}
                  </span>{" "}
                </p>
              )}
            </p>
            <p style={{ marginTop: "-10px" }}>
              Gender :{" "}
              <span style={{ fontWeight: "700" }}>{patient?.gender}</span>
            </p>
              {patient.birthDate &&
            <p style={{ marginTop: "-10px" }}>
              Date of Birth :{" "}
              <span style={{ fontWeight: "700" }}>{patient?.birthDate}</span>
            </p>
            }

            <p style={{ marginTop: "-10px" }}>
              {patient?.telecom && patient?.telecom[0]?.value && (
                <p>
                  Phone Number :{" "}
                  <span style={{ fontWeight: "700" }}>
                    {patient?.telecom[0].value}
                  </span>
                </p>
              )}
            </p>
            {patient.address && (
              <div style={{ marginTop: "-10px" }}>
                {patient?.address[0]?.line[0] && (
                  <p>
                    Address :{" "}
                    <span style={{ fontWeight: "700" }}>
                      {patient.address[0].line[0]}
                    </span>
                  </p>
                )}
                {patient.address[0].city && <p style={{ marginTop: "-10px" }}>City : <span style={{ fontWeight: "700" }}>{patient.address[0].city}</span></p>}
                {patient.address[0].state &&   <p style={{ marginTop: "-10px" }}>State : <span style={{ fontWeight: "700" }}>{patient.address[0].state}</span></p>}
                {patient.address[0].postalCode && <p style={{ marginTop: "-10px" }}>Postal Code : <span style={{ fontWeight: "700" }}>{patient.address[0].postalCode}</span></p>}
              
                
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Patient;
