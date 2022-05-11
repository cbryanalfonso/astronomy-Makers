import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Home.css";
import { AstronomyAPI, BusquedaAPI, Result } from "../../Api/Interfaces";

export const Home = () => {
  const [data, setData] = useState<Result[]>([]);
  const [busquedaTitle, setBusquedaTitle] = useState("");
  const [busquedaData, setBusquedaData] = useState<BusquedaAPI[]>([]);
  const [busquedaIndicador, setBusquedaIndicador] = useState(false);
  const [radioButton, setRadioButton] = useState(false);
  const [radioButtonData, setRadioButtonData] = useState();
  const [dataModal, setDataModal] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
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

  const handleChange = async (evt: ChangeEvent<{ value: string }>) => {
    let busqueda = evt?.currentTarget?.value;
    setBusquedaTitle(busqueda);
    console.log(busqueda.toLowerCase());

    //console.log(evt.target.value);
  };

  const onChangeValue = (evt: any) => {
    console.log(evt.target.value);
    setRadioButtonData(evt.target.value);
  };

  const enviarDatos = async (evt: any) => {
    if (busquedaTitle !== "") {
      if (radioButtonData) {
        evt.preventDefault();
        // console.log("enviando datos ", busquedaTitle.toLowerCase());

        if (radioButtonData === "id") {
          const resp = await axios.get<BusquedaAPI[]>(
            `https://astroapinodejs.herokuapp.com/astronomy?id=${busquedaTitle}`
          );

          setBusquedaIndicador(true);
          if (resp.data.length === 0) {
            console.log("No se puede hermano");
            setError(true);
          } else {
            setBusquedaData(resp.data);
          }
        } else if (radioButtonData === "title") {
          const resp = await axios.get<BusquedaAPI[]>(
            `https://astroapinodejs.herokuapp.com/astronomy?search=${busquedaTitle.toLowerCase()}`
          );

          setBusquedaIndicador(true);
          if (resp.data.length === 0) {
           // console.log("No se puede hermano");
            setError(true);
          } else {
            setBusquedaData(resp.data);
          }
        }
      } else {
        alert("You must select an option (id or title)");
      }
    } else {
      alert("You must enter a value in the searchBar");
    }
  };

  const imprimirAstronomy = () => {
    return data.map(function (datos, i) {
      return (
        <>
          <a
            href="#openModal"
            onClick={() => {
              setDataModal(datos);
              setShowModal(true);
            }}
            className="linksImage"
            key={i}
          >
            <li className="contenedor">
              <img src={datos.hdurl} alt="Image" className="img" />
              <p>{datos.title}</p>
            </li>
          </a>

          <div id="openModal" className="modalDialog">
            <div>
              <a href="#close" title="Close" className="close">
                X
              </a>
              <div className="flexrow">
                <div className="img">
                  <img
                    src={datos.hdurl}
                    alt={datos.title}
                    className="img"
                    id="pokeImgModal"
                  />
                </div>

                <div className="alinearModalData colorModal">
                  <div className="centrarTitleModal" >
                    <p>{datos.title}</p>
                  </div>
                  <div className="bodyModal" >
                      <p>{datos.explanation}</p>
                      <br />
                      <br />
                      <p>See the full image in <a href={datos.url}> This link</a> </p>
                      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  const imprimirAstronomyBusqueda = () => {
    return busquedaData.map(function (datos, i) {
      return (
        <>
          <a
            href="#openModal"
            key={i}
            className="linksImage"
          >
            <li className="contenedor">
              <img src={datos.hdurl} alt="Image" className="img" />
              <p>{datos.title}</p>
            </li>
          </a>

         
          <div id="openModal" className="modalDialog">
            <div>
              <a href="#close" title="Close" className="close">
                X
              </a>
              <div className="flexrow">
                <div className="img">
                  <img
                    src={datos.hdurl}
                    alt={datos.title}
                    className="img"
                    id="pokeImgModal"
                  />
                </div>

                <div className="alinearModalData colorModal">
                  <div className="centrarTitleModal" >
                    <p>{datos.title}</p>
                  </div>
                  <div className="bodyModal" >
                      <p>{datos.explanation}</p>
                      <br />
                      <br />
                      <p>See the full image in <a href={datos.url}> This link</a> </p>
                      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  

  return (
    <div>
      <form onSubmit={enviarDatos}>
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
            onClick={() => {
              setBusquedaTitle("");
            }}
          >
            Clear
          </button>
        </div>
      </form>
      {/*  {showModal ?
        <>
          {modalResultado()}
        </> :
        null  
    } */}
      <div className="barraSearchFilters" onChange={onChangeValue.bind(this)}>
        <input type="radio" value="id" name="search" className="separacion" />{" "}
        Search by Id .
        <input
          type="radio"
          value="title"
          name="search"
          className="separacion"
        />{" "}
        Search by Title
      </div>

      {error ? (
        <>
          <div className="error">
            <p className="errorParrafo">There are no matches</p>
          </div>
        </>
      ) : (
        <>
          {/*  <FilterScreen /> */}
          {busquedaIndicador ? (
            <>
              <>
                <ul className="nav-menu11">{imprimirAstronomyBusqueda()}</ul>
              </>
            </>
          ) : (
            <>
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
                Previous
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
                Next
              </button>
            ) : null}
          </div>
            </>
          )}

          
        </>
      )}
      {/*       <a href="#openModal">Lanzar el modal</a> */}
    </div>
  );
};
