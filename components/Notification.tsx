import clsx from 'classnames';

interface NotificationParams {
    type: string
    message: string
}

const Notification = ({ type, message }: NotificationParams) => {
    return (
        <section className="section">
            <div className="container">
                <article className={clsx('message', {
                    'is-danger': type !== 'success',
                    'is-success': type === 'success'
                })}>
                    <div className="message-body">
                        {message}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Notification;