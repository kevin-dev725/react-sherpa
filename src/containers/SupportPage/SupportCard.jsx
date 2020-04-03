import React from 'react';
import styled from 'styled-components';
import IconBg from '../../components/IconBg';

const StyledCard = styled.a`
  box-sizing: border-box;
  padding: var(--pad4) var(--pad3);
  margin-bottom: var(--pad4);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 6px;
  position: relative;
  color: var(--darkNavy);
  transition: box-shadow 0.15s;
  justify-content: center;

  &:hover,
  &:active {
    text-decoration: none;
    color: var(--darkNavy);

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const Content = styled.div`
  text-align: left;
  margin-left: var(--pad3);
  flex-basis: 80%;
`;

function SupportCard(props) {
  const { title, description, icon, color, alt, url } = props.item;

  return (
    <StyledCard
      data-test='support-card'
      name={title}
      target='_blank'
      rel='noopener noreferrer'
      href={url}
    >
      <IconBg
        format='hex'
        textcol={color}
        icon={icon || 'brain'}
        alt={alt}
        size='2x'
        width='50px'
        height='50px'
      />

      <Content>
        <h3>{title}</h3>
        <div>{description}</div>
      </Content>
    </StyledCard>
  );
}

export default SupportCard;
