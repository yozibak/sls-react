

export const onCreateMember = /* GraphQL */ `
    subscription OnCreateMember {
        onCreateMember {
            createdAt
            id
            name
            updatedAt
        }
    }
`;

export const createMember = /* GraphQL */ `
    mutation CreateMember ($newMember: MemberInput) {
        createMember(newMember: $newMember) {
            createdAt
            id
            name
            updatedAt
        }
    }
`

export const getMemberById = /* GraphQL */ `
    query GetMemberById($id:string!) {
        getMemberById(id: $id) {
        createdAt
        id
        name
        updatedAt
        }
    }
`

export const listMembers = /* GraphQL */ `
    query ListMembers {
        listMembers {
            createdAt
            id
            name
            updatedAt
        }
    }
`

  