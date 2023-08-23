var express = require('express');
var emailRouter = express.Router();
var { emailHandler } = require('../handlers/email.handler');

emailRouter.post('/send', emailHandler.sendEmail);
emailRouter.post('/sendtemplate', emailHandler.sendTemplateEmail);
emailRouter.post('/generateTemplates', emailHandler.generateTemplate)
emailRouter.get('/template', emailHandler.getTemplate)
emailRouter.delete('/template', emailHandler.deleteTemplate)



module.exports = emailRouter;
