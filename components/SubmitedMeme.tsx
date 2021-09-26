import Image from 'next/image'

const SubmitedMeme = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">
                            Your Meme
                        </p>
                    </div>
                    <div className="card-image">
                        <figure className="image is-3by2">
                            <Image src="/api/meme/get" layout="fill" />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubmitedMeme;
