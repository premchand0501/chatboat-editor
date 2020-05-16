import React, { createContext, useReducer, useContext } from 'react';
import '../../assets/Toaster.scss'

const ToastStateContext = createContext();
const ToastDispatchContext = createContext();

function ToastReducer(state, action) {
  switch (action.type) {
    case 'show': {
      return {
        messages: [...state.messages, action.toast]
      }
    }
    case 'remove': {
      console.log('remove', state, action);
      const { messages } = state;
      const found = messages.filter(m => m.timestamp === action.timestamp);
      const filtered = messages.filter(m => m.timestamp !== action.timestamp);
      if (found.length) {
        const toast = found[0];
        clearTimeout(toast.timer());
      }
      return {
        messages: [...filtered]
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(ToastReducer, { messages: [] });
  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
        <ToastConsumer></ToastConsumer>
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  )
}

function useToastState() {
  const context = useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider')
  }
  return context
}
function useToastDispatch() {
  const context = useContext(ToastDispatchContext);
  if (context === undefined) {
    throw new Error('useToastDispatch must be used within a ToastProvider')
  }
  return context
}
function useToastShow() {
  const dispatch = useToastDispatch();
  return (msg, timeout) => {
    if (!msg) return;
    const timestamp = Date.now();
    const removeTimeout = () => setTimeout(() => {
      console.log('settime')
      dispatch({ type: 'remove', timestamp });
    }, timeout || 5000);
    const toastObj = {
      type: 'show',
      toast: {
        msg,
        timer() {
          return removeTimeout();
        },
        timestamp
      }
    }
    dispatch(toastObj);
    removeTimeout()
  }
}
function ToastConsumer({ children }) {
  return (
    <ToastStateContext.Consumer>
      {
        context => {
          if (context === undefined) {
            throw new Error('ToastConsumer must be used within a ToastProvider')
          }
          const { messages } = context;
          console.log(context);
          return (
            <ToastDispatchContext.Consumer>
              {dispatch => (
                <>
                  {children}
                  {messages.length ? (
                    <div className="toast-wrapper">
                      {
                        messages.map(m => (
                          <div
                            className="alert alert-success my-2 px-3 py-2 toast border-0"
                            role="alert" key={m.msg + '_' + Math.random() * m.timestamp}>
                            {m.msg}
                            <br></br>
                            <button
                              className="btn btn-outline-light my-2 btn-sm"
                              onClick={() => dispatch({ type: 'remove', timestamp: m.timestamp })}>
                              &times;
                              </button>
                          </div>
                        ))
                      }
                    </div>
                  ) : null}
                </>
              )}
            </ToastDispatchContext.Consumer>
          )
        }
      }
    </ToastStateContext.Consumer>
  )
}
function useToast() {
  return [useToastState(), useToastDispatch()]
}

function withShowToast(WrappedComponent) {
  return function (props) {
    const showToast = useToastShow();
    return <WrappedComponent {...props} showToast={showToast} />
  }
}
export { useToast, ToastProvider, ToastConsumer, useToastShow, withShowToast };