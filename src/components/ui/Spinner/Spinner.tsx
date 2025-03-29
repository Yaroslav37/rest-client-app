import Image from 'next/image';

export const Spinner = () => {
  return (
    <div
      data-testid="spinner"
      className="fixed flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.1)]"
    >
      <Image width={80} height={80} src="/spinner.svg" alt="spinner" priority />
    </div>
  );
};
