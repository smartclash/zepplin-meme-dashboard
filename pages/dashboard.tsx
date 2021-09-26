import type { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/react';
import deta, { User } from '../components/deta';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import { GetResponse } from 'deta/dist/types/types/drive/response';
import MemeForm from '../components/MemeForm';
import SubmitedMeme from '../components/SubmitedMeme';
import InfoBoard from '../components/InfoBoard';

interface DashboardProps {
    user: User,
    meme: GetResponse
}

const generateUserInformation = (user: User) => {
    const emailPrefix = user.key.split('@')[0];
    const year = emailPrefix.substring(0, 2);
    const course = emailPrefix.match(/([a-z])+/g) || '';
    const roll = emailPrefix.split(course[0])[1];

    return {
        roll,
        year,
        course: course[0],
        prefix: emailPrefix
    }
}

const Dashboard = ({ user }: DashboardProps) => {
    const userInfo = generateUserInformation(user);

    return (
        <div>
            <Meta title="Dashboard" />
            <Navbar />

            <div className="columns">
                <div className="column is-8 is-offset-2">
                    <section className="section">
                        <div className="container">
                            <div className="card">
                                <div className="card-content">
                                    <div className="content">
                                        <h3 className="is-capitalized">
                                            Welcome, {user.name.toLocaleLowerCase()}
                                        </h3>
                                        <p>Department: {userInfo.course.toLocaleUpperCase()}</p>
                                        <p>Joining year: {'20' + userInfo.year}</p>
                                        <p>Roll Number: {userInfo.prefix.toLocaleUpperCase()}</p>
                                    </div>
                                    
                                </div>
                                <div className="card-footer">
                                    <a onClick={() => signOut()} className="card-footer-item">Logout</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    {user.completed ? <SubmitedMeme /> : <MemeForm />}
                    <InfoBoard />
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
