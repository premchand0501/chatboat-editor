import React, { useRef } from 'react';
import { FaTrashAlt, FaTimes, FaPlus, FaPaperPlane } from 'react-icons/fa';

export const ContactUsForm = ({ contactUs, handleSubmit, handleOnChange, setContactUs, message, email, copyMe, attachment }) => {
  const attachmentEl = useRef();
  return contactUs && contactUs.chat_id ? (
    <form className="chatFooter" onSubmit={handleSubmit}>
      <div className="contactUsForChat">
        <div className="w-100">
          {
            contactUs.email && (
              <>
                <p className="m-0 email mb-2">
                  <button className="btn btn-link text-dark" type="button" onClick={() => {
                    const _c = { ...contactUs };
                    delete _c.email;
                    setContactUs(_c);
                  }}>
                    <FaTrashAlt />
                  </button>
                  <small>From: {contactUs.email}</small>
                </p>
                <div className="form-check ml-2">
                  <input type="checkbox" className="form-check-input" id="copyMe" name="copyMe" value={copyMe}
                    onChange={handleOnChange} />
                  <label htmlFor="copyMe" className="form-check-label">Copy Me</label>
                </div>
              </>
            )
          }
          {
            attachment && (
              <p className="m-0 email mb-2">
                <button className="btn btn-link text-dark" type="button" onClick={() => setContactUs(null)}>
                  <FaTrashAlt />
                </button>
                <small>Attachment: {attachment && attachment.name}</small>
              </p>
            )
          }
          <p className="my-2 mx-0 subject">Subject: {contactUs.chat_label}</p>
        </div>
        <button className="btn btn-outline-dark" type="button" onClick={() => setContactUs(null)}>
          <FaTimes />
        </button>
      </div>
      <div>
        <input
          type="file"
          name="attachment"
          className="d-none"
          ref={attachmentEl}
          onChange={handleOnChange}
          accept="image/*" />
        <button
          className="btn btn-link text-dark addAttachmentBtn"
          type="button"
          onClick={() => {
            attachmentEl.current.click();
          }}>
          <FaPlus />
        </button>
      </div>
      <div className="input-group">
        {
          contactUs.email ? (
            <input
              type="text"
              className="form-control"
              placeholder="Write something here.."
              name="message"
              value={message}
              onChange={handleOnChange} />
          ) : (
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email" value={email}
                onChange={handleOnChange} />
            )
        }
        <div className="input-group-append">
          <button className="btn btn-link text-dark addAttachmentBtn" type="submit">
            <FaPaperPlane />
          </button>
        </div>
      </div>
      {/* <button className="btn btn-link text-dark addAttachmentBtn" type="button">
          <FaMicrophone />
        </button> */}
    </form>
  ) : null
}
