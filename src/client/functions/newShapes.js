import { shapesRandom } from '../util/shapes'

const newShapes = (random) => {
  const copyObject = shapesRandom
  return JSON.parse(JSON.stringify(copyObject[4]))
}

export default newShapes