import React from 'react';
import { getCurrentUser } from '@/data/getCurrentUser';

// TODO: should not be the user, user is dynamic, can use user somewhere else
export default async function StaticData() {
  const user = await getCurrentUser();

  return <div className="bg-blue-500 p-4 text-white">Welcome to the static data page, {user.firstname}!</div>;
}
