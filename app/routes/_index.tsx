import type { ActionFunction, LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import authenticator from "~/services/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// check there's an active session(if not - redirect to /login)
export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

// logout - when button is pressed
export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, {redirectTo: "/login"})
}

export default function Index() {
  const data = useLoaderData()
  console.log(data);
  
  return (
    <>
    <h1>this is the index route</h1>
    <h2>congrats on authenticating <span>...{data?.username}</span> created at {data?.createdAt}</h2>
    <Form method="post">
      <button>Log Out</button>
    </Form>
    </>
  );
}
