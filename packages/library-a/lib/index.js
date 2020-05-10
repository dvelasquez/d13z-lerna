import { libraryB } from "@d13z-lerna/library-b/lib";

const libraryA = () => {
    console.log('Library A initialised.')
    libraryB()
}

export { libraryA }
export default libraryA
