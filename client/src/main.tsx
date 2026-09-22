import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import CategoryListPage from "./pages/CategoryListPage";
import CategoryRecipesPage from "./pages/CategoryRecipesPage.tsx";
import HomePage from "./pages/HomePage";
import { ClerkProvider } from "@clerk/react";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
  { index: true, element: <HomePage />, 
  },
  {
    path: "recipes",
    element: <RecipeListPage />,
  },
  {
    path: "recipes/:id",
    element: <RecipeDetailPage />,
  },
  {
    path: "categories",
    element: <CategoryListPage />,
  },
  {
    path: "categories/:id",
    element: <CategoryRecipesPage />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
);