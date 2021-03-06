import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/react';
import deta, { User } from '@/components/deta';
import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import { GetResponse } from 'deta/dist/types/types/drive/response';
import MemeForm from '@/components/MemeForm';
import SubmitedMeme from '@/components/SubmitedMeme';
import InfoBoard from '@/components/InfoBoard';
import { useRouter } from 'next/router';
import Notification from '@/components/Notification';
import { generateUserInformation } from '@/components/common/generateUserInformation';

interface DashboardProps {
    user: User,
    meme: GetResponse
}

const Dashboard = ({ user }: DashboardProps) => {
    const router = useRouter();
    const userInfo = generateUserInformation(user);

    return (
        <div>
            <Meta title="Dashboard" />
            <Navbar />

            <div className="columns">
                <div className="column is-8 is-offset-2">
                    {router.query.type && 
                        <Notification 
                            type={router.query.type as string}
                            message={router.query.message as string} />}
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
                                    <Link href="/submissions">
                                        <a className="card-footer-item">Submissions</a>
                                    </Link>
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
                                            <a href="https://firebasestorage.googleapis.com/v0/b/zepplin21-fa4fd.appspot.com/o/meme.jpg?alt=media&token=a73cc9ca-ae9c-463e-90db-51ac17b6e918" className="card-footer-item">Read Rules ???</a>
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
                                            <a href="https://www.instagram.com/zepplin_meme/" className="card-footer-item">Instagram ???</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <p className="card-header-title">WhatsApp</p>
                                        </div>
                                        <div className="card-content">
                                            <div className="content">
                                                Join Zepplin's WhatsApp group and have fun with fellow participants. Ask questions and get them sorted out too.
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <a href="https://chat.whatsapp.com/GYmahaLzrC17K2y2FUXDU2" className="card-footer-item">WhatsApp ???</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        Website Built by <a href="https://alphaman.me/">Karan Sanjeev Nair</a>, 3rd year CSE.
                    </p>
                    <p>
                        Source code of this website is available at&nbsp;
                        <a href="https://github.com/smartclash/zepplin-meme-dashboard">Github</a>
                    </p>
                </div>
            </footer>
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
