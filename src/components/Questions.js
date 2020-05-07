import React from 'react';

const Questions = ({ questions, setEditQuestion, downloadJSON }) => {
  return (
    <div className="questions col-12 col-md-6 col-sm-6">
      <div className="action-bar d-flex align-items-center justify-content-between mb-3">
        <h5 className="m-0 ml-2">Chat boat Questions</h5>
        <button className="btn btn-primary" onClick={downloadJSON}>
          Download JSON
        </button>
      </div>
      {questions &&
        questions.length &&
        questions.map((que, index) => (
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
            </div>
          </div>
        ))}
    </div>
  );
};

export default Questions;
