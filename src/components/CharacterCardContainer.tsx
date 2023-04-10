import styled, { css } from 'styled-components';
import { Character } from '../graphql/types';
import theme from '../styles/theme';
import CharacterCard from './CharacterCard';

type CharacterCardContainerProps = {
    characters: Array<Character>
}
const CharacterSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  ${theme.media.phone(css`
    display: flex;
    flex-flow: column wrap;
    padding: 0;
    align-content: center;
`)}
`

const CharacterCardContainer = ({ characters }: CharacterCardContainerProps) => {
    return (
        <CharacterSection>
            {characters.map((character, indx) => (
                <CharacterCard key={indx} character={character} />
            ))}
        </CharacterSection>
    );
}

export default CharacterCardContainer;