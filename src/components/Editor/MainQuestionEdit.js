import React, { useState } from 'react';

export const MainQuestionEdit = ({
  questions,
  currentQuestion,
  handleSubmit,
  handleOnChange,
  handleAddEditChatOption,
  clearForm,
  deleteOption,
}) => {
  const [deleteChatId, setDelete] = useState(-1);
  const handleDelete = (event, chat_id) => {
    event.stopPropagation();
    if (deleteChatId === chat_id) {
      setDelete(-1)
      deleteOption(chat_id)
    } else {
      setDelete(chat_id)
    }
  }
  return (
    <form onSubmit={(event) => handleSubmit(event, false)}>
      <h3>Enter your chat details</h3>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">Chat ID#</label>
        </div>
        <input
          type="text"
          name="chat_id"
          className="form-control"
          value={currentQuestion.chat_id}
          onChange={(event) => handleOnChange(event, false)}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="chatLabel" style={{
          fontWeight: currentQuestion.type === 'c' ? 900 : 400
        }}>{currentQuestion.type === 'c' ? 'Subject Line' : 'Chat Label'}</label>
        <textarea
          type="text"
          className="form-control"
          id="chatLabel"
          name="chat_label"
          value={currentQuestion.chat_label}
          rows="3"
          placeholder={currentQuestion.type === 'c' ? 'If your question type is contact us then enter your subject line here to show in contact us form' : ''}
          onChange={(event) => handleOnChange(event, false)}
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
          value={currentQuestion.chat_desc}
          onChange={(event) => handleOnChange(event, false)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="chatType">Chat Type</label>
        <select
          className="form-control"
          id="chatType"
          name="type"
          value={currentQuestion.type}
          onChange={(event) => handleOnChange(event, false)}
        >
          <option value="">Select Type</option>
          <option value="q">Question</option>
          <option value="ol">Options List</option>
          <option value="a">Answer</option>
          <option value="c">Contact us</option>
          <option value="i">Info Message</option>
        </select>
      </div>
      <div className="form-group mb3">
        <label htmlFor="replayId">Chat Options</label>
        <button
          type="button"
          className="btn btn-outline-info mb-1 w-100"
          onClick={() => handleAddEditChatOption(currentQuestion)}
        >
          + Add Chat Options
        </button>
        {currentQuestion.chat_options.map((q, ind) => (
          <button
            type="button"
            className="btn btn-outline-dark mb-1 w-100 d-flex align-items-center justify-content-between text-left"
            key={'ol_ques_' + ind}
            onClick={() => handleAddEditChatOption(q)}
          >
            <span>{q.chat_label && <p className="m-0">{q.chat_label}</p>}
              {q.chat_desc && (
                <p className="m-0">
                  <small>{q.chat_desc}</small>
                </p>
              )}</span>
            <span
              className={`btn ${deleteChatId === q.chat_id ? 'btn-danger' : 'btn-outline-danger'} btn-sm`}
              onClick={(event) => handleDelete(event, q.chat_id)}>
              {deleteChatId === q.chat_id ? 'Confirm Delete' : 'Delete'}
            </span>
            {
              deleteChatId === q.chat_id && (
                <span
                  className={`btn btn-link btn-sm text-warning`}
                  onClick={(event) => handleDelete(event, -1)}>
                  Cancel
                </span>
              )
            }
          </button>
        ))}
      </div>
      {currentQuestion.type !== 'ol' ? (
        <div className="form-group">
          <label htmlFor="replayId">Chat Replay</label>
          <select
            className="form-control"
            id="replayId"
            name="reply_id"
            onChange={(event) => handleOnChange(event, false)}
            value={currentQuestion.reply_id}
          >
            <option value={null} disabled>Select Chat Replay</option>
            <option value="">No Reply</option>
            {questions.map((q, i) => (
              <option
                key={'opt_' + i}
                value={q.chat_id}
                disabled={q.chat_id === currentQuestion.chat_id || q.reply_id === currentQuestion.chat_id}
              >
                {'#' + q.chat_id} : {q.chat_label || q.chat_desc}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button
        type="button"
        className="ml-3 btn btn-outline-primary"
        onClick={clearForm}
      >
        Clear Form
      </button>
    </form>
  );
};
