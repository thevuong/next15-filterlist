import React from 'react';
import { getData } from '@/data/getData';

export default async function DataComponent() {
  const data = await getData();

  return <div>DataComponent DYNAMIC{data[0].content}</div>;
}
