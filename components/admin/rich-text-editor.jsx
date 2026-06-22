"use client"
import React, { useRef, useEffect } from 'react';

export function RichTextEditor({ value, onChange, placeholder, rows = 10, className = "" }) {
  const editorRef = useRef(null);

  useEffect(() => {
    // Only update innerHTML if it's different from the current state
    // This prevents cursor jumping while typing
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = (e) => {
    onChange(e.currentTarget.innerHTML);
  };

  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 bg-white overflow-y-auto prose max-w-none ${className}`}
      style={{ minHeight: `${rows * 1.5}rem` }}
      placeholder={placeholder}
      suppressContentEditableWarning={true}
    />
  );
}
