import type { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/react';
import deta, { User } from '../components/deta';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';

interface DashboardProps {
    user: User
}

const Dashboard = ({ user }: DashboardProps) => {
    return (
        <div>
            <Meta title="Dashboard" />
            <Navbar />

            <section className="section">
                <div className="container">
                    <h1 className="is-size-3 is-capitalized">
                        Welcome, {user.name.toLocaleLowerCase()} - <a onClick={() => signOut()}>Logout</a>
                    </h1>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4">
                            <div className="card">
                                <div className="card-header">
                                    <p className="card-header-title">Rules</p>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        You gotta follow some rules to make sure your meme is accepted into this competition.
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <a href="" className="card-footer-item">Read Rules ↗</a>
                                </div>
                            </div>
                        </div>
                        <div className="column is-4">
                            <div className="card">
                                <div className="card-header">
                                    <p className="card-header-title">Meme IG Handle</p>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        Submissions made by participants will be posted at the official Zepplin's Meme Instagram handle.
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <a href="" className="card-footer-item">Instagram ↗</a>
                                </div>
                            </div>
                        </div>
                        <div className="column is-4">
                            <div className="card">
                                <div className="card-header">
                                    <p className="card-header-title">Zepplin Website</p>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        Visit the official Zepplin website to know various other events conducted.
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <a href="" className="card-footer-item">Website ↗</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        };
    }

    const db = deta.Base('users');
    let user = await db.get(session.user?.email as string);

    if (!user) {
        user = await db.put({
            key: session.user?.email,
            name: session.user?.name,
            disqualified: false,
            completed: false,
            selected: false,
            instagram: "",
            position: "",
            won: false,
        });
    }

    return {
        props: {
            session,
            user
        }
    }
}

export default Dashboard;
