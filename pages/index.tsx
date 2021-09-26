import type { GetServerSideProps, NextPage } from 'next'
import { signIn, getSession } from 'next-auth/react'
import Meta from '../components/Meta';

const Home: NextPage = () => {
    return (
        <div>
            <Meta />

            <section className="hero is-fullheight is-info">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Zepplin Meme</h1>
                        <h2 className="subtitle">Login with your official email ID to make submissions</h2>
                        <a href="#" onClick={() => signIn('google')} className="button is-outlined is-medium is-info is-inverted">Login with Google</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: '/dashboard'
            }
        };
    }

    return {
        props: {
            session
        }
    }
}

export default Home
