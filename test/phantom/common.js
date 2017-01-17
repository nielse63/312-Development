
import 'babel-polyfill'
import chai from 'chai'
import p from 'phantom'
import * as utils from '../utils'

if (process.env.CI) {
  process.exit()
}

process.env.NODE_ENV = 'test'
global.chai = chai
global.expect = chai.expect
global.should = chai.should()
global.utils = utils
// global.phantom = null
// global.page = null

// (async function() {
//     const instance = await phantom.create();
//     const page = await instance.createPage();
//     await page.on("onResourceRequested", function(requestData) {
//         console.info('Requesting', requestData.url)
//     });

//     const status = await page.open('https://stackoverflow.com/');
//     console.log(status);

//     const content = await page.property('content');
//     console.log(content);

//     await instance.exit();
// }());
