import { useState } from "react";

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
                        <form action="/api/meme/upload" method="POST" encType="multipart/form-data">
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

export default MemeForm;
