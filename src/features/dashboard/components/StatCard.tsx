import "./StatCard.css";

interface StatCardProps {

    title: string;

    value: string;

    trend: string;

    trendColor: string;

    description: string;

    icon: React.ReactNode;

    iconColor: string;

}

function StatCard({

    title,

    value,

    trend,

    trendColor,

    description,

    icon,

    iconColor

}: StatCardProps) {

    return (

        <div className="stat-card">

            <div className="stat-top">

                <div>

                    <p className="stat-title">

                        {title}

                    </p>

                    <h2 className="stat-value">

                        {value}

                    </h2>

                </div>

                <div
                    className="stat-icon"
                    style={{ color: iconColor }}
                >

                    {icon}

                </div>

            </div>

            <div className="stat-bottom">

                <span
                    className="trend"
                    style={{ color: trendColor }}
                >

                    {trend}

                </span>

                <span className="description">

                    {description}

                </span>

            </div>

        </div>

    );

}

export default StatCard;