import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginRequiredMessage({ open, onClose, redirectPath }) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleLogin = () => {
    onClose && onClose();
    // navigate to login and pass the intended path so the app can redirect back after login
    navigate("/login", { state: { from: redirectPath } });
  };

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <h3>Login necessário</h3>
        <p>É preciso realizar o login para visualizar essas informações.</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} style={btnStyleSecondary}>Cancelar</button>
          <button onClick={handleLogin} style={btnStylePrimary}>Ir para Login</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const boxStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 6,
  width: 360,
  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
};

const btnStylePrimary = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: 4,
  cursor: "pointer",
};

const btnStyleSecondary = {
  background: "transparent",
  color: "#333",
  border: "1px solid #ccc",
  padding: "8px 12px",
  borderRadius: 4,
  cursor: "pointer",
};
