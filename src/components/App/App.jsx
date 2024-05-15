import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SharedLayout from "../SharedLayout/SharedLayout";

const Home = lazy(() => import("../../pages/Home/Home"));
const Catalog = lazy(() => import("../../pages/Catalog/Catalog"));
const Favorites = lazy(() => import("../../pages/Favorites/Favorites"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
