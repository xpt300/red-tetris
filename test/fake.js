import chai from "chai"
import dirtyChai from 'dirty-chai'

chai.use(dirtyChai)

describe('Shapes function', () => {
  it('New Shapes', () => {
    const shapes = newShapes(0)
    shapes.should.to.be.an('array')
    shapes.should.to.deep.equal(shapesRandom[0])
  });
  it('Move Shapes', () => {
      
  })
});
