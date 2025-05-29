const fs = require("fs");
const path = require("path");

console.log("▶️ Script iniciado...");

const folders = [
  "src/components",
  "src/pages",
  "src/styles",
  "src/assets",
  "src/utils",
  "src/constants",
  "src/services"
];

const files = {
  "src/styles/colors.js": `export const colors = {
  primary: "#1E90FF",
  secondary: "#FF69B4",
  background: "#F5F5F5",
  text: "#333"
};`,
  "src/styles/global.css": `body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}`,
  "src/utils/helpers.js": `export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}`,
  "src/constants/routes.js": `export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register"
};`,
  "src/services/firebase.js": `// Acá irá la configuración de Firebase`,
  "src/components/Button.jsx": `export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};`,
  "src/components/Input.jsx": `export const Input = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <input {...props} />
  </div>
);`
};

folders.forEach((folder) => {
  const dir = path.join(__dirname, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("📁 Creado:", folder);
  }
});

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("📝 Creado:", filePath);
});

console.log("✅ ¡Estructura creada con éxito!");
