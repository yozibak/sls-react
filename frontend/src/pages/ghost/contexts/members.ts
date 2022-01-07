
import { createContext, useEffect, useState } from 'react'
import { initalTeamMembers } from '../assets/mockData';
import { TeamMember } from '../root'

import { API, graphqlOperation } from 'aws-amplify'
import { listMembers, onCreateMember } from '../../../graphql/all';

export const currentTeamContext = createContext<MembersStore>(
    // just initial obj
    {
        members: initalTeamMembers,
        setMembers: (newMembers:TeamMember[]) => {},
        updating: false,
        asyncChange: (newMember:TeamMember) => {}
    }
)


type MembersStore = {
    members: TeamMember[]
    setMembers: (newMembers:TeamMember[]) => void
    updating: boolean
    asyncChange: (newMember:TeamMember) => void
}


export const useMembersStore = () => {

    const [updating, setUpdating] = useState(false);
    const [members, setMembers] = useState<TeamMember[]>(initalTeamMembers);

    // add-queue state. Don't directlly add to members when subscription fires.
    const [newMember, setNewMember] = useState<TeamMember>()

    // init fetch
    useEffect(() => {
      async function initFetch() {
        const res:any = await API.graphql(graphqlOperation(listMembers))
        const newmembers = res.data.listMembers.map( (m:any) => ({id:m.id, name:m.name}))
        setMembers([...members, ...newmembers])
      }
      initFetch()
    }, [])

    useEffect(()=>{
      if (newMember) {
        setUpdating(true)
        setMembers([...members, newMember])
        setUpdating(false)
        setNewMember(undefined)
      }
    }, [newMember])
    
    useEffect(()=>{
      const subsription = API.graphql(graphqlOperation(onCreateMember)) as any
      subsription.subscribe({
        next: (evt:any) => {
          const newbie = evt.value.data.onCreateMember
          console.log(evt, newbie)
          setNewMember({id: newbie.id, name: newbie.name})
        }
      })
      return () => subsription.unsubscribe()
    }, [])
    

    const asyncChange = (newMember:TeamMember) => {
      setUpdating(true);
      setTimeout(() => {
        setMembers([...members,newMember]);
        setUpdating(false);
      }, 3000);
    };
  
    // maybe subscribe backend changes here...
  
    return { members, setMembers, updating, asyncChange };
  };