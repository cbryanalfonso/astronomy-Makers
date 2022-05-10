import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Home.css";
import { AstronomyAPI, Result } from "../../Api/Interfaces";
import { FilterScreen } from "../Filters/FilterScreen";

export const Home = () => {
  const [data, setData] = useState<Result[]>([]);
  const [busquedaTitle, setBusquedaTitle] = useState('')
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
          <br />{value:''}
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

  const handleChange = (evt : ChangeEvent<{ value: string }>)=>{
    setBusquedaTitle(evt?.currentTarget?.value)
    console.log(evt.target.value);
    

  }


  const enviarDatos = (evt : any)=>{
    evt.preventDefault();
    console.log('enviando datos ', busquedaTitle);
    
  }

  const imprimirAstronomy = () => {
    return data.map(function (datos, i) {
      return (
        <a
          onClick={() => {
            console.log("as");
          }}
          className="linksImage"
        >
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
      <form onSubmit={enviarDatos} >
        <div className="barraSearch">
          <input
            type="text"
            className="form-control btn-search "
            placeholder="Search by title"
            aria-label="Search by Title"
            value={busquedaTitle}
            onChange={handleChange}
          />
          <button
            className="btn btn-outline-secondary btn-width btn-primary"
            type="submit"
          >
            Search
          </button>
          <button
            className="btn btn-outline-secondary btn-width  btn-danger"
            type="button"
            onClick={() => {setBusquedaTitle('')}}
          >
            Clear
          </button>
        </div>
      </form>
      <FilterScreen />
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
              console.log(page.current);
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
