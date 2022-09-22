export const onRequestGet = async () => {
  return new Response(
    JSON.stringify({
      address: '0x688c3fdadcb8c9a77e681b7a4209e937aca34fd1',
    }),
  );
};
