exports.config = {
    
    seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: './node_modules/protractor/selenium/latest.jar',
    framework: 'jasmine',

    chromeOnly: true,
    chromeDriver: './node_modules/selenium-webdriver/chrome.js',

    specs: ['end2end-test/*spec.js'],
    baseUrl: 'http://localhost:5000',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
