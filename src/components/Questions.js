import React, { useState } from 'react';

const Questions = ({ questions, setEditQuestion, downloadJSON, searchText, handleSearch, deleteQuestion }) => {
  const [deleteChatId, setDelete] = useState(-1);
  let _questions = [];
  if (searchText) {
    const s = searchText.toLowerCase();
    _questions = questions.filter(qu => qu.chat_id.toString().toLowerCase().includes(s) || qu.chat_label.toLowerCase().includes(s) || qu.chat_desc.toLowerCase().includes(s) || (qu.reply_id && qu.reply_id.toString().toLowerCase().includes(s)))
  }
  else {
    _questions = questions
  }
  const handleDelete = (event, chat_id) => {
    event.stopPropagation();
    if (deleteChatId === chat_id) {
      setDelete(-1)
      deleteQuestion(chat_id)
    } else {
      setDelete(chat_id)
    }
  }
  return (
    <div className="questions col-12 col-md-6 col-sm-6">
      <div className="action-bar d-flex align-items-center justify-content-between">
        <h5 className="m-0 ml-2">Chat boat Questions</h5>
        <button className="btn btn-primary" onClick={downloadJSON}>
          Download JSON
        </button>
        <div className="input-group px-0 mt-3" style={{ flexBasis: '100%' }}>
          <input
            type="text"
            className="form-control"
            value={searchText}
            onChange={(event) => handleSearch(event.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-secondary" onClick={() => handleSearch('')}>Clear</button>
          </div>
        </div>
      </div>
      {(_questions &&
        _questions.length) ?
        _questions.map((que, index) => (
          <div
            className="card mb-2"
            key={'ques_' + index}
            onClick={() => setEditQuestion(que)}
          >
            <div className="card-body">
              <h6 className="card-text d-flex align-items-center justify-content-between">
                <span>
                  Chat ID# <strong>{que.chat_id}</strong>
                </span>
                {que.reply_id && <span>Reply Id# {que.reply_id}</span>}
              </h6>
              <h5 className="card-title">{que.chat_label}</h5>
              <p className="card-text">{que.chat_desc}</p>
              <button className={`btn ${deleteChatId === que.chat_id ? 'btn-danger' : 'btn-outline-danger'} btn-sm`} onClick={(event) => handleDelete(event, que.chat_id)}>{deleteChatId === que.chat_id ? 'Confirm Delete' : 'Delete'}</button>
              {
                deleteChatId === que.chat_id && (
                  <button className={`btn btn-outline-light' btn-sm`} onClick={(event) => handleDelete(event, -1)}>Cancel</button>
                )
              }
            </div>
          </div>
        )) : (
          <div className="alert alert-info fade-scale-up" role="alert">
            No questions added yet
          </div>
        )}
    </div>
  );
};

export default Questions;
