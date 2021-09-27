import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { File } from 'formidable'
import { getSession } from 'next-auth/react'
import deta from '@/components/deta'

type Data = {
  type: 'SUCCESS' | 'ERROR'
  message: string
  data?: any
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
    const db = deta.Base('users');
    const session = await getSession({ req });
    if (!session) {
        return res.redirect('/');
    }

    const user = await db.get(session.user?.email as string);
    if (user && user.completed) {
        return res.redirect('/dashboard');
    }

    const form = formidable({ multiples: false });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.redirect('/dashboard?type=error&message=' + encodeURIComponent("Could not upload meme"));
        }

        const igHandle = fields.ighandle as string;
        const meme = files.meme as File;

        await db.update({
            completed: true,
            instagram: igHandle
        }, session?.user?.email as string);

        if (!meme.type?.startsWith('image')) {
            return res.redirect('/dashboard?type=error&message=' + encodeURIComponent("Meme should be a picture"));
        }

        const drive = deta.Drive('memes');
        await drive.put(session?.user?.email as string, {
            path: meme.path,
            contentType: meme.type as string
        });

        return res.redirect('/dashboard?type=success&message=' + encodeURIComponent("Meme submitted successfully"));
    })
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler;
