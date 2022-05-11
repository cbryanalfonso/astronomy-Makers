import React, { useState } from "react";

interface Props {
  onPress: () => void;
}

export const FilterScreen = () => {
  const [options, setOptions] = useState(false);

  return (
    <div className="btn-group">
     
     {/*  <p>Filtrado ...</p>
      <select name="pastel" id="pastel">
        <option value="Natural">3 Leches Natural</option>
        <option value="LecheChocolate">3 Leches con Chocolate</option>
        <option value="LecheKashlua">3 Leches con Kashlua</option>
        <option value="LecheFruta">3 Leches con Fruta</option>
        
      </select> */}

      {/*  <button type="button" 
      className="btn btn-info dropdown-toggle"
      onClick={()=>{
            setOptions(!options);
            console.log(options);
            
      }}
      >
        Título del botón <span className="caret"></span>
      </button>

      {
          options ?
          (
              <>
              <ul  role="menu">
        <li>
          <a href="#">Acción #1</a>
        </li>
        <li>
          <a href="#">Acción #2</a>
        </li>
        <li>
          <a href="#">Acción #3</a>
        </li>
        <li className="divider"></li>
        <li>
          <a href="#">Acción #4</a>
        </li>
      </ul>
              </>
          ) : null
      } */}
    </div>
  );
};
