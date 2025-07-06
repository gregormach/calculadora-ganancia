import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const ExchangeRate = ({
  exchangeRUsd,
  exchangeREur,
  exchangeRCny,
  porcentajeCal,
}) => {
  const [exchangeRateUsd, setExchangeRateUsd] = useState(null);
  const [exchangeRateEur, setExchangeRateEur] = useState(null);
  const [exchangeRateCny, setExchangeRateCny] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formDate, setFormDate] = useState({
    fecha: new Date()
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("-"),
  });
  const [porcentaje, setPorcentaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 3) {
      return true;
    }
    if (value > 100 || value < 0) {
      return true;
    }
    porcentajeCal(value);
    setPorcentaje(value);
  };

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasa`);
      if (!response.ok) {
        throw new Error("Error al obtener el tipo de cambio");
      }
      const data = await response.json();
      setExchangeRateUsd(data.usd);
      setExchangeRateEur(data.eur);
      setExchangeRateCny(data.cny);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  if (loading) return <p className=" text-green-400 ">Cargando...</p>;
  if (error) return <p className=" text-red-400 ">Error: {error}</p>;

  return (
    <div className="text-center text-white mb-2 ">
      <div className=" grid grid-cols-3 gap-3 pb-3 ">
        <div className=" flex justify-center pt-1 ">
          <h2 className=" text-lime-300 text-md"> Calculadora Ganancia</h2>
        </div>
        <div className=" flex justify-center">
          <svg
            onClick={fetchExchangeRate}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-9 mt-0 mb-1 p-1 border-y-4 border-solid border-green-500 rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </div>
        <div className=" flex justify-center pt-2 ">
          <h2 className=" font-normal text-sm"> {formDate.fecha}</h2>
        </div>
      </div>

      <div className=" grid grid-cols-2 gap-2">
        <div className="">
          <p>
            <strong
              className="font-medium text-sm"
              onChange={exchangeRUsd(exchangeRateUsd)}
            >
              $ = <span className="text-green-400">{exchangeRateUsd}</span> Bs.S{" "}
            </strong>
          </p>
          <p>
            <strong
              className="font-medium text-sm"
              onChange={exchangeREur(exchangeRateEur)}
            >
              € = <span className="text-green-400">{exchangeRateEur}</span> Bs.S{" "}
            </strong>
          </p>
          <p>
            <strong
              className="font-medium text-sm"
              onChange={exchangeRCny(exchangeRateCny)}
            >
              ¥ = <span className="text-green-400">{exchangeRateCny}</span> Bs.S{" "}
            </strong>
          </p>
        </div>
        <div className="relative mt-4 mb-3 flex items-center ">
          <input
            type="number"
            name="porcentaje"
            value={porcentaje}
            id="porcentaje"
            onChange={handleChange}
            class="block px-2.5 pb-2.5 pt-2 w-full text-center text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="porcentaje"
            class="absolute text-sm pl-1 pr-1 text-green-600 dark:text-green-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Porcentaje
          </label>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;
