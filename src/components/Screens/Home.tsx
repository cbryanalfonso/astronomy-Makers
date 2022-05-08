import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponseAstronomy } from "../../Api/Interfaces";
import "./Home.css";

export const Home = () => {
  const [data, setData] = useState<ResponseAstronomy[]>([]);

  useEffect(() => {
    /*  fetch(
      "https://api.nasa.gov/planetary/apod?api_key=TXHC9of2v9UDWyRGhdCAz6KQYIs96FKATjEZYkFh&count=5"
    )
      .then((response) => response.json())
      .then((result) => {
          if(result){
              setData(result);
              //console.log(result)
          }
      })
      .catch((error) => console.log("error", error)); */

    loadAstronomy();
  }, []);

  const loadAstronomy = async () => {
    const resp = await axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=TXHC9of2v9UDWyRGhdCAz6KQYIs96FKATjEZYkFh&count=9"
    );

    //console.log(resp.data);
    //setData(resp.data)
    //mapAPIList(resp.data)
    setData(resp.data);
  };

  const mapAPIList = (astronomyList: ResponseAstronomy[]) => {
    return astronomyList.map(function (datos, i) {
      return (
        <div key={i}>
          {/* <p>{datos}</p> */}
          <br />
        </div>
      );
    });
  };

  const imprimirImages = () => {
    return data.map(function (datos, i) {
      return (
        <div
          key={i}
          style={{
            flexDirection: "row",
            backgroundColor: "blue",
            width: "10%",
          }}
        >
          <p>{datos.date}</p>
          <br />
        </div>
      );
    });
  };

  const imprimirAstronomy = () => {
    return data.map(function (datos, i) {
      return (
        <a href="#" className="linksImage">
          <li key={i} className="contenedor">
            <img src={datos.hdurl} alt="Image" className="img" />
            <p>{datos.title}</p>
          </li>
        </a>
      );
    });
  };

  return (
    <div>
      <ul className="nav-menu11">{imprimirAstronomy()}</ul>
      <br />
      <div id="outer">
        <a href="" className="inner">
          Anterior
        </a>
        <a href="" className="inner">
          Siguiente
        </a>
      </div>
    </div>
  );
};
