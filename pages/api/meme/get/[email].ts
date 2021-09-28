import type { NextApiRequest, NextApiResponse } from "next";
import deta from "@/components/deta";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const theQuery = req.query.email as string;
    const email = theQuery.split('.jpg')[0];

    const drive = deta.Drive('memes');
    const meme = await drive.get(email as string);

    if (!meme) {
        return res.status(404).send('');
    }

    res.setHeader('Content-Type', meme?.type as string);
    return res.status(200).send(meme?.stream());
}

export default handler;
