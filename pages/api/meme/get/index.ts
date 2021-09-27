import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import deta from "@/components/deta";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(404).send('');
    }

    const db = deta.Base('users');
    const user = await db.get(session.user?.email as string);

    if (user && !user.completed) {
        return res.status(404).send('');
    }

    const drive = deta.Drive('memes');
    const meme = await drive.get(session.user?.email as string);

    res.setHeader('Content-Type', meme?.type as string);
    return res.status(200).send(meme?.stream());
}

export default handler;
