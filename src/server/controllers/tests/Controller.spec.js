const { games } = require('../../index')
const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

let ClientSocket;
let ClientSocket2;
let httpServer;
let httpServerAddr;
let ioServer;
const {host, port} = {host: "localhost", port: "3004"}

beforeAll((done) => {
  jest.setTimeout(20000);
  httpServer = http.createServer();
  httpServerAddr = httpServer.listen().address();
  ioServer = ioBack(httpServer)
  done();
});

afterAll((done) => {
  ioServer.close();
  httpServer.close();
  done();
});

beforeEach((done) => {
  ClientSocket = io.connect(`http://[${host}]:${port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
    query: 'room=#42[mjoubert]'
  });

  ClientSocket2 = io.connect(`http://[${host}]:${port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
    query: 'room=#42[mj]'
  });

  ClientSocket.on('connect', () => {
    done();
  });
  ClientSocket2.on('connect', () => {
    done();
  });
});

afterEach((done) => {
  if (ClientSocket.connected) {
      ClientSocket.disconnect();
  }
  if (ClientSocket2.connected) {
    ClientSocket2.disconnect();
  }
  done();
});

describe('Test new player multi', () => {
  it('new Player 2', (done) => {
    ClientSocket.emit('newPlayer');
    ClientSocket2.emit('newPlayer');
    setTimeout(() => {
      expect(games[0].player.length).toBe(2);
      done();
    }, 50);
  })
});

describe('Test new player solo', () => {
  it('new Player', (done) => {
    ClientSocket.emit('newPlayer');
    setTimeout(() => {
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })
});

describe('Test new Shapes', () => {
  it('Shapes', (done) => {
    ClientSocket.emit('newPlayer');
    ClientSocket.emit('action', {type: 'shapes', board: [], length: 1, fullLine: 1});
    setTimeout(() => {
      
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })
});

describe('Test startgame', () => {
  it('level', (done) => {
    ClientSocket.emit('newPlayer');
    ClientSocket.emit('action', {type: 'start'});
    setTimeout(() => {
      
      // expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })
});

describe('Test level', () => {
  it('level', (done) => {
    ClientSocket.emit('newPlayer');
    ClientSocket.emit('action', {type: 'level', ope: '+'});
    setTimeout(() => {
      
      // expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })
});

describe('Test Score', () => {
  it('level', (done) => {
    ClientSocket.emit('newPlayer');
    ClientSocket.emit('action', {type: 'score', score: 40});
    setTimeout(() => {
      
      // expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })
});

describe('Test Restart', () => {
  it('level', (done) => {
    ClientSocket.emit('newPlayer');
    ClientSocket.emit('action', {type: 'restart'});
    setTimeout(() => {
      
      // expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })
});

describe('Test endGame', () => {
  it('end', (done) => {
    ClientSocket.emit('newPlayer');
    ClientSocket.emit('end');
    setTimeout(() => {
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })
});

describe('Test disconnect', () => {
  it('new Player disconnect', (done) => {
    ClientSocket.emit('newPlayer');
    ClientSocket.emit('disconnect');
    setTimeout(() => {
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })

  it('new Player 2 disconnect', (done) => {
    ClientSocket2.emit('newPlayer');
    ClientSocket.emit('newPlayer');
    ClientSocket2.emit('disconnect');
    ClientSocket.emit('disconnect');
    setTimeout(() => {
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })
});