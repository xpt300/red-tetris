import { shapesRandom } from '../util/shapes'

const newShapes = (random) => {
  const copyObject = shapesRandom
  return JSON.parse(JSON.stringify(copyObject[random]))
}

export default newShapes