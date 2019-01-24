/**
 * Test the request function
 */

import 'whatwg-fetch';
import request from '../request';

describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });

      (window.fetch as jest.Mock).mockReturnValue(Promise.resolve(res));
    });

    it('should format the response correctly', done => {
      request('/thisurliscorrect')
        .then(json => {
          expect((json as any).hello).toBe('world');
          done();
        })
        .catch(done);
    });
  });

  describe('stubbing 204 response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response('', {
        status: 204,
        statusText: 'No Content',
      });

      (window.fetch as jest.Mock).mockReturnValue(Promise.resolve(res));
    });

    it('should return null on 204 response', done => {
      request('/thisurliscorrect')
        .then(json => {
          expect(json).toBeNull();
          done();
        })
        .catch(done);
    });
  });

  describe('stubbing error response', () => {
    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = new Response('', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json',
        },
      });

      (window.fetch as jest.Mock).mockReturnValue(Promise.resolve(res));
    });

    it('should catch errors', done => {
      request('/thisdoesntexist').catch(err => {
        expect(err.response.status).toBe(404);
        expect(err.response.statusText).toBe('Not Found');
        done();
      });
    });
  });
});
