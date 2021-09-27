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
                            <img src="/api/meme/get" alt="The meme submitted by you" />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubmitedMeme;
