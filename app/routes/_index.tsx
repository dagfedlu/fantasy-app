import type { ActionFunction, LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import authenticator from "~/services/auth.server";
import Fixtures from "~/components/fixtures";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
// ------------- get fixtures ------------------------------------- 
const url = `https://fantasy.premierleague.com/api/fixtures/`
const getFixtures = async () => {
  const data = await fetch(url).then((res) => res.json())
  return filterFixtures(2, [...data])
}
const filterFixtures = async (gw : number, data : Array<object>) => {
  const res = await Promise.all(data.filter((item:any) => {
    return item.event === gw
  }))
  return res
}
// ---------------- get team names ---------------------------------
const team_url = `https://fantasy.premierleague.com/api/bootstrap-static/`
// const getTeams = async () => {
//   const data = await fetch(team_url).then((res) => res.json()) //holds main data
//   // filter to get array of teams only
//   const teams = await Promise.all(data.filter((team) => {
//     return team
//   }))
// }

// check there's an active session(if not - redirect to /login)
export let loader: LoaderFunction = async ({ request }) => {
    const fixtures = await getFixtures()
    const auth = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login"
    });
    return {fixtures, auth}
};
// logout - when button is pressed
export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, {redirectTo: "/login"})
}

export default function Index() {
  const {fixtures, auth} = useLoaderData() // holds authenticated users data
  console.log(auth);
  return (
    <>
    <h1>this is the index route</h1>
    <h2>congrats on authenticating <span>...{auth?.username}</span> created at {auth?.createdAt}</h2>
    <Form method="post">
      <button>Log Out</button>
    </Form>
    <div>
      <h2>Welcome to My Fantasy</h2>
      <h3>here you can take your fpl management to a whole new level</h3>
      <h3>Below are the best fixtures available</h3>
      <Fixtures fixtures={fixtures} />
    </div>
    </>
  );
}
