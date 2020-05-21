const dumbPromise = (): Promise<{ message: string; code: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('This should be executed after 1500 ms');
      resolve({ message: 'Code Executed', code: 200 });
    }, 1500);
  });
};

const promiseExample = async (): Promise<{ message: string; code: number }> => {
  try {
    return await dumbPromise();
  } catch (e) {
    throw e;
  } finally {
    console.info('Finally executed');
  }
};

export { promiseExample };
