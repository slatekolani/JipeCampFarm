import { ImgHTMLAttributes } from 'react';
import BrandLogo from './BrandLogo';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <BrandLogo {...props} />;
}
