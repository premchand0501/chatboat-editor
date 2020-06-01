import React from 'react';
import './dragdrop.scss';


class DragDrop extends React.Component {
  state = {
    questions: [],
    dragEl: null,
    rect: null,
    moveY: 0,
  }
  async componentDidMount() {
    try {
      const res = await fetch('/chatboat-editor/questions.json');
      const resData = await res.json()
      console.log(res);
      if (resData) {
        this.setState({
          questions: resData.slice(0, 5)
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  handleDragStart(e, i) {
    e.preventDefault();
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.classList.add('dragging')
    rect.pos = {
      x: e.clientX,
      y: e.clientY,
    }
    target.setAttribute('style', `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      transform: translate(0, 0);
      will-change: transform;
      transform-origin: left;
      z-index: 100;
      pointer-events: none;
    `);
    this.setState({
      dragEl: target,
      rect,
      moveIndex: i
    })
    if (target.nextElementSibling) {
      const r = target.nextElementSibling.getBoundingClientRect()
      this.handleSibs(target.nextElementSibling, r);
    }
  }
  handleDragEnd(e) {
    const { dragEl } = this.state;
    if (dragEl) {
      dragEl.removeAttribute('style');
      dragEl.style.transform = 'translate(0,0)';
      dragEl.style.transition = 'all ease 0.5s';
      dragEl.style.zIndex = '1';

      setTimeout(() => {
        dragEl.removeAttribute('style');
        dragEl.classList.contains('dragging') && dragEl.classList.remove('dragging');
        this.setState({
          dragEl: null,
          rect: null,
        });
      }, 500)
      if (e.target.classList.contains('card')) {
        const r = e.target.getBoundingClientRect();
        this.handleSibs(e.target, r, false)
      }
    }
  }
  handleSibs(target, rect, flag = true) {
    if (target !== this.state.dragEl) {
      target.setAttribute('style', `transform: translate(0, ${flag ? rect.height * (this.state.moveY >= 0 ? 1 : -1) : 0}px); transition: all ease ${flag ? 0.1 : 0}s;`)
      const targ = this.state.moveY >= 0 ? target.nextElementSibling : target.previousElementSibling
      if (targ) {
        const r = targ.getBoundingClientRect();
        this.handleSibs(targ, r, flag);
      }
    }
  }
  handleMouseMove(e) {
    const { dragEl, rect, moveY } = this.state;
    if (dragEl) {
      const x = e.clientX - rect.pos.x
      const y = e.clientY - rect.pos.y
      dragEl.style.transform = `translate(${x}px, ${y}px)`;
      if ((moveY > 0 && e.movementY < 0) || (moveY < 0 && e.movementY > 0)) {
        this.setState({
          moveY: e.movementY
        })
        console.log(e.movementY)
      }
    }
  }
  handleMouseEnter(e) {
    if (this.state.dragEl) {
      if (e.target.classList.contains('card')) {
        const rect = e.target.getBoundingClientRect();
        this.handleSibs(e.target, rect);
      }
    }
  }
  handleMouseLeave(e) {
    if (this.state.dragEl) {
      if (e.target.classList.contains('card')) {
        const rect = e.target.getBoundingClientRect();
        this.handleSibs(e.target, rect, false);
      }
    }
  }
  render() {
    const { questions, dragEl } = this.state;
    return (

      <div
        className="container-fluid p-0"
        onMouseUp={(e) => this.handleDragEnd(e)}
        onMouseMove={e => this.handleMouseMove(e)}>
        <div className="container my-3"
          style={{ maxWidth: 500 }}>
          {
            questions.map((q, i) => (
              <div
                className="card my-2"
                key={'ques_' + i}
                draggable={!dragEl}
                onDragStart={(e) => this.handleDragStart(e, i)}
                onMouseEnter={e => this.handleMouseEnter(e)}
                onMouseLeave={e => this.handleMouseLeave(e)}
                onDrop={(e) => this.handleDrop(e)}>
                <div className="card-body">
                  {q.chat_label || q.chat_desc}
                </div>
              </div>
            ))
          }
        </div>
      </div>

    )
  }
}

export default DragDrop;
