import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Navbar = () => {
    const session = useSession();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <Link href="/">
                        <a className="navbar-item is-size-4 has-text-weight-medium">
                            Zeppline Meme
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
