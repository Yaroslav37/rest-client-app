interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: Props) => {
  return (
    <div className={`px-4 sm:px-6 xl:px-10 max-w-[1920px] mx-auto ${className}`}>{children}</div>
  );
};
