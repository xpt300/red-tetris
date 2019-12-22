import { shapesRandom } from '../util/shapes'

const newShapes = (random) => {
  const copyObject = shapesRandom
  return JSON.parse(JSON.stringify(copyObject[0]))
}

export default newShapes