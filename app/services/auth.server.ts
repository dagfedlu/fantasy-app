import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage } from '~/services/session.server';
import type {User} from '~/services/session.server';

// to check if user exists || create a new one
import { db } from "~/utils/db.server";

const authenticator = new Authenticator<User | Error | null>(sessionStorage, {
  sessionKey: "sessionKey", // keep in sync
  sessionErrorKey: "sessionErrorKey", // keep in sync
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get('username') as String
    const password = form.get('password') as String
    if(!username || username?.length === 0) throw new AuthorizationError("Bad credentials: Username must not be empty")
    if(typeof username !== 'string') throw new AuthorizationError("Username must be a string")
    if(password?.length === 0 ||  !password) throw new AuthorizationError("Password error: empty")

    const userExists = await db.user.findUnique({
      where: {
        username: username
      }
    })
    // check if user exists
    if(!userExists) {
      console.log("error: user does not exist");
      throw new AuthorizationError("User does not exist")
    }
    // check if password is correct
    if (userExists?.password === password) {
        return {...userExists}
    } else { 
      console.log("password does not match"); //throw an error if something goes wrong
      throw new AuthorizationError("Please enter the password again") 
    }
  }),
)

export default authenticator