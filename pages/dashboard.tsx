import type { GetServerSideProps } from 'next';
import { useState } from 'react';
import { signOut, getSession } from 'next-auth/react';
import deta, { User } from '../components/deta';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import { GetResponse } from 'deta/dist/types/types/drive/response';

interface DashboardProps {
    user: User,
    meme: GetResponse
}

const MemeForm = () => {
    const [file, setFile] = useState<File>();

    return (
        <section className="section">
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">
                            Submit your Meme!
                        </p>
                    </div>
                    <div className="card-content">
                        <form action="http://localhost:3000/api/meme/upload" method="POST" encType="multipart/form-data">
                            <div className="field">
                                <label htmlFor="ighandle" className="label">Your IG handle</label>
                                <div className="control">
                                    <input 
                                        type="text" className="input" name="ighandle" 
                                        id="ighandle" placeholder="@myInstaHandle" required />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="meme" className="button is-outlined is-fullwidth">
                                    {file ? 'Selected ' + file.name : 'Select your Meme'}
                                </label>
                                <div className="control">
                                    <input
                                        type="file" name="meme" id="meme" required
                                        className="button is-primary is-outlined is-sr-only" 
                                        onChange={e => {
                                            if (e.target.files?.length) {
                                                setFile(e.target.files[0])
                                            }
                                        }} />
                                </div>
                            </div>
                            <hr />
                            <div className="field">
                                <div className="control">
                                    <input type="submit" value="Submit Meme" className="button is-primary is-fullwidth is-outlined" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Dashboard = ({ user }: DashboardProps) => {
    return (
        <div>
            <Meta title="Dashboard" />
            <Navbar />

            <div className="columns">
                <div className="column is-8 is-offset-2">
                    <section className="section">
                        <div className="container">
                            <h1 className="is-size-3 is-capitalized">
                                Welcome, {user.name.toLocaleLowerCase()} - <a onClick={() => signOut()}>Logout</a>
                            </h1>
                        </div>
                    </section>
                    {!user.completed && <MemeForm />}
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
                                            <a href="https://firebasestorage.googleapis.com/v0/b/zepplin21-fa4fd.appspot.com/o/meme.jpg?alt=media&token=a73cc9ca-ae9c-463e-90db-51ac17b6e918" className="card-footer-item" target="_blank">Read Rules ↗</a>
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
                                            <a href="" className="card-footer-item" target="_blank">Instagram ↗</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <p className="card-header-title">Discord</p>
                                        </div>
                                        <div className="card-content">
                                            <div className="content">
                                                Join Zepplin's Discord server and have fun with fellow participants. Ask questions and get them sorted out too.
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <a href="https://discord.gg/fH6fuJ5WWk" className="card-footer-item" target="_blank">Discord ↗</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
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
