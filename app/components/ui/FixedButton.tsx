import React from "react";
import Link from 'next/link';

type FixedButtonProps = {
    text?: string;
    href?: string;
};

function FixedButton({ text = "Donate", href = "#" }: FixedButtonProps) {
    return (
        <Link
            href={href}
            aria-label={text}
            className="group fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-center gap-3
                 rounded-l-xl border border-r-0 border-[#e8c99a]/40 bg-[#e8c99a] px-3 py-5
                 font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif] text-[15px] font-semibold
                 tracking-[0.04em] text-[#14110c] outline-none
                 shadow-[-8px_0_28px_-10px_rgba(232,201,154,0.45)]
                 transition-[transform,background-color,box-shadow] duration-300 ease-out
                 translate-x-[3px] hover:translate-x-0 hover:bg-[#f1d9b3]
                 hover:shadow-[-10px_0_32px_-8px_rgba(232,201,154,0.7)]
                 focus-visible:translate-x-0 focus-visible:ring-2 focus-visible:ring-[#f1ece1]
                 motion-reduce:transition-none"
        >
            {/* Heart icon stays upright at the top of the tab */}
            <span className="flex flex-col items-center gap-3">
                <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-125"
                >
                    <path d="M10 17.2l-1.2-1.08C4.5 12.2 2 9.93 2 7.15 2 4.9 3.76 3.2 5.95 3.2c1.24 0 2.43.58 3.2 1.5l.85 1 .85-1a4.2 4.2 0 0 1 3.2-1.5C16.24 3.2 18 4.9 18 7.15c0 2.78-2.5 5.05-6.8 8.97L10 17.2z" />
                </svg>

                {/* Vertical label, reads bottom to top */}
                <span className="[writing-mode:vertical-rl] rotate-180">{text}</span>
            </span>
        </Link>
    );
}

export default FixedButton;