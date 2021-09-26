const InfoBoard = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">Event Information</p>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <h2>How it works?</h2>
                            <p>
                                Memes submitted will be posted into Zepplin's official Meme instagram handle.
                                Participants can then like and share the memes. After judging, top 5 submissions will
                                be selected and sent to finals.
                            </p>
                            <p>
                                For the finals, the top 5 participants will be given a theme.
                                Jury will select 3 memes based on the uniqueness.
                            </p>

                            <hr />

                            <h2>Judging</h2>
                            <p>Memes will be posted into the official Zepplin's Meme page</p>
                            <ul>
                                <li>50% of the weightage will be considered from the likes</li>
                                <li>50% of the weightage will be considered by the quality of content</li>
                            </ul>

                            <hr />

                            <h2>Rules</h2>
                            <ul>
                                <li>Memes should not be offensive, political or portray hatered towards any group</li>
                                <li>Memes should be unique and original. Reused memes will be disqualified</li>
                                <li>Using likes generator will get you disqualified. Zero tolerance, hey!</li>
                            </ul>

                            <hr />

                            <h2>Timings</h2>
                            <h3>Preliminaries</h3>
                            <ul>
                                <li>Participants have time till 7:00 AM of 28th September 2021 to post their memes</li>
                                <li>Submitted memes will be posted into the official groups before 8:00 AM</li>
                            </ul>
                            <h3>Judging</h3>
                            <ul>
                                <li>Judging starts by 1:30 PM of 29th September 2021</li>
                                <li>Top 5 submissions will be announced before 2:30 PM and new theme will be announced</li>
                            </ul>
                            <h3>Finals</h3>
                            <ul>
                                <li>Finalists are required to submit memes based on the new theme before 1:30 PM of 30th September 2021</li>
                                <li>Jury will select 3 best submissions and announce the winners before 2:30 PM</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoBoard;
