function transformHtmlHandler(html, options) {
    const dataMap = (options.inject && options.inject.data) || {};
    let newHtml = html;

    for (const key in dataMap) {
        newHtml = newHtml.replaceAll(`<%- ${key} %>`, dataMap[key]);
    }

    return newHtml;
}


export default (options = {}) => {
    return {
        // 转换html的hooks
        transformIndexHtml: {
            // 控制执行时期的
            order: 'pre',
            // ctx 表示当前整个请求的执行期上下文：api/index.html ...
            // html: string,
            //     ctx: {
            //     path: string
            //     filename: string
            //     server?: ViteDevServer
            //     bundle?: import('rollup').OutputBundle
            //     chunk?: import('rollup').OutputChunk
            // },
            handler: (html, ctx) => transformHtmlHandler(html, options)
        }
    }
}
