import './SwipeableListItem.css';
import React from 'react';
import SwipeMenuAction from './SwipeMenuAction';
import styled from 'styled-components';

const SwipeMenu = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  width: 100%;
  right: 0;
  justify-content: flex-start;
  padding-left: ${props => props.padLeft}px;

  @media (max-width: 500px) {
    flex-wrap: ${props => (props.wrapList ? 'wrap' : 'nowrap')};
  }
`;

class SwipeableListItem extends React.Component {
  // DOM Refs
  listElement;
  wrapper;
  background;

  // Drag & Drop
  dragStartX = 0;
  left = 0;
  dragged = false;

  // position & padding
  numActions = this.props.actions.length;
  viewportWidth = window.innerWidth;
  vw = this.viewportWidth / 100;
  actionSizeBase = 100 / (this.numActions + 1);
  actionSize = Math.min(this.actionSizeBase, 25);
  menuOpen = -1 * (this.actionSize * this.numActions) * this.vw;
  padLeft = 100 * this.vw - Math.abs(this.menuOpen);
  wrap = this.numActions > 4;

  // FPS Limit
  startTime;
  fpsInterval = 1000 / 60;

  constructor(props) {
    super(props);

    this.listElement = null;
    this.wrapper = null;
    this.background = null;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragStartTouch = this.onDragStartTouch.bind(this);
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEndTouch = this.onDragEndTouch.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onClicked = this.onClicked.bind(this);

    this.onSwiped = this.onSwiped.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onDragEndMouse);
    window.addEventListener('touchend', this.onDragEndTouch);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onDragEndMouse);
    window.removeEventListener('touchend', this.onDragEndTouch);
  }

  onDragStartMouse(evt) {
    this.onDragStart(evt.clientX);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  onDragStartTouch(evt) {
    const touch = evt.targetTouches[0];
    this.onDragStart(touch.clientX);
    window.addEventListener('touchmove', this.onTouchMove);
  }

  onDragStart(clientX) {
    this.dragged = true;
    this.dragStartX = clientX;
    this.startPos = this.left;
    this.listElement.className = 'ListItem';
    this.startTime = Date.now();
    requestAnimationFrame(this.updatePosition);
  }

  onDragEndMouse(evt) {
    window.removeEventListener('mousemove', this.onMouseMove);
    this.onDragEnd();
  }

  onDragEndTouch(evt) {
    window.removeEventListener('touchmove', this.onTouchMove);
    this.onDragEnd();
  }

  onDragEnd() {
    if (this.dragged) {
      this.dragged = false;

      const threshold =
        this.startPos === 0 ? this.props.threshold || 0.3 : 1 - this.props.threshold || 0.7;

      if (this.left < this.listElement.offsetWidth * threshold * -1) {
        this.left = this.menuOpen;
        this.onSwiped();
      } else {
        this.left = 0;
      }

      this.listElement.className = 'BouncingListItem';
      this.listElement.style.transform = `translateX(${this.left}px)`;
    }
  }

  onMouseMove(evt) {
    const left = evt.clientX - this.dragStartX;
    if (this.startPos === this.menuOpen) {
      if (left < 0) {
        this.left = this.menuOpen;
      } else {
        this.left = this.startPos + left;
      }
    } else if (this.startPos === 0) {
      if (left > 0) {
        this.left = 0;
      } else {
        this.left = left;
      }
    }
  }

  onTouchMove(evt) {
    const touch = evt.targetTouches[0];
    const left = touch.clientX - this.dragStartX;

    if (this.startPos === this.menuOpen) {
      if (left < 0) {
        this.left = this.menuOpen;
      } else {
        this.left = this.startPos + left;
      }
    } else if (this.startPos === 0) {
      if (left > 0) {
        this.left = 0;
      } else {
        this.left = left;
      }
    }
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);

    const now = Date.now();
    const elapsed = now - this.startTime;

    if (this.dragged && elapsed > this.fpsInterval) {
      this.listElement.style.transform = `translateX(${this.left}px)`;

      const opacity = (Math.abs(this.left) / 100).toFixed(2);
      if (opacity < 1 && opacity.toString() !== this.background.style.opacity) {
        this.background.style.opacity = opacity.toString();
      }
      if (opacity >= 1) {
        this.background.style.opacity = '1';
      }

      this.startTime = Date.now();
    }
  }

  onClicked() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }

  onSwiped() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }

  render() {
    return (
      <>
        <div
          className='Wrapper'
          data-test='swipeable-list-item'
          ref={div => (this.wrapper = div)}
          style={this.props.style}
        >
          <div ref={div => (this.background = div)} className='Background'>
            <SwipeMenu wrapList={this.wrap} padLeft={this.padLeft} className='swipeMenu'>
              {this.props.actions.map((item, idx) => (
                <SwipeMenuAction
                  wrapList={this.wrap}
                  className='action'
                  key={idx}
                  size={this.actionSize}
                  name={item.name}
                  icon={item.icon}
                  background={item.background}
                  handleClick={item.link}
                />
              ))}
            </SwipeMenu>
          </div>
          <div
            onClick={this.onClicked}
            ref={div => (this.listElement = div)}
            onMouseDown={this.onDragStartMouse}
            onTouchStart={this.onDragStartTouch}
            className='ListItem'
          >
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default SwipeableListItem;
