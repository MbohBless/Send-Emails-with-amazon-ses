const path = require('path');
const fs = require('fs');
const { sesClient } = require('./sesclient.service');
const { CreateTemplateCommand, GetTemplateCommand, DeleteTemplateCommand } = require('@aws-sdk/client-ses');

export const templateService = {
    uploadTemplates: async () => {
        const templates = fs.readdirSync(path.join(__dirname, 'public', 'templates'));
        // use the map function to map through each template and check to see that the templates do not exist
        await Promise.all(templatePromises.map(async (template) => {
            const templateName = template.split('.')[0];
            try {
                const template = await templateService.getTemplate(templateName);
                console.log(`Template ${template} already exists`);
                if (template) {
                    templates = templates.filter((template) => template !== templateName);
                }
            } catch (err) {
                if (err.name === 'TemplateDoesNotExist') {
                    console.log(`Template ${templateName} does not exist`);
                } else {
                    console.log(`Error getting template ${templateName}`, err);
                    throw err;
                }
            }
        }));

        const templatePromises = templates.map(async (template) => {
            const templateName = template.split('.')[0];
            const templateContent = fs.readFileSync(path.join(__dirname, 'public', 'templates', `${templateName}`), 'utf8');
            const params = {
                Template: {
                    TemplateName: templateName,
                    HtmlPart: templateContent,
                    SubjectPart: `{{subject}}`
                }
            };
            try {
                const data = await sesClient.send(new CreateTemplateCommand(params));
                console.log(`Template ${templateName} uploaded successfully`, data);
            } catch (err) {
                console.log(`Error uploading template ${templateName}`, err);
                throw err;
            }
        });
        return await Promise.all(templatePromises);
    },
    getTemplate: async (templateName) => {
        const params = {
            TemplateName: templateName
        };
        try {
            const data = await sesClient.send(new GetTemplateCommand(params));
            return data.Template;
        } catch (err) {
            console.log(`Error getting template ${templateName}`, err);
            // throw an error
            throw err;
        }
    },

    deleteTemplate: async (templateName) => {
        const params = {
            TemplateName: templateName
        };
        try {
            const data = await sesClient.send(new DeleteTemplateCommand(params));
            console.log(`Template ${templateName} deleted successfully`, data);
        } catch (err) {
            console.log(`Error deleting template ${templateName}`, err);
            throw err;

        }
    },
}