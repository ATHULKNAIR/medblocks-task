import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fhir } from "./fhir";
import Header from "./Header";

function List() {
  const [lists, setList] = useState([]);

  const getList = async () => {
    let data = await fhir.get("/Patient");
    // window.location.reload()
    return data;
  };

  useEffect(() => {
    getList().then(
      (response) => {
        let lists = response.data;
        setList(lists);
        // console.log(lists);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const DeletePatient = async (id) => {
    await fhir.delete(`/Patient/${id}`);
    alert("Patient Deleted Successfully");
    window.location.reload();
  };

  const handleDelete = (e) => {
    let id = e.target.value;
    DeletePatient(id);
  };

  return (
    <div>
      <Header home register tree />
      <div
        style={{
          border: "2px solid black",
          margin: "30px 40px 20px 40px",
          padding: "40px",
        }}
      >
        <div
          style={{
            border: "2px solid black",
            backgroundColor: "white",
            width: "125px",
            paddingLeft: "25px",
            padding: "10px",
            marginTop: "-60px",
            marginLeft: "1200px",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          {" "}
          PATIENT : {JSON.stringify(lists.total)}
        </div>
        <div
          style={{
            // border: "2px solid black",
            paddingRight: "40px",
            paddingLeft: "30px",
            margin: "50px 100px 0 100px",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "700" }}>
            <span style={{ marginLeft: "50px" }}>No.</span>
            <span style={{ marginLeft: "70px" }}>Name</span>
            <span style={{ marginLeft: "250px" }}>Age</span>
            <span style={{ marginLeft: "200px" }}>Gender</span>
            <span style={{ marginLeft: "210px" }}>Actions</span>
            <hr></hr>
          </div>
          <div
            style={{
              // border: "2px solid black",
              margin: "0 30px",
            }}
          >
            {" "}
            <ol>
              {lists &&
                lists?.entry?.map((list) => (
                  <li
                    key={list.resource.id}
                    style={{ padding: "30px 20px 20px 20px" }}
                  >
                    <div
                      style={{
                        marginLeft: "50px",
                        marginTop: "-20px",
                        //   border: "2px solid black",
                        width: "200px",
                      }}
                    >
                      <Link to={`/list/${list?.resource.id}`}>
                        {`${list?.resource.name[0].given}`} {list.resource?.name[0].family && <span>{list.resource?.name[0].family}</span>}
                      </Link>
                    </div>
                    <div
                      style={{
                        //   border: "2px solid black",
                        width: "100px",
                        marginLeft: "350px",
                        marginTop: "-22px",
                      }}
                    >
                      {list.resource?.birthDate ? <span>{`${new Date().getFullYear() - list.resource.birthDate?.split("-")[0]} years`}</span>:"--------"}
                      
                      </div>
                    <div
                      style={{
                        //   border: "2px solid black",
                        width: "100px",
                        marginLeft: "615px",
                        marginTop: "-22px",
                      }}
                    >
                      {list.resource.gender === "male" && "M"}
                      {list.resource.gender === "female" && "F"}
                      {list.resource.gender === "Other" && "O"}
                    </div>

                    <div
                      style={{
                        //   border: "2px solid black",
                        width: "40px",
                        marginLeft: "850px",
                        marginTop: "-22px",
                      }}
                    >
                      <Link to={`/edit/${list?.resource.id}`}>Edit</Link>
                    </div>
                    <div
                      style={{
                        //   border: "2px solid black",
                        width: "50px",
                        marginLeft: "900px",
                        marginTop: "-22px",
                      }}
                    >
                      <button value={list?.resource.id} onClick={handleDelete}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
