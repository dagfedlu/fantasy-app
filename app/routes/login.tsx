import { Form } from "@remix-run/react";
import authenticator from "~/services/auth.server";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
// import { redirect } from "@remix-run/node";
import { getSession } from "~/services/session.server";
import { json } from "@remix-run/node";

// authenticate user
export async function action({request}: ActionArgs) {
  return await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
    throwOnError: true,
  })
}

// in the loader of the login route
export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);
  return json({ error });
}


export default function Login() {
  return (
    <>
      <h2>Welcome to login</h2>
      <Form method="post">
        <input type="text" name="username" />
        <input type="password" name="password" required />
        <button>Sign In</button> 
      </Form>
    </>
  )
}