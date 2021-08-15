import React, { useState } from "react";
import { fhir } from "./fhir";
import Header from "./Header";

function Register(props) {
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

  
  const patientRegister = async () => {
    const payload = {
      resourceType: "Patient",
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

    if (state.gender  && state.fname) {
      await fhir
      .post(`/Patient`, payload)
      .then((response) => {
        if (response.status === (200 || 201)) {
            setstate((prevState) => ({
              ...prevState,
              successMessage:
              "Registration Successful . Redirecting to home page...",
            }));
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        alert('Regsitration Successful. Takes upto 1 minute to finish processing')
        
        window.location.href = "/list"
      } else {
        if(!state.fname){
          alert("First Name not added");   
        }else if(!state.gender){
          alert("Gender not added");   
        }else if(state.telecom && state.telecom.length!==10){
          alert('Phone number should be 10 digits')
        }else{
          alert("Error Occured while registering..")
        }
      }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setstate((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    patientRegister(); 
  
   
  
  };

  return (
    <div>
      <Header home list tree />

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
            <label
              style={{ fontSize: "20px", fontWeight: "bold" }}
              htmlFor="fname"
            >
              First Name *{" "}
            </label>
          </div>

          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              id="fname"
              placeholder="Enter First Name"
              name="fname"
              value={state.fname}
              onChange={handleChange}
              style={{
                borderRadius: "7px",
                width: "480px",
                height: "40px",
                paddingLeft: "20px",
              }}
              required
            />
          </div>
        </div>

        {/*    /////////////////////////////////////////////////////////////      Last Name     ///////////////////////////////////// */}

        <div
          style={{
            // border: "2px solid",
            width: "fit-content",
            marginLeft: "700px",
            marginTop: "-82px",
          }}
        >
          <div style={{ marginTop: "-21px" }}>
            <label
              style={{ fontSize: "20px", fontWeight: "bold" }}
              htmlFor="lname"
            >
              Last Name{" "}
            </label>
          </div>

          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              id="lname"
              placeholder="Enter Last Name"
              name="lname"
              value={state.lname}
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
            marginLeft: "100px",
            marginTop: "35px",
          }}
          className="radio-toolbar"
        >
          <div style={{ marginTop: "-21px" }}>
            <div
              style={{ fontSize: "20px", fontWeight: "bold" }}
              htmlFor="gender"
            >
              Gender *{" "}
            </div>
          </div>
          <div style={{ marginLeft: "0px", marginTop: "10px" }}>
            <input
              type="radio"
              id="gender"
              value={state.gender || "male"}
              name="gender"
              onChange={handleChange}
              style={{ width: "100px", height: "30px", marginTop: "10px" }}
            />
            <label htmlFor="male" style={{ fontSize: "20px" }}>
              Male
            </label>
            <input
              type="radio"
              id="gender"
              value={state.gender || "female"}
              name="gender"
              onChange={handleChange}
              style={{
                width: "100px",
                height: "30px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            />
            <label
              htmlFor="female"
              style={{ fontSize: "20px", marginLeft: "10px" }}
            >
              Female
            </label>
            <input
              type="radio"
              id="gender"
              value={state.gender || "other"}
              name="gender"
              onChange={handleChange}
              style={{ width: "100px", height: "30px", marginTop: "10px" }}
            />
            <label
              htmlFor="other"
              style={{
                fontSize: "20px",
                marginLeft: "10px",
              }}
            >
              Other
            </label>
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
              marginTop: "-21px",
            }}
          >
            <label
              style={{ fontSize: "20px", fontWeight: "bold" }}
              htmlFor="birthDate"
            >
              Date of Birth{" "}
            </label>
          </div>

          <div style={{ marginTop: "10px" }}>
            <input
              type="date"
              id="birthDate"
              value={state.birthDate}
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
            marginTop: "50px",
          }}
        >
          <div style={{ marginTop: "-20px" }}>
            <label
              style={{ fontSize: "20px", fontWeight: "bold" }}
              htmlFor="telecom"
            >
              Phone Number
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="tel"
              id="telecom"
              placeholder="Enter Phone Number"
              value={state.telecom}
              name="telecom"
              maxlength="10"
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
            <label
              style={{ fontSize: "20px", fontWeight: "bold" }}
              htmlFor="address"
            >
              Address Line
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <textarea
              id="address"
              placeholder="Enter your address"
              value={state.address}
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
                padding: "15px 0 15px 20px",
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
            <label
              style={{ fontSize: "20px", fontWeight: "bold" }}
              htmlFor="city"
            >
              Address City{" "}
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              id="city"
              placeholder="Enter your city"
              value={state.city}
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
            marginTop: "-320px",
          }}
        >
          <div style={{ marginTop: "-21px" }}>
            <label
              style={{ fontSize: "20px", fontWeight: "bold" }}
              htmlFor="State"
            >
              Address State{" "}
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              id="State"
              placeholder="Enter your State"
              value={state.State}
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
            <label
              style={{ fontSize: "20px", fontWeight: "bold" }}
              htmlFor="postalCode"
            >
              Postal Code{" "}
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            {" "}
            <input
              type="text"
              id="postalCode"
              placeholder="Enter your Postal Code "
              value={state.postalCode}
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
              color: "white",
              width: "150px",
              height: "50px",
              fontSize: "20px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
            type="submit"
            onClick={handleSubmitClick}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
