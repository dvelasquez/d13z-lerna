import { libraryB } from "@d13z-lerna/library-b/lib";

const libraryA = () => {
    console.log('Library A initialised')
    console.info('Testing if this change triggers a release')
    libraryB()
}

export { libraryA }
export default libraryA
