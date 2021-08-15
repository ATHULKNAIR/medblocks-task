import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fhir } from "./fhir";
import Header from "./Header";

function Edit(props) {
  const id = props.match.params.id;

  const [check, setCheck] = useState(false);
  const [state, setstate] = useState({
    fname: "",
    lname: "",
    gender: "",
    birthDate: "",
    telecom: "",
    address: "",
    city: "",
    State: "",
    postalCode: "",
  });

  let history = useHistory();

  const updatePatientDetails = async () => {
    const payload = {
      resourceType: "Patient",
      id: id,
      name: [{ given: [state.fname], family: state.lname }],
      gender: state.gender,
      birthDate: state.birthDate,
      telecom: [{ value: state.telecom }],
      address: [
        {
          line: [state.address],
          city: state.city,
          state: state.State,
          postalCode: state.postalCode,
        },
      ],
    };
    let data = await fhir.put(`/Patient/${id}`, payload);
    return data;
  };

  
  var Telecom = ""
  var Address = ""
  var City = ""
  var State = ""
  var Postal = ""


  useEffect(() => {
    const getPatientDetail = async () => {
      let data = await fhir.get(`/Patient/${id}`);
      return data;
    };
    getPatientDetail().then(
      (response) => {
        const patient = response.data;

        if(patient.telecom){
          Telecom = patient.telecom[0]?.value
        }else{
          Telecom = ""
        }
        if(patient.address){
          Address = patient.address[0]?.line[0]
          City = patient.address[0]?.city
          State = patient.address[0]?.state
          Postal = patient.address[0]?.postalCode
        }else{
          Address = ""
          City = ""
          State = ""
          Postal = ""
        }
        console.log(patient.name[0].family)       
       
        setstate({
          fname: patient.name[0]?.given[0] ,
          lname: patient.name[0].family,
          gender: patient.gender,
          birthDate: patient.birthDate,
          telecom: Telecom ,
          address:Address ,
          city: City  ,
          State: State  ,
          postalCode: Postal  ,
        });
        console.log(patient);
        setCheck(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setstate((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if(state.gender)
    updatePatientDetails();
    history.push("/list");
  };
  return (
    <div>
      <Header home list tree />

      {check && (
        <div
          style={{
            // border: "2px solid black",
            height: "540px",
            margin: "20px",
            paddingTop: "10px",
            paddingLeft: "90px",
          }}
        >
          {/*    /////////////////////////////////////////////////////////////      First Name     ///////////////////////////////////// */}

          <div
            style={{
              // border: "2px solid",
              width: "fit-content",
              marginLeft: "100px",
              marginTop: "20px",
            }}
          >
            <div style={{ marginTop: "-20px" }}>
              <label style={{ fontSize: "20px",fontWeight:'bold' }} htmlFor="fname">
                First Name{" "}
              </label>
            </div>
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                id="fname"
                placeholder="Enter First Name"
                name="fname"
                value={state.fname }
                onChange={handleChange}
                style={{
                  borderRadius: "7px",
                  width: "480px",
                  height: "40px",
                  paddingLeft: "20px",
                }}
              />
            </div>
          </div>
          <div
            style={{
              // border: "2px solid",
              width: "fit-content",
              marginLeft: "700px",
              marginTop: "-82.5px",
            }}
          >
            <div style={{ marginTop: "-20px" }}>
              <label style={{ fontSize: "20px",fontWeight:'bold' }} htmlFor="fname">
                Patient ID{" "}
              </label>
            </div>
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                id="fname"
                placeholder="Enter First Name"
                name="fname"
                value={id}
                style={{
                  borderRadius: "7px",
                  width: "480px",
                  height: "40px",
                  paddingLeft: "20px",
                }}
              />
            </div>
          </div>

          {/*    /////////////////////////////////////////////////////////////      Last Name     ///////////////////////////////////// */}

          <div
            style={{
              // border: "2px solid",
              width: "fit-content",
              marginLeft: "100px",
              marginTop: "40px",
            }}
          >
            <div style={{ marginTop: "-21px" }}>
              <label style={{ fontSize: "20px",fontWeight:'bold' }} htmlFor="lname">
                Last Name{" "}
              </label>
            </div>
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                id="lname"
                placeholder="Enter Last Name"
                name="lname"
                value={state.lname }
                onChange={handleChange}
                style={{
                  borderRadius: "7px",
                  width: "480px",
                  height: "40px",
                  paddingLeft: "20px",
                }}
              />
            </div>
          </div>

          {/*    /////////////////////////////////////////////////////////////      GENDER     ///////////////////////////////////// */}

          <div
            style={{
              
              width: "fit-content",
              marginLeft: "1080px",
              marginTop: "-80px",
            }}
          >
            <div style={{ marginTop: "-21px" }}>
              <div style={{ fontSize: "20px",fontWeight:'bold' }} htmlFor="gender">
                Gender{" "}
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                id="gender"
                value={state.gender }
                name="gender"
                onChange={handleChange}
                style={{
                  
                  borderRadius: "7px",
                  width: "100px",
                  height: "38px",
                  paddingLeft: "20px",
                }}
              />
              </div>
          </div>

          {/*    /////////////////////////////////////////////////////////////      Date of Birth     ///////////////////////////////////// */}

          <div
            style={{
              // border: "2px solid",
              width: "fit-content",
              marginLeft: "700px",
              marginTop: "-90px",
            }}
          >
            <div
              style={{
                marginTop: '10px',
              }}
            >
              <label style={{ fontSize: "20px",fontWeight:'bold' }} htmlFor="birthDate">
                Date of Birth{" "}
              </label>
            </div>
            <div style={{ marginTop: "10px" }}>
              <input
                type="date"
                id="birthDate"
                value={state.birthDate }
                name="birthDate"
                onChange={handleChange}
                style={{
                  borderRadius: "7px",
                  width: "300px",
                  height: "40px",
                  paddingLeft: "20px",
                  fontFamily: "sans-serif",
                }}
              />
            </div>
          </div>

        {/*    /////////////////////////////////////////////////////////////      Phone Number     ///////////////////////////////////// */}

        <div
          style={{
            width: "fit-content",
            marginLeft: "100px",
            marginTop: "40px",
          }}
        >
            <div style={{ marginTop: "-20px" }}>
            <label style={{ fontSize: "20px",fontWeight:'bold' }} htmlFor="telecom">
              Phone Number
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="tel"
              id="telecom"
              placeholder="Enter Phone Number"
              value={state.telecom }
              name="telecom"
              minLength="10"
              required
              onChange={handleChange}
              style={{
                borderRadius: "7px",
                width: "480px",
                height: "40px",
                paddingLeft: "20px",
              }}
            />
          </div>
          </div>

        {/*    /////////////////////////////////////////////////////////////      Address line     ///////////////////////////////////// */}

        <div
          style={{
            width: "fit-content",
            marginLeft: "100px",
            marginTop: "40px",
          }}
        >
          <div style={{ marginTop: "-20px" }}>
            <label style={{ fontSize: "20px",fontWeight:'bold' }} htmlFor="address">
              Address Line
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <textarea
              id="address"
              placeholder="Enter your address"
              value={state.address }
              name="address"
              onChange={handleChange}
              style={{
                borderTop: "2px solid black",
                borderLeft: "2px solid black",
                borderBottom: "2px solid grey",
                borderRight: "2px solid grey",
                borderRadius: "7px",
                width: "480px",
                height: "50px",
                padding: "10px 0 10px 20px",
                fontSize: "21px",
                fontFamily: "sans-serif",
              }}
            />
          </div>
        </div>

         {/*    /////////////////////////////////////////////////////////////    Address City    ///////////////////////////////////// */}

        <div
          style={{
            width: "fit-content",
            marginLeft: "100px",
            marginTop: "30px",
          }}
        >
          <div style={{ marginTop: "-20px" }}>
            <label style={{ fontSize: "20px",fontWeight:'bold' }} htmlFor="city">
              Address City{" "}
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              id="city"
              placeholder="Enter your city"
              value={state.city }
              name="city"
              onChange={handleChange}
              style={{
                borderRadius: "7px",
                width: "480px",
                height: "40px",
                paddingLeft: "20px",
              }}
            />
          </div>
        </div>

        {/*    /////////////////////////////////////////////////////////////    Address State    ///////////////////////////////////// */}

        <div
          style={{
            // border: "2px solid",
            width: "fit-content",
            marginLeft: "700px",
            marginTop: "-312px",
          }}
        >
          <div style={{ marginTop: "-21px" }}>
            <label style={{ fontSize: "20px",fontWeight:'bold' }} htmlFor="State">
              Address State{" "}
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              id="State"
              placeholder="Enter your State"
              value={state.State }
              name="State"
              onChange={handleChange}
              style={{
                borderRadius: "7px",
                width: "480px",
                height: "40px",
                paddingLeft: "20px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            // border: "2px solid",
            width: "fit-content",
            marginLeft: "700px",
            marginTop: "19px",
          }}
        >
          <div>
            <label style={{ fontSize: "20px" ,fontWeight:'bold'}} htmlFor="postalCode">
              Postal Code {" "}
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            {" "}
            <input
              type="text"
              id="postalCode"
              placeholder="Enter your Postal Code "
              value={state.postalCode }
              name="postalCode"
              onChange={handleChange}
              style={{
                borderRadius: "7px",
                width: "480px",
                height: "40px",
                paddingLeft: "20px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            width: "fit-content",
            marginLeft: "900px",
            marginTop: "50px",
          }}
        >
          <button
            style={{
              backgroundColor: "rgb(42, 81, 165)  ",
              color:'white',
              width: "200px",
              height: "50px",
              fontSize: "20px",
              borderRadius: "10px",
              fontWeight: "bold"
            }}
            type="submit"
            onClick={handleSubmitClick}
          >
            Update Patient
          </button>
        </div>
      
        </div>
      )}
    </div>
  );
}

export default Edit;
