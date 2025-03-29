import Image from 'next/image';

export const Spinner = () => {
  return (
    <div
      data-testid="spinner"
      className="absolute flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.1)]"
    >
      <Image width={100} height={100} src="/spinner.svg" alt="spinner" />
    </div>
  );
};
