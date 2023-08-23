const { sesService } = require('../services/ses.service');
const { templateService } = require('../services/template.service');
const emailHandler = {
    sendEmail: async (req, res) => {
        const { to, subject, body } = req.body;
        try {
            await sesService.sendEmail([to], "mbohblesspearl@gmail.com", subject, body);
            res.status(200).send({ message: 'Email sent successfully' });
        } catch (err) {
            res.status(500).send({ message: 'Error sending email' });
        }
    },
    sendTemplateEmail: async (req, res) => {
        const { to, templateName } = req.body;
        const lowerCaseTemplateName = templateName.toLowerCase();
        let templateData;
        if (lowerCaseTemplateName === "welcome") {
            templateData = {
                company_logo: "https://www.edigitalagency.com.au/wp-content/uploads/twitter-logo-black-png.png",
                username: "Mboh Bless Pearl",
                company_name: "Twitter",
            }
        }
        else if (lowerCaseTemplateName === "purchasehistory") {
            templateData = {
                company_logo: "https://www.edigitalagency.com.au/wp-content/uploads/twitter-logo-black-png.png",
                username: "Mboh Bless Pearl",
                company_name: "Twitter",
                data: [
                    [
                        {
                            "id": 1,
                            "product": "Iphone 12",
                            "quantity": 10,
                            "totalAmount": 100000,
                            "date": "10/01/2021"
                        },
                        {
                            "id": 2,
                            "product": "Samsung Galaxy S21",
                            "quantity": 5,
                            "totalAmount": 75000,
                            "date": "12/05/2021"
                        },
                        {
                            "id": 3,
                            "product": "Google Pixel 5",
                            "quantity": 8,
                            "totalAmount": 80000,
                            "date": "08/20/2021"
                        },
                        {
                            "id": 4,
                            "product": "Sony PlayStation 5",
                            "quantity": 2,
                            "totalAmount": 100000,
                            "date": "09/15/2021"
                        },
                        {
                            "id": 5,
                            "product": "MacBook Pro",
                            "quantity": 3,
                            "totalAmount": 180000,
                            "date": "11/28/2021"
                        }
                    ]
                ]
            }

        }
        else if (lowerCaseTemplateName === "transaction") {
            templateData = {
                company_logo: "https://www.edigitalagency.com.au/wp-content/uploads/twitter-logo-black-png.png",
                username: "Mboh Bless Pearl",
                company_name: "Twitter",
                transaction_id: "123456789",
                transaction_date: "10/01/2021",
                transaction_amount: 100000,
                transaction_status: "Successful",
                transaction_method: "Paystack",
            }
        }
        else if (lowerCaseTemplateName === "topselling") {
            templateData = {
                company_logo: "https://www.edigitalagency.com.au/wp-content/uploads/twitter-logo-black-png.png",
                username: "Mboh Bless Pearl",
                company_name: "Twitter",
                top_products: [
                    [
                        {
                            image: "https://www.cnet.com/a/img/resize/9f87682991653dbe080d1c148bb2143b8eb01f29/hub/2022/10/18/b643bc41-614e-4a5e-acaa-649281580f68/tcl-6-series-tv-r6-2022-6396.jpg?auto=webp&fit=crop&height=900&width=1200",
                            product: "TCL 6-Series Roku TV (R646, 2022)",
                            totalSold: 100,
                        },
                        {
                            image: "https://m.media-amazon.com/images/I/613qFCwaEnL.jpg",
                            product: "Samsung Galaxy Watch 4",
                            totalSold: 80
                        },
                        {
                            image: "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29ueSUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
                            product: "Sony Camera",
                            totalSold: 70
                        }
                    ]
                ]
            }
        }
        else if (lowerCaseTemplateName === "productspotlight") {
            templateData = {
                company_logo: "https://www.edigitalagency.com.au/wp-content/uploads/twitter-logo-black-png.png",
                username: "Mboh Bless Pearl",
                company_name: "Twitter",
                product_name: "Iphone 12",
                product_image: "https://www.cnet.com/a/img/resize/9f87682991653dbe080d1c148bb2143b8eb01f29/hub/2022/10/18/b643bc41-614e-4a5e-acaa-649281580f68/tcl-6-series-tv-r6-2022-6396.jpg?auto=webp&fit=crop&height=900&width=1200",
                product_description: "The iPhone 12 is a 6.1-inch iPhone with a 2,532 x 1,170 pixel resolution, giving it a pixel density of 460ppi. It's a Super Retina XDR display, which is Apple's fancy way of saying it's an OLED panel. It's also HDR10 and Dolby Vision certified, and has a 2,000,000:1 contrast ratio.",
                feature_one: "5G",
                feature_two: "A14 Bionic",
                feature_three: "Super Retina XDR display",
                product_url: "https://www.apple.com/iphone-12/",
            }
        }
        else {
            return res.status(404).send({ message: "Template not found" })
        }
        try {
            await sesService.sendTemplatedEmail([to], "mbohblesspearl@gmail.com", lowerCaseTemplateName, templateData);
            res.status(200).send({ message: 'Email sent successfully' });
        }
        catch (err) {
            console.log(err)
        }
    },
    generateTemplate: async (req, res) => {
        try {
            console.log("Generating templates");
            const data = await templateService.uploadTemplates();
            res.status(200).send({ message: 'Templates generated successfully', data: data });
        } catch (err) {

            res.status(500).send({ message: 'Error generating templates' });
        }
    },
    getTemplate: async (req, res) => {
        const { tempName } = req.params
        if (tempName === "all") {
            try {
                const data = await templateService.getAllTemplates(10);
                res.status(200).send({ message: 'Templates retrieved successfully', data: data });
            } catch (err) {
                res.status(500).send({ message: 'Error retrieving templates' });
            }
        }
        else {
            const trimmedTemplateName = tempName.trim();
            if (trimmedTemplateName) {
                try {
                    const data = await templateService.getTemplate(trimmedTemplateName)
                    res.status(200).send({
                        data: data,
                        message: "Fetched the document"
                    })
                }
                catch (err) {
                    res.status(404).send({ message: "Template not found" });
                }

            } else {
                res.status(400).send({ message: "Invalid template name" });
            }
        }
    },
    deleteTemplate: async (req, res) => {
        const { tempName } = req.params
        if (tempName === "all") {
            try {
                const data = await templateService.deleteAllTemplates();
                res.status(200).send({ message: 'Templates deleted successfully', data: data });
            } catch (err) {
                res.status(500).send({ message: 'Error deleting templates' });
            }
        }
        else {
            const trimmedTemplateName = tempName.trim();
            if (trimmedTemplateName) {
                try {
                    await templateService.deleteTemplate(trimmedTemplateName)
                }
                catch (err) {
                    res.status(404).send({ message: "Template not found" });
                }

            } else {
                res.status(400).send({ message: "Invalid template name" });
            }

        }
    }
}

module.exports = {
    emailHandler
}