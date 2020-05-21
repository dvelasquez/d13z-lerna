import { libraryB } from '@d13z-lerna/library-b';
import {promiseExample} from "./promise-example";

const libraryA = (): void => {
  console.log('Library A initialised');
  console.info('Testing if this change triggers a release');
  libraryB();
  promiseExample()
      .then(result => console.log({...result}))
      .catch(e => console.error(e))
      .finally(() => console.info('Does somebody ever use this? (it should)'))
};

export { libraryA };
export default libraryA;
