import React from "react";

type TInput = {
  onChange: (value: string) => void;
  value: string;
  label: string;
  placeholder?: string;
  type?: string;
};

const Input: React.FC<TInput> = ({ onChange, value, placeholder = '', label, type = 'text' }) => {
  return (
    <div>
      <label className="label p-2">
        <span className="text-base label-text">{label}</span>
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        className="w-full input input-bordered h-10"
      />
    </div>
  )
}

export default Input