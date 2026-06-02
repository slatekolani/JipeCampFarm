import { ImgHTMLAttributes } from 'react';

type BrandLogoProps = ImgHTMLAttributes<HTMLImageElement> & {
    framed?: boolean;
};

export const brandLogoPath = '/brand/jipe-farm-campsite-logo.jpeg';

export default function BrandLogo({ className = '', framed = true, alt = 'Jipe Farm Campsite logo', ...props }: BrandLogoProps) {
    const frameClasses = framed
        ? 'rounded-md bg-white p-1 shadow-sm shadow-black/20 ring-1 ring-black/10'
        : '';

    return (
        <img
            {...props}
            src={brandLogoPath}
            alt={alt}
            className={`${frameClasses} object-contain ${className}`.trim()}
        />
    );
}
