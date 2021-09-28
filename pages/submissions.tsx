import Link from "next/link"
import deta, { User } from "@/components/deta"
import Meta from "@/components/Meta"
import Navbar from "@/components/Navbar"
import Notification from "@/components/Notification"
import { GetServerSideProps } from "next"
import { getSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { generateUserInformation } from "@/components/common/generateUserInformation"

interface SubmissionsParams {
    users: User[]
    user: User
}

interface MemeSubmissionsTableParams {
    data: User[]
}

const MemeSubmissionsTable = ({ data }: MemeSubmissionsTableParams) => {
    const [filteredData, setFilteredData] = useState<User[]>(data.filter(obj => obj.completed))

    const displayCompleted = () => setFilteredData(data.filter(obj => obj.completed))
    const displayIncomplete = () => setFilteredData(data.filter(obj => !obj.completed))

    return (
        <div className="card">
            <div className="card-content">
                <table className="table is-fullwidth is-hoverable is-stripped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Instagram</th>
                            <th>Meme</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((submission, key) => (
                            <tr key={key}>
                                <td>{submission.name}</td>
                                <td>{submission.key}</td>
                                <td>{submission.instagram}</td>
                                <td>
                                    <a href={'/api/meme/get/' + encodeURI(submission.key)}>View</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <a onClick={() => displayCompleted()} className="card-footer-item">Show Completed</a>
                <a onClick={() => displayIncomplete()} className="card-footer-item">Show Incomplete</a>
            </div>
        </div>
    )
}

const Submissions = ({ users, user }: SubmissionsParams) => {
    const router = useRouter()
    const userInfo = generateUserInformation(user)

    return (
        <div>
            <Meta title="Submissions" />
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
                                    <Link href="/dashboard">
                                        <a className="card-footer-item">Dashboard</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section">
                        <div className="container">
                            <MemeSubmissionsTable data={users} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    const db = deta.Base('users')
    const users = await db.fetch()
    const user = await db.get(session?.user?.email as string)

    return {
        props: {
            session,
            users: users.items,
            user
        }
    }
}

export default Submissions;
