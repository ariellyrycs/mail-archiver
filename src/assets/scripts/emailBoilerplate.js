let generateReplyTemplate = (reply, i) => `
    <tr>
        <td align="left" valign="top" style="padding-top:20px;">
            <blockquote style="border-top: 1px solid #DEDEDE;
                color: #666;
                margin: 0;
                padding-top: 10px;
                padding-left: ${i * 10}px;">
                <div><b>From:</b> ${reply.headers.from}</div>
                <div><b>Date:</b> ${new Date(
                    reply.headers.sentDate
                ).generateFullDateFormat()}</div>
                <div><b>To:</b> ${reply.headers.to.commaSeparatedFormat()}</div>
                <div><b>CC:</b> ${reply.headers.cc.commaSeparatedFormat()}</div>
                <div><b>Subject:</b> ${reply.headers.subject}</div>

                ${reply.content}
                ${reply.footer.content}
            </blockquote>
        </td>
    </tr>
`;

let generateFooterDefaultTemplate = footer => `
    <tr>
        <td style="padding-top: 10px;">${footer}</td>
    </tr>
`;

let generateDefaultTemplate = email => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${email.headers.subject}</title>
</head>
<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
    <table
        align="left"
        border="0"
        cellpadding="0"
        cellspacing="0"
        height="100%"
        width="100%"
        id="body-table"
        style="font-family: sans-serif;">
        <tr>
            <td align="left" valign="top" id="bodyCell">
                <!-- BEGIN TEMPLATE // -->
                <table>
                    <tr>
                        <td align="left" valign="top">${email.content}</td>
                    </tr>
                    ${generateFooterDefaultTemplate(email.footer.content)}
                </table>
                <!-- // END BODY -->
            </td>
        </tr>
        <tr>
            <td align="center" valign="top">
                <!-- BEGIN COLUMNS // -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    ${email.replies.map(generateReplyTemplate).join('')}
                </table>
                <!-- // END COLUMNS -->
            </td>
        </tr>
        <tr>
            <td align="center" valign="top">
            <!-- BEGIN FOOTER // -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="template-footer">
                    
                </table>
                <!-- // END TEMPLATE -->
            </td>
        </tr>
    </table>
</body>
</html>
`;

export default {
    generateDefaultTemplate
};