
import Imap = require('imap');

type EmailHeaders = {
  subject: string | undefined;
  from: string | undefined;
};

export function getLatestEmailHeaders(): Promise<EmailHeaders> {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: '',
      password: '',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized: false, // 👈 disables cert validation
      },
    });

    function openInbox(cb: (err: Error | null, box: any) => void) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function () {
      openInbox(function (err, box) {
        if (err) return reject(err);

        const f = imap.seq.fetch(`${box.messages.total}:*`, {
          bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
          struct: true,
        });

        f.on('message', function (msg: any) {
          let buffer = '';
          msg.on('body', function (stream: any) {
            stream.on('data', (chunk: Buffer) => {
              buffer += chunk.toString('utf8');
            });

            stream.once('end', function () {
              const headers = Imap.parseHeader(buffer);
              resolve({
                subject: headers.subject?.[0],
                from: headers.from?.[0],
              });
            });
          });
        });

        f.once('error', function (err: Error) {
          reject(err);
        });

        f.once('end', function () {
          imap.end();
        });
      });
    });

    imap.once('error', function (err: Error) {
      reject(err);
    });

    imap.connect();
  });
}
