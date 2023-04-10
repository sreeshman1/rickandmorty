import { gql } from "@apollo/client";

export const CHARACTER_QUERY = gql`
    query Character($id: ID!) {
        character(id: $id) {
            id
            name
            image
        }
    }
`

export const CHARACTERS_QUERY = gql`
    query Characters($page: Int = 1, $filter: FilterCharacter) {
        characters(page: $page, filter: $filter) {
            info {
                count
                pages
            }
            results {
                id
                name
                image
                status
                species
                gender
                type
                location {
                    name
                }
                origin {
                    name
                }
            }
        }
    }
`