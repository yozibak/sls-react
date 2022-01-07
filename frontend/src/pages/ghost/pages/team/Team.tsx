import { useContext, useState } from "react"
import { currentTeamContext, useMembersStore } from "../../contexts/members";


export const Team = () => {
    const membersCtx = useMembersStore()

    return (
        <currentTeamContext.Provider value={membersCtx}>
            <TeamMemberList/>
            <TeamMemberInput />
        </currentTeamContext.Provider>
    )
}

// This component doesn't have team props but re-renders litening to its nearest provider.
const TeamMemberList = () => {

    // use members as you want. anywhere under provider.
    // this members listen to backend changes by graphql subscription.
    const { members } = useContext(currentTeamContext)

    return (
        <>
            <div>My Super Awsome Team</div>
            <ul>
                {
                    members.map(member => <li key={member.id}>{member.name}</li>)
                }
            </ul>
        </>
    )
}

const TeamMemberInput = () => {

    const [formState, setFormState] = useState('')

    // currentTeamContext also provides state mutation as if it's like useState
    const { members, setMembers } = useContext(currentTeamContext)

    return (
        <div>
            <div>Join now.</div>
            <input value={formState} onChange={e => setFormState(e.target.value)} />            
            <button onClick={()=>setMembers([...members, {name: formState, id: members.length}])}>
                Join!
            </button>
        </div>
    )
}