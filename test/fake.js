import chai from "chai"
import newShapes from '../src/server/models/newShapes'
import moveShapes from '../src/client/functions/moveShapes'
import { shapesRandom } from '../src/client/util/shapes'

const should = chai.should()

describe('Shapes function', () => {
  it('New Shapes', () => {
    const shapes = newShapes(0)
    shapes.should.to.be.an('array')
    shapes.should.to.deep.equal(shapesRandom[0])
  });
  it('Move Shapes', () => {
      
  })
});
