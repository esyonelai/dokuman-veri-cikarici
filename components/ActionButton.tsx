import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'error';
}

export const ActionButton: React.FC<ActionButtonProps> = ({ children, icon, variant = 'primary', ...props }) => {
  const baseClasses = "flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500",
    secondary: "bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-500",
    error: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
};