import { Metadata } from "next";
import { LeaderboardComponent } from "./../components/Leaderboard/LeaderboardComponent";

export const metadata: Metadata = {
    title: "Leaderboard",
};


const LeaderboardPage = () => {
    return (
        <LeaderboardComponent />
    );
}

export default LeaderboardPage;