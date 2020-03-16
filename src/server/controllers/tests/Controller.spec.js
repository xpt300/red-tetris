import { games } from '../../index'
const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

let ClientSocket;
let ClientSocket2;
let ClientSocket3;
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
  httpServer.close();
  done();
});

beforeEach((done) => {
  ClientSocket = io.connect(`http://[${host}]:${port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
    query: 'room=' + window.location.href.split('/')[3]
  });
  ClientSocket2 = io.connect(`http://[${host}]:${port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
    query: 'room=#42[mjoubert]'
  });

  ClientSocket3 = io.connect(`http://[${host}]:${port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
    query: 'room=#42[mjert]'
  });

  ClientSocket.on('connect', () => {
    done();
  });
  ClientSocket2.on('connect', () => {
    done();
  });
  ClientSocket3.on('connect', () => {
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
  if (ClientSocket3.connected) {
    ClientSocket3.disconnect();
  }
  done();
});

describe('Test new player', () => {
  it('new Player', (done) => {
    ClientSocket.emit('newPlayer');
    setTimeout(() => {
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })

  it('new Player 2', (done) => {
    ClientSocket2.emit('newPlayer');
    setTimeout(() => {
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })

  it('new Player 2', (done) => {
    ClientSocket3.emit('newPlayer');
    setTimeout(() => {
      console.log(games, 'newplayer 2');
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })  
});

describe('Test level', () => {
  it('level', (done) => {
    ClientSocket2.emit('action', {type: 'level', ope: '+'});
    setTimeout(() => {
      console.log(games, 'level');
      // expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })

});

describe('Test disconnect', () => {
  it('new Player disconnect', (done) => {
    ClientSocket.emit('disconnect');
    setTimeout(() => {
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })

  it('new Player 2 disconnect', (done) => {
    ClientSocket2.emit('disconnect');
    setTimeout(() => {
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })

  it('new Player 2 disconnect', (done) => {
    ClientSocket3.emit('disconnect');
    setTimeout(() => {
      expect(games[0].player.length).toBe(1);
      done();
    }, 50);
  })  
});