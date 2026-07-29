import "./RecentActivityItem.css";

interface RecentActivityItemProps {

    color: string;

    title: string;

    subtitle: string;

    time: string;

}

function RecentActivityItem({

    color,

    title,

    subtitle,

    time

}: RecentActivityItemProps) {

    return (

        <div className="activity-item">

            <div className="activity-left">

                <span
                    className="activity-dot"
                    style={{ background: color }}
                />

                <div>

                    <h4>{title}</h4>

                    <p>{subtitle}</p>

                </div>

            </div>

            <span className="activity-time">

                {time}

            </span>

        </div>

    );

}

export default RecentActivityItem;