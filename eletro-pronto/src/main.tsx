import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Storefront from "./pages/Storefront"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Storefront />
  </StrictMode>,
)
