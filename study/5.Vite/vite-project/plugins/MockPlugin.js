// 拦截http请求
import fs from "fs";
import mockDescriptors from '../mock/index.js';

const defaultOptions = {
    enabled: process.env.NODE_ENV === 'development',
};

const createMiddleware = (options, isExistDir, isAvailable) => {
    return (req, res, next) => {
        const reqUrl = req.url;
        if (isExistDir && isAvailable) {
            const mockDescriptor = mockDescriptors.find((mockItem) => mockItem.url === reqUrl);
            mockDescriptor ? handleMockRequest(options, mockDescriptor, req, res) : next();
        } else {
            console.log(`[vite]: mock directory is not found`);
            next();
        }
    };
};

const handleMockRequest = (options, mockDescriptor, req, res) => {
    if (!options.enabled) {
        throw new Error(`[vite]: current environment is ${process.env.NODE_ENV}`);
    }
    const response = mockDescriptor.response({body: undefined}) || {};
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify(response));
};

export default (options = {}) => {
    const newOptions = {...defaultOptions, ...options};

    return {
        configureServer: (serve) => {
            const middleware = serve.middlewares;
            const isExistDir = fs.existsSync('mock/index.js');
            const isAvailable = Array.isArray(mockDescriptors) && mockDescriptors.length > 0;

            middleware.use(createMiddleware(newOptions, isExistDir, isAvailable));
        },
    };
};
