import { useEffect, useState, useRef, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const inputPass = useRef(null);

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; ++i) {
      let ind = Math.floor(Math.random() * str.length);
      pass += str[ind];
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    inputPass.current.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passGen();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto mt-16 bg-slate-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 hover:shadow-orange-500/20 transition-all duration-300">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          Password Generator
        </h1>
        <div className="flex w-full overflow-hidden rounded-xl border border-slate-600">
          <input
            type="text"
            className="flex-1 px-4 py-3 bg-slate-900 text-orange-400 outline-none text-lg font-medium"
            value={password}
            readOnly
            ref={inputPass}
          />
          <button className="px-6 bg-orange-500 hover:bg-orange-600 transition-all duration-200 text-white font-semibold" onClick={copyToClipboard}>
            COPY
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-white">
          <div className="flex items-center gap-3">
            <input type="range" className="cursor-pointer accent-orange-500" onChange={(e)=>setLength(e.target.value)} min={6} max={20}/>
            <label htmlFor="range" className="text-lg font-medium">
              Length: {length}
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="num"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="w-4 h-4 accent-orange-500 cursor-pointer"
            />
            <label htmlFor="num">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="char"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              className="w-4 h-4 accent-orange-500 cursor-pointer"
            />
            <label htmlFor="char">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
