import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Recipe Manager</Link>{" "}
      <Link to="/recipes">Recipes</Link>{" "}
      <Link to="/categories">Categories</Link>{" "}

      <Show when="signed-out">
        <SignInButton />{" "}
        <SignUpButton />
      </Show>

      <Show when="signed-in">
        <Link to="/dashboard">Dashboard</Link>{" "}
        <UserButton />
      </Show>
    </nav>
  );
}