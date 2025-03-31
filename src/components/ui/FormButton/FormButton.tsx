interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button type="submit" className="button">
      {children}
    </button>
  );
};
