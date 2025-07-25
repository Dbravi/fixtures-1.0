import * as imaps from 'imap-simple';
import { ImapSimple, Message } from 'imap-simple';
import { simpleParser, ParsedMail } from 'mailparser';

const config = {
    imap: {
        user: '',
        password: '',
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: {
            rejectUnauthorized: false, // 👈 disables cert validation
        },
        authTimeout: 5000
    }
};

export type EmailData = {
    subject: string;
    from: string;
    text?: string;
    html?: string;
};

export async function getLatestEmailUnseen(): Promise<EmailData | null> {
    const connection: ImapSimple = await imaps.connect(config);
    await connection.openBox('INBOX');
    // Retrieve unseen emails from the last 10 minutes
    // const searchCriteria = ['UNSEEN', ['SINCE', new Date(Date.now() - 1000 * 60 * 10)]];
    const searchCriteria = ['ALL'];

    const fetchOptions = { bodies: [''], markSeen: true };

    const results: Message[] = await connection.search(searchCriteria, fetchOptions);

    if (!results.length) {
        return null;
    }

    const raw = results[results.length - 1].parts[0].body;
    const parsed: ParsedMail = await simpleParser(raw);

    return {
        subject: parsed.subject || '',
        from: typeof parsed.from?.text === 'string' ? parsed.from.text : '',
        text: typeof parsed.text === 'string' ? parsed.text : '',
        html: typeof parsed.html === 'string' ? parsed.html : undefined,
    };
}

export async function getLatestEmailAll(): Promise<EmailData | null> {
    const connection: ImapSimple = await imaps.connect(config);
    await connection.openBox('INBOX');

    // Retrieve all emails regardless of seen/unseen status
    const searchCriteria = ['ALL'];
    const fetchOptions = { bodies: [''], markSeen: false };

    const results: Message[] = await connection.search(searchCriteria, fetchOptions);

    if (!results.length) {
        return null;
    }

    // Get the last message (latest)
    const raw = results[results.length - 1].parts[0].body;
    const parsed = await simpleParser(raw);

    return {
        subject: parsed.subject || '',
        from: typeof parsed.from?.text === 'string' ? parsed.from.text : '',
        text: typeof parsed.text === 'string' ? parsed.text : '',
        html: typeof parsed.html === 'string' ? parsed.html : undefined,
    };
}

async function deleteEmailsFrom(senderEmail: string) {
    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    // Search all emails (you can customize the criteria)
    const messages = await connection.search(['ALL'], { bodies: ['HEADER'] });

    // Filter messages from the given sender email
    const uidsToDelete = messages
        .filter(message => {
            const headerPart = message.parts.find(part => part.which === 'HEADER');
            if (!headerPart) return false;
            const fromList = headerPart.body.from || [];
            // fromList is an array of strings, check if any matches senderEmail
            return fromList.some((from: string) => from.toLowerCase().includes(senderEmail.toLowerCase()));
        })
        .map(message => message.attributes.uid);

    if (uidsToDelete.length === 0) {
        console.log(`No emails from ${senderEmail} found to delete.`);
        await connection.end();
        return;
    }

    // Delete the messages by UID
    await connection.deleteMessage(uidsToDelete);
    console.log(`Deleted ${uidsToDelete.length} emails from ${senderEmail}.`);

    await connection.end();
}

export async function deleteLastEmails(count: number) {
    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    const messages = await connection.search(['ALL'], { bodies: ['HEADER'] });

    if (messages.length === 0) {
        console.log('No emails found to delete.');
        await connection.end();
        return;
    }

    // Get the last `count` emails (or fewer if not enough)
    const emailsToDelete = messages.slice(-count);

    const uidsToDelete = emailsToDelete.map(msg => msg.attributes.uid);

    if (uidsToDelete.length === 0) {
        console.log('No emails matched for deletion.');
        await connection.end();
        return;
    }

    await connection.deleteMessage(uidsToDelete);

    console.log(`Deleted ${uidsToDelete.length} email(s).`);

    await connection.end();
}

export async function deleteLastEmailsWithSubject(count: number) {
    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    const messages = await connection.search(['ALL'], { bodies: ['HEADER'] });

    if (messages.length === 0) {
        console.log('No emails found to delete.');
        await connection.end();
        return;
    }

    // Get the last `count` emails (or fewer if not enough)
    const emailsToDelete = messages.slice(-count);

    const uidsToDelete = emailsToDelete.map(msg => msg.attributes.uid);

    if (uidsToDelete.length === 0) {
        console.log('No emails matched for deletion.');
        await connection.end();
        return;
    }

    // Log subject and from for each email
    emailsToDelete.forEach(msg => {
        const headerPart = msg.parts.find(part => part.which === 'HEADER');
        const header = headerPart?.body;

        const subject = Array.isArray(header?.subject) ? header.subject[0] : '(no subject)';
        const from = Array.isArray(header?.from) ? header.from[0] : '(no from)';

        console.log(`Deleting email - Subject: "${subject}", From: "${from}"`);
    });

    await connection.deleteMessage(uidsToDelete);
    console.log(`Deleted ${uidsToDelete.length} email(s).`);

    await connection.end();
}
