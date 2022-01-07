import { Team } from "./pages/team/Team"


export const Ghost = () => {

    return (
        <div>
            <div>Welcome to Ghost App</div>
            <hr/>
            <Team />
        </div>
    )
}

export type TeamMember = {
    id: number
    name: string
}