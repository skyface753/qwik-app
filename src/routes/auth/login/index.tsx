import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useAuthSignin } from '~/routes/plugin@auth';

export default component$(() => {
  const signIn = useAuthSignin();
  return (
    <Form action={signIn}>
      <input type='hidden' name='c565ac8199ffd5553856' value='github' />
      <input
        type='hidden'
        name='options.callbackUrl'
        value='http://127.0.0.1:5173/api/auth/callback/github'
      />
      <button>Sign In</button>
    </Form>
  );
});
