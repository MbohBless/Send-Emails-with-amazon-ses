const { SESClient } = require('@aws-sdk/client-ses')

const sesClient = new SESClient({
    region: "us-east-2",
    credentials: {
        accessKeyId: 'AKIAZKZZJDEEWEVWP5GI',
        secretAccessKey: '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'
    }
})

module.exports = {
    sesClient
}