import React from 'react'
import styled, { css } from 'styled-components'
import { Character } from '../graphql/types'

type CharacterCardProps = {
    character: Character
}


const Wrapper = styled.article(
    ({ theme }) => css`
      width: 350px;
      height: 220px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: #3c3e44;
      border-radius: ${theme.spacing._8};
      margin: ${theme.spacing._12};
      box-shadow: ${theme.shadows.md};
      height: initial;
      ${theme.media.phone(css`
        flex-direction: column;
        height: initial;
        width: 100%;
      `)}
    `,
)

const ImgWrapper = styled.div(
    ({ theme }) => css`
      flex: 2;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        margin: 0;
        opacity:1;
        transition: opacity 0.5s;
        object-position: center;
        object-fit: cover;
        height: 300px;
        ${theme.media.phone(css`
          height: 300px;
        `)}
      }
    `,
)

const ContentWrapper = styled("div") <{ status: string }>`
    ${({ theme, status }) => {

        return css`
        flex: 3;
        position: relative;
        padding: ${theme.spacing._12} ${theme.spacing._12};
        color: ${theme.white};
        display: flex;
        flex-direction: column;
        span,
        h2 {
          margin: 0;
          padding: 0;
        }
        h2 {
          font-size: ${theme.spacing['_20']};
        }
        span {
          font-size: 16px;
          font-weight: 500;
        }
        a {
          color: ${theme.whitesmoke};
          ${theme.mixins.hover(css`
            color: ${theme.primary};
            text-decoration: none;
          `)}
        }
        .text-gray {
          color: ${theme.gray};
        }
        .section {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          &:first-child {
            justify-content: flex-start;
          }
          &:last-child {
            justify-content: flex-end;
          }
        }
        .section-column {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .section + .section {
            margin-top: ${theme.spacing._20};
          }

        ${theme.media.phone(css`
          .section + .section {
            margin-top: ${theme.spacing._20};
          }
        `)}
        .status {
          display: flex;
          align-items: center;
          text-transform: capitalize;
          &__icon {
            height: ${theme.spacing._8};
            width: ${theme.spacing._8};
            margin-right: ${theme.spacing.rem(6)};
            border-radius: 50%;
          }
          color: ${status === 'Alive' ? theme.green : status === 'Dead' ? theme.red : theme.gray};
        }
        ${theme.media.phone(css`
          pointer-events: none;
        `)}
      `
    }}
  `

const CharacterCard = ({ character }: CharacterCardProps) => {

    return (
        <Wrapper>
            <ImgWrapper>
                <img src={character.image} alt={character.name} />
            </ImgWrapper>
            <ContentWrapper status={character.status}>
                <div className="section">
                    <div className="section-column">
                        <h2>{character.name}</h2>
                        <span className="status">
                            Status: {character.status}
                        </span>
                    </div>
                </div>
                <div className="section">
                    <div className="section-column">
                        <span className="text-gray">Gender:</span>
                        {character?.gender || 'Unknown'}
                    </div>
                    <div className="section-column">
                        <span className="text-gray">Species:</span>
                        {character?.species || 'Unknown'}
                    </div>
                    <div className="section-column">
                        <span className="text-gray">Type:</span>
                        {character?.type || 'Unknown'}
                    </div>
                </div>
                <div className="section">
                    <div className="section-column">
                        <span className="text-gray">Origin:</span>
                        {character.origin?.name || 'Unknown'}
                    </div>
                    <div className="section-column">
                        <span className="text-gray">Last known location:</span>
                        {character.location?.name || 'Unknown'}
                    </div>
                </div>
            </ContentWrapper>
        </Wrapper>
    )
}

export default CharacterCard