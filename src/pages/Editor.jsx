// src/pages/SecretPage.jsx
import { useState } from "react";
import NameplateGenerator from "../components/NameplateGenerator";

const CORRECT_PASSWORD = "din-super-kode123"; // SKIFT TIL DIN EGEN!

function SecretPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(() =>
    localStorage.getItem("secret_access") === "true"
  );
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setAccess(true);
      localStorage.setItem("secret_access", "true");
      setError("");
    } else {
      setError("Forkert kode!");
    }
  }

  if (!access) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="p-8 bg-gray-100 rounded shadow">
          <label className="font-semibold">Adgangskode:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded px-3 py-2 ml-2"
          />
          <button type="submit" className="ml-4 px-4 py-2 bg-black text-white rounded">Log ind</button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      </div>
    );
  }

  // Indholdet til dig
  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Velkommen til admin/værktøjssiden!</h1>
      <NameplateGenerator />
      <p>Her kan kun du komme ind ✨</p>
    </div>
  );
}

export default SecretPage;
