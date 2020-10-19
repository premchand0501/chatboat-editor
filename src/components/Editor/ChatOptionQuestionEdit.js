import React from 'react';

export const ChatOptionQuestionEdit = ({
  questions,
  chatOptionsQuestion,
  handleSubmit,
  handleOnChange,
  currentQuestion,
  handleBack,
}) => {
  return (
    <form onSubmit={(event) => handleSubmit(event, true)}>
      <div className="action-bar d-flex align-items-center mb-3">
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleBack}
        >
          Back
        </button>
        <h5 className="m-0 ml-2">
          Adding Chat options for Chat ID# {currentQuestion.chat_id}
        </h5>
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">Chat ID#</label>
        </div>
        <input
          type="text"
          className="form-control"
          name="chat_id"
          value={chatOptionsQuestion.chat_id}
          onChange={(event) => handleOnChange(event, true)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="chatLabel">Chat Label</label>
        <textarea
          type="text"
          className="form-control"
          id="chatLabel"
          name="chat_label"
          value={chatOptionsQuestion.chat_label}
          rows="3"
          onChange={(event) => handleOnChange(event, true)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="chatDesc">Chat Description</label>
        <textarea
          type="text"
          className="form-control"
          id="chatDesc"
          name="chat_desc"
          rows="4"
          value={chatOptionsQuestion.chat_desc}
          onChange={(event) => handleOnChange(event, true)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="chatType">Chat Type</label>
        <select
          className="form-control"
          id="chatType"
          name="type"
          value={chatOptionsQuestion.type}
          onChange={(event) => handleOnChange(event, true)}
        >
          <option value="">Select Type</option>
          <option value="q">Question</option>
          <option value="a">Answer</option>
          <option value="c">Contact us</option>
          <option value="i">Info Message</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="replayId">Chat Replay</label>
        <select
          className="form-control"
          id="replayId"
          name="reply_id"
          onChange={(event) => handleOnChange(event, true)}
          value={chatOptionsQuestion.reply_id + ''}
        >
          <option value={null} disabled>Select Chat Replay</option>
          <option value="">No Reply</option>
          {questions.map((q, i) => (
            <option
              key={'opt_' + i}
              value={q.chat_id}
              disabled={q.reply_id === currentQuestion.chat_id}
            >
              {'#' + q.chat_id} : {q.chat_label || q.chat_desc}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
