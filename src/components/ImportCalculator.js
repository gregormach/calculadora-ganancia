import React, { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ImportCalculator = () => {
  const [bss, setBss] = useState("");
  const [usd, setUsd] = useState("");
  const [eur, setEur] = useState("");
  const [cny, setCny] = useState("");
  const [porce, setPorce] = useState("");
  const [exchangeRUsd, setexchangeRUsd] = useState(0);
  const [exchangeREur, setexchangeREur] = useState(0);
  const [exchangeRCny, setexchangeRCny] = useState(0);
  const [copied, setCopied] = useState(false);
  const [porcentajeFijo, setPorcentajeFijo] = useState(0);
  const [signo, setSigno] = useState("");

  const onCopyText = () => {
    setCopied(true);
    // Opcional: Mostrar una notificación o mensaje de éxito
    setTimeout(() => setCopied(false), 500); // Ocultar después de 2 segundos
  };

  const limpiarCanpos = () => {
    setBss("");
    setUsd("");
    setEur("");
    setCny("");
    setPorce("");
    setSigno("");
  };

  const formatNumber = (value) => {
    const number = value.replace(/[^0-9]/g, "");
    if (number.length <= 1) {
      return number;
    }
    const integerPart = number.slice(0, number.length - 2);
    const decimalPart = number.slice(number.length - 2);
    return `${integerPart}.${decimalPart}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 15) {
      return true;
    }
    if (name === "bss") {
      if (value === "") {
        limpiarCanpos();
        return true;
      }
      const formattedValue = formatNumber(value);
      setBss(formattedValue);
      const generalValue = parseFloat(formattedValue);
      const usd = generalValue / exchangeRUsd;
      const eur = generalValue / exchangeREur;
      const cny = generalValue / exchangeRCny;
      setUsd(usd.toFixed(2));
      setEur(eur.toFixed(2));
      setCny(cny.toFixed(2));
      const valorConPorcentaje = generalValue / (1 - porcentajeFijo / 100);
      setPorce(valorConPorcentaje.toFixed(2));
      setSigno("Bs");
    } else if (name === "usd") {
      if (value === "") {
        limpiarCanpos();
        return true;
      }
      const formattedValue = formatNumber(value);
      setUsd(formattedValue);
      const generalValue = parseFloat(formattedValue);
      const bss = generalValue * exchangeRUsd;
      const eur = generalValue / (exchangeREur / exchangeRUsd);
      const cny = generalValue * (exchangeRUsd / exchangeRCny);
      setBss(bss.toFixed(2));
      setEur(eur.toFixed(2));
      setCny(cny.toFixed(2));
      const valorConPorcentaje = generalValue / (1 - porcentajeFijo / 100);
      setPorce(valorConPorcentaje.toFixed(2));
      setSigno("$");
    } else if (name === "eur") {
      if (value === "") {
        limpiarCanpos();
        return true;
      }
      const formattedValue = formatNumber(value);
      setEur(formattedValue);
      const generalValue = parseFloat(formattedValue);
      const bss = generalValue * exchangeREur;
      const usd = generalValue * (exchangeREur / exchangeRUsd);
      const cny = generalValue * (exchangeREur / exchangeRCny);
      setBss(bss.toFixed(2));
      setUsd(usd.toFixed(2));
      setCny(cny.toFixed(2));
      const valorConPorcentaje = generalValue / (1 - porcentajeFijo / 100);
      setPorce(valorConPorcentaje.toFixed(2));
      setSigno("€");
    } else if (name === "cny") {
      if (value === "") {
        limpiarCanpos();
        return true;
      }
      const formattedValue = formatNumber(value);
      setCny(formattedValue);
      const generalValue = parseFloat(formattedValue);
      const bss = generalValue * exchangeRCny;
      const usd = generalValue / (exchangeRUsd / exchangeRCny);
      const eur = generalValue / (exchangeREur / exchangeRCny);
      setBss(bss.toFixed(2));
      setUsd(usd.toFixed(2));
      setEur(eur.toFixed(2));
      const valorConPorcentaje = generalValue / (1 - porcentajeFijo / 100);
      setPorce(valorConPorcentaje.toFixed(2));
      setSigno("¥");
    }
  };

  const limpiar = () => {
    limpiarCanpos();
  };

  return (
    <div className="max-w-md mx-auto pt-3 pl-5 pr-5">
      <ExchangeRate
        exchangeRUsd={setexchangeRUsd}
        exchangeREur={setexchangeREur}
        exchangeRCny={setexchangeRCny}
        porcentajeCal={setPorcentajeFijo}
      />
      <div className="space-y-3">
        <div className="text-center">
          <div class="relative mt-4 flex items-center">
            <input
              type="number"
              value={porce}
              name="porce"
              onChange={handleChange}
              class="block px-2.5 pb-2.5 pt-3 w-full text-center text-md text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              readOnly
            />
            <label
              for="porce"
              class="absolute text-md text-green-600 dark:text-green-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Costo + Ganancia <span className="pr-2">{signo}</span>
            </label>
            <div class="absolute right-4">
              <CopyToClipboard text={porce} onCopy={onCopyText}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                >
                  <path d="M14 23.5H5c-1.7 0-3-1.3-3-3v-12c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3zm-9-16c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h9c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1z"></path>
                  <path d="M19 18.5h-3c-.6 0-1-.4-1-1s.4-1 1-1h3c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1h-9c-.6 0-1 .4-1 1v3c0 .6-.4 1-1 1s-1-.4-1-1v-3c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3z"></path>
                </svg>
              </CopyToClipboard>
            </div>
          </div>

          <div class="relative mt-2 flex items-center">
            <input
              type="number"
              value={bss}
              name="bss"
              onChange={handleChange}
              id="bolivares"
              class="block px-2.5 pb-2.5 pt-3 w-full text-center text-md text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="bolivares"
              class="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Bolivares
            </label>
            <div class="absolute right-4">
              <CopyToClipboard text={bss} onCopy={onCopyText}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                >
                  <path d="M14 23.5H5c-1.7 0-3-1.3-3-3v-12c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3zm-9-16c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h9c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1z"></path>
                  <path d="M19 18.5h-3c-.6 0-1-.4-1-1s.4-1 1-1h3c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1h-9c-.6 0-1 .4-1 1v3c0 .6-.4 1-1 1s-1-.4-1-1v-3c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3z"></path>
                </svg>
              </CopyToClipboard>
            </div>
          </div>

          <div class="relative mt-2 flex items-center">
            <input
              type="number"
              value={usd}
              name="usd"
              onChange={handleChange}
              id="dolares"
              class="block px-2.5 pb-2.5 pt-3 w-full text-center text-md text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="dolares"
              class="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Dolares
            </label>
            <div class="absolute right-4">
              <CopyToClipboard text={usd} onCopy={onCopyText}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                >
                  <path d="M14 23.5H5c-1.7 0-3-1.3-3-3v-12c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3zm-9-16c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h9c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1z"></path>
                  <path d="M19 18.5h-3c-.6 0-1-.4-1-1s.4-1 1-1h3c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1h-9c-.6 0-1 .4-1 1v3c0 .6-.4 1-1 1s-1-.4-1-1v-3c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3z"></path>
                </svg>
              </CopyToClipboard>
            </div>
          </div>

          <div class="relative mt-2 flex items-center">
            <input
              type="number"
              value={eur}
              name="eur"
              onChange={handleChange}
              id="euros"
              class="block px-2.5 pb-2.5 pt-3 w-full text-center text-md text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="euros"
              class="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Euros
            </label>
            <div class="absolute right-4">
              <CopyToClipboard text={eur} onCopy={onCopyText}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                >
                  <path d="M14 23.5H5c-1.7 0-3-1.3-3-3v-12c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3zm-9-16c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h9c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1z"></path>
                  <path d="M19 18.5h-3c-.6 0-1-.4-1-1s.4-1 1-1h3c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1h-9c-.6 0-1 .4-1 1v3c0 .6-.4 1-1 1s-1-.4-1-1v-3c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3z"></path>
                </svg>
              </CopyToClipboard>
            </div>
          </div>

          <div class="relative mt-2 flex items-center">
            <input
              type="number"
              value={cny}
              name="cny"
              onChange={handleChange}
              id="yuanes"
              class="block px-2.5 pb-2.5 pt-3 w-full text-center text-md text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="yuanes"
              class="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Yuanes
            </label>
            <div class="absolute right-4">
              <CopyToClipboard text={cny} onCopy={onCopyText}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                >
                  <path d="M14 23.5H5c-1.7 0-3-1.3-3-3v-12c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3zm-9-16c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h9c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1z"></path>
                  <path d="M19 18.5h-3c-.6 0-1-.4-1-1s.4-1 1-1h3c.6 0 1-.4 1-1v-12c0-.6-.4-1-1-1h-9c-.6 0-1 .4-1 1v3c0 .6-.4 1-1 1s-1-.4-1-1v-3c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3z"></path>
                </svg>
              </CopyToClipboard>
            </div>
          </div>
        </div>

        <button
          onClick={limpiar}
          className="w-full py-1 px-4 rounded-lg text-white font-medium mt-3 transition-colors bg-blue-600 hover:bg-blue-400"
        >
          Limpiar
        </button>

        {copied ? (
          <span className="text-green-400 text-xs text-right">Copiado!</span>
        ) : null}
      </div>
    </div>
  );
};

export default ImportCalculator;
