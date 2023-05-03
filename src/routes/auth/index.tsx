import { component$ } from '@builder.io/qwik';
import { useAuthSession } from '~/routes/plugin@auth';

export default component$(() => {
  const session = useAuthSession();
  if (!session.value) return <p>Not logged in</p>;
  return <p>{session.value?.user?.email}</p>;
});
