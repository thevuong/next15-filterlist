export async function slow(delay: number = 1000) {
  console.log(`Sleeping for ${delay}ms`);
  await new Promise(resolve => {
    return setTimeout(resolve, 0);
  });
}
