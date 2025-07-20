import { useState, useCallback, useEffect, useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null) 
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "!@#$%^&*_+=-[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback( () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gray-900 rounded-2xl shadow-lg px-6 py-8 my-12 text-white">
        <h1 className="text-2xl font-semibold text-center mb-6">Password Generator</h1>

        <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-inner mb-6">
          <input
            type="text"
            value={password}
            className="flex-1 text-black px-4 py-3 text-base outline-none"
            placeholder="Your secure password"
            readOnly
            ref = {passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-3 text-white font-medium">
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-y-4 text-sm">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
