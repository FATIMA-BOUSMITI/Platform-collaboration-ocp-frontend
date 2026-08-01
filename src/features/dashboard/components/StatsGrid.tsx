import "./StatsGrid.css";

import StatCard from "./StatCard";


import type { DashboardStat } from "../dashboard.types";

interface Props{

    stats: DashboardStat[];

}

function StatsGrid({ stats}: Props){

    return(

        <div className="stats-grid">

            {

                stats.map((stat,index)=>(

                    <StatCard

                        key={index}

                        title={stat.title}

                        value={stat.value !== undefined ? String(stat.value) : ""}


                        trendColor={stat.trendColor}

                        description={stat.description}

                        icon={stat.icon}

                        iconColor={stat.iconColor}

                    />

                ))

            }

        </div>

    );

}

export default StatsGrid;