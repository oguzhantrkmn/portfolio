"use client";
import React from 'react';
import { Send } from 'lucide-react';
import './send-btn.css';

interface SendButtonProps {
    disabled?: boolean;
    isSubmitting?: boolean;
}

const SendButton = ({ disabled, isSubmitting }: SendButtonProps) => {
  return (
    <button 
      type="submit"
      disabled={disabled || isSubmitting}
      className="send-button mt-4" 
      style={{ '--clr': '#00ad54' } as React.CSSProperties}
    >
      <span className="send-button-decor" />
      <div className="send-button-content">
        <div className="send-button__icon">
            <Send size={18} />
        </div>
        <span className="send-button__text">
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                "Gönder"
            )}
        </span>
      </div>
    </button>
  );
};

export default SendButton;
