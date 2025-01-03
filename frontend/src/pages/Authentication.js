import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";

export default function AuthenticationPage() {
  return <AuthForm />;
}

export async function submitAuthenticationAction({ request }) {
  const formData = await request.formData();

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  // check mode if the value is not 'login' or 'signup'.

  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const url = `http://localhost:8080/${mode}`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user!" }, { status: 500 });
  }

  const { token } = await response.json();

  localStorage.setItem("token", token);
  const expiration = new Date();

  // increase hour by 1
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
