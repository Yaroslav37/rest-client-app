import Image from 'next/image';

export const Spinner = () => {
  return (
    <div className="relative h-screen w-full">
      <div
        data-testid="spinner"
        className="absolute flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.1)]"
      >
        <Image width={80} height={80} src="/spinner.svg" alt="spinner" priority />
      </div>
    </div>
  );
};
