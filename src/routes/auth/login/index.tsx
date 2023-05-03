import { component$ } from '@builder.io/qwik';
import { Form, routeAction$ } from '@builder.io/qwik-city';
import { useAuthSignin } from '~/routes/plugin@auth';
import { Client, Account, AppwriteException } from 'appwrite';
import type { Models } from 'appwrite';

export const useAppwriteSignIn = routeAction$(async (data) => {
  // This will only run on the server when the user submits the form (or when the action is called programatically)
  // const userID = await db.users.add({
  //   firstName: data.firstName,
  //   lastName: data.lastName,
  // });
  // return {
  //   success: true,
  //   userID,
  // };
  const client = new Client();
  const account = new Account(client);
  console.log(data);
  client
    .setEndpoint('https://appwrite.skyface.de/v1')
    .setProject('6425b268553b93ec8c55');
  const userID = await account

    .createEmailSession(data.email.toString(), data.password.toString())
    .then((response) => {
      return {
        success: true,
        userID: response,
        error: null,
      };
    })
    .catch((error: AppwriteException) => {
      return {
        success: false,
        userID: null,
        error: error.message,
      };
    });

  return {
    success: userID.success,
    userID: userID.userID,
    error: userID.error,
  };
});

export default component$(() => {
  const signIn = useAuthSignin();
  const appwriteSignIn = useAppwriteSignIn();
  // const email = useSignal('');
  // const password = useSignal('');

  // const appwriteSignIn = $(async () => {
  //   const client = new Client();
  //   const account = new Account(client);
  //   client
  //     .setEndpoint('https://appwrite.skyface.de/v1')
  //     .setProject('6425b268553b93ec8c55');
  //   account
  //     .createEmailSession(email.value, password.value)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  // const appwriteSignIn = (event: any) => {
  //   event.preventDefault();
  //   const client = new Client();
  //   const account = new Account(client);
  //   client
  //     .setEndpoint('https://appwrite.skyface.de/v1')
  //     .setProject('6425b268553b93ec8c55');
  //     console.log(event);
  // };

  console.log(appwriteSignIn);

  return (
    <>
      <Form action={signIn}>
        <input type='hidden' name='c565ac8199ffd5553856' value='github' />
        <input
          type='hidden'
          name='options.callbackUrl'
          value='http://localhost:5173/auth'
        />
        <button>Sign In</button>
      </Form>
      <Form action={appwriteSignIn}>
        <div>
          <input type='text' name='email' />
          <input type='password' name='password' />
          <button type='submit'>Sign In</button>
        </div>
      </Form>
      {appwriteSignIn.value?.error && <p>{appwriteSignIn.value?.error}</p>}
      {appwriteSignIn.value?.success && <p>Success</p>}
    </>
  );
});
