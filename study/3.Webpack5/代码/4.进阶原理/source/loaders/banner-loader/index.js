const schema = require("./schema.json");

module.exports = function (content) {
    console.log("File processed:", this.resourcePath);
    // schema对options的验证规则
    // schema符合JSON Schema的规则
    const options = this.getOptions(schema);

    const prefix = `
    /*
    * Author: ${options.author}
    */
  `;

    return prefix + content;
};
