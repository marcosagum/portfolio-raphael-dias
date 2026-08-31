type MarqueeProps = {
  text: string;
};

export default function Marquee({ text }: MarqueeProps) {
  return (
    <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] leading-none text-cream sm:text-[26vh]">
      <span className="pr-[6vw]">{text}</span>
      <span className="pr-[6vw]">{text}</span>
    </div>
  );
}
