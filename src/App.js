import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import ImportCalculator from "./components/ImportCalculator";

const apiUrl = process.env.REACT_APP_API_URL;

const gradientStyle = {
  background: "linear-gradient(to right, #1D3364, #211B57)",
};

const App = () => {
  const [version, setVersion] = useState("");
  const [telegram, setTelegram] = useState("");
  const [informacion, setinformacion] = useState("");
  const [urlcalculadora, seturlcalculadora] = useState("");

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`${apiUrl}/tasa`);
        if (!response.ok) {
          throw new Error("Error al obtener informacion");
        }
        const data = await response.json();
        setVersion(data.info);
        setTelegram(data.alias);
        setinformacion(data.otros);
        seturlcalculadora(data.urlcalculadora);
      } catch (err) {
        console.log("error");
      }
    };

    fetchExchangeRate();
  }, []);

  return (
    <div className="min-h-screen py-4 px-2 rounded-sm" style={gradientStyle}>
      <ImportCalculator ver={setVersion} teleg={setTelegram} />
      {/*<div
        className="mt-3 text-sm flex justify-center text-center text-white bottom-0"
        style={gradientStyle}
      >
        Desarrollado por GMZone
      </div>*/}
      <div
        className="mt-1 text-sm flex absolute text-white bottom-9"
        style={gradientStyle}
      >
        <a className="ml-2" href={`https://t.me/${telegram}`} target="_new">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 16 16"
          >
            <path
              fill="#0891b2"
              fill-rule="evenodd"
              d="M5.254 8.521L9.61 5.86a.75.75 0 0 1 .782 1.28L6.586 9.465L9.77 12.65a1.2 1.2 0 0 0 1.973-.433l2.692-7.308a1.045 1.045 0 0 0-.98-1.408h-.105q-.151 0-.298.04L2.022 6.509a.707.707 0 0 0 .046 1.375zm-3.48.834L5 10l3.71 3.71a2.7 2.7 0 0 0 4.44-.976l2.693-7.308A2.544 2.544 0 0 0 13.454 2h-.104c-.232 0-.464.03-.688.091l-11.03 2.97a2.207 2.207 0 0 0 .142 4.294"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a className="ml-2" href={`https://t.me/${telegram}`} target="_new">
          Desarrollo GMZone
        </a>
      </div>
      <div
        className="mb-2 ml-2 text-sm flex text-white absolute left-0 bottom-0"
        style={gradientStyle}
      >
        <a
          className="ml-2"
          href={`https://t.me/${urlcalculadora}`}
          target="_new"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width="18"
            height="18"
            className="text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>
        </a>
        <a className="ml-2" href={`${urlcalculadora}`} target="_new">
          Descargar App
        </a>
      </div>
      <div className="text-yellow-300 font-extralight text-sm text-justify bottom-0">
        {parse(`${informacion}`)}
      </div>
      <div className="text-white text-sm mb-2 mr-2 absolute bottom-0 right-0">
        v1.0.0
      </div>
    </div>
  );
};

export default App;

// DONE
