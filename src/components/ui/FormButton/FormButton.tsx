interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button type="submit" className="button cursor-pointer">
      {children}
    </button>
  );
}
