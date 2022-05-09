import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; 
import "./Home.css";
import { AstronomyAPI, Result } from "../../Api/Interfaces";

export const Home = () => {
  const [data, setData] = useState<Result[]>([]);
  const page = useRef(1);
  const [urlAPI, setUrlAPI] = useState(
    `https://astroapinodejs.herokuapp.com/astronomy?page=1&limit=9`
  );

  useEffect(() => {
    loadAstronomy();
  }, [urlAPI]);

  const loadAstronomy = async () => {
    const resp = await axios.get<AstronomyAPI>(urlAPI);
    setData(resp.data.results);
  };

  /* const mapAPIList = (astronomyList: Result[]) => {
    return astronomyList.map(function (datos, i) {
      return (
        <div key={i}>
           <p>{datos}</p> 
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
          <p>{datos.title}</p>
          <br />
        </div>
      );
    });
  }; */

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
        {page.current < 2 ? null : (
          <button
            className="inner"
            onClick={() => {
              page.current = page.current - 1;
              console.log(page.current);
              setUrlAPI(
                `https://astroapinodejs.herokuapp.com/astronomy?page=${page.current}&limit=9`
              );
            }}
          >
            Anterior
          </button>
        )}
        {page.current < 12 ? (
          <button
            className="inner"
            onClick={() => {
              page.current = page.current + 1;
              console.log(page.current)
              setUrlAPI(
                `https://astroapinodejs.herokuapp.com/astronomy?page=${page.current}&limit=9`
              );
            }}
          >
            Siguiente
          </button>
        ) : null}
      </div>
    </div>
  );
};
