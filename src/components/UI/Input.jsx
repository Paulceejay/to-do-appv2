import React from "react";

const Input = React.forwardRef((props, ref) => {
    return (
      <>
        <div className="flex flex-col my-5">
          <label htmlFor={props.id} className="font-bold mb-1 text-secondaryBlack">{props.label}</label>
          <input className="h-12 p-3 outline-0 rounded-xl text-primaryBlack" {...props} ref={ref} />
          <small className="text-red">{props.valid}</small>
        </div>
      </>
    );
})

export const InputUI = (props) => {
  return (
    <>
      <div className="flex flex-col my-5">
        <label
          htmlFor={props.id}
          className="font-bold mb-1 text-secondaryBlack"
        >
          {props.label}
        </label>
        <input
          className="h-12 p-3 outline-0 rounded-xl text-primaryBlack"
          {...props}
        />
        <small className="text-red">{props.valid}</small>
      </div>
    </>
  );
};

export default Input