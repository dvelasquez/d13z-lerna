import { libraryB } from "@d13z-lerna/library-b";

const libraryA = (): void => {
    console.log('Library A initialised')
    console.info('Testing if this change triggers a release')
    libraryB()
}

export { libraryA }
export default libraryA
