module.exports = {
    getOne: jest.fn((url) => {
        if (url === '/fpperu') {
            return Promise.resolve({
                productOneId: 1,
                productOneCategory: 'Peru',
                productOneImage: 'randomurl'
            });
        }
    }),
    getTwo: jest.fn((url) => {
        if (url === '/fpmaldives') {
            return Promise.resolve({
                productOneId: 3,
                productOneCategory: 'Maldives',
                productOneImage: 'randomurl'
            });
        }
    }),
   
   
};