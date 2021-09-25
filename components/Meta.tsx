import Head from 'next/head';

interface MetaParams {
    title?: string
}

const Meta = (params: MetaParams) => {
    return (
        <Head>
            <title>{params.title ? params.title + ' | Meme Event | Zepplin' : 'Meme Event | Zepplin '}</title>
            {/* This has to be the lame-st description ever */}
            <meta name="description" content="A 3 day extravaganza for KCG College students to have fun and flaunt their hidden talents" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default Meta;
