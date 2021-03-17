const axios = {
  get: jest.fn(() => Promise.resolve({})),
  post: jest.fn(() => Promise.resolve({})),
  create: () => axios,
  defaults: {
    adapter: {},
  },
};

export default axios;
