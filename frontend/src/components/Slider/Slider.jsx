import React, { useEffect } from 'react';
import '../../styles/slider.css';
import { initFlickity } from './slider.js';

// Each logo with its specific faculty URL
const logos = [
    {
        src: 'https://eng.psu.edu.eg/wp-content/uploads/2022/01/cropped-eng_logofinal-1.png',
        href: 'https://eng.psu.edu.eg/',
        alt: 'كلية الهندسة',
    },
    {
        src: 'https://sci.psu.edu.eg/wp-content/uploads/2021/12/%D8%B9%D9%84%D9%88%D9%85.zip.png',
        href: 'https://sci.psu.edu.eg/',
        alt: 'كلية العلوم',
    },
    {
        src: 'https://himc.psu.edu.eg/wp-content/uploads/2021/12/%D9%83%D9%84%D9%8A%D8%A9-%D8%AA%D9%83%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A%D8%A72.png',
        href: 'https://himc.psu.edu.eg/',
        alt: 'تكنولوجيا الادارة ونظم المعلومات',
    },
    {
        src: 'https://med.psu.edu.eg/wp-content/uploads/2021/12/Untitled-20221027-072807-e1666855782219.png',
        href: 'https://med.psu.edu.eg/',
        alt: 'كلية الطب',
    },
    {
        src: 'https://pharm.psu.edu.eg/wp-content/uploads/2021/12/Picture1-1.jpg',
        href: 'https://pharm.psu.edu.eg/',
        alt: 'كلية الصيدلة',
    },
    {
        src: 'https://nur.psu.edu.eg/wp-content/uploads/2022/03/Nur-Logo-Colored.png',
        href: 'https://nur.psu.edu.eg/',
        alt: 'كلية التمريض',
    },
    {
        src: 'https://pt.psu.edu.eg/wp-content/uploads/2021/12/WhatsApp-Image-2022-07-23-at-2.50.22-PM-1.jpeg',
        href: 'https://pt.psu.edu.eg/',
        alt: 'كلية العلاج الطبيعي',
    },
    {
        src: 'https://com.psu.edu.eg/wp-content/uploads/2021/07/Commerce-Logo-Colored.png',
        href: 'https://com.psu.edu.eg/',
        alt: 'كلية التجارة',
    },
    {
        src: 'https://edu.psu.edu.eg/wp-content/uploads/2022/10/edu-new.png',
        href: 'https://edu.psu.edu.eg/',
        alt: 'كلية التربية',
    },
    {
        src: 'https://spcd.psu.edu.eg/wp-content/uploads/2021/12/spcd-logo-1.jpeg',
        href: 'https://spcd.psu.edu.eg/',
        alt: 'كلية التربية النوعية',
    },
    {
        src: 'https://phyd.psu.edu.eg/wp-content/uploads/2021/12/phys-logo-final-Arabic-web.png',
        href: 'https://phyd.psu.edu.eg/',
        alt: 'كلية التربية الرياضية',
    },
    {
        src: 'https://kind.psu.edu.eg/wp-content/uploads/2021/12/kids-logo-Arabic-new.png',
        href: 'https://kind.psu.edu.eg/',
        alt: 'كلية التربية للطفولة المبكرة',
    },
    {
        src: 'https://arts.psu.edu.eg/wp-content/uploads/2021/12/Arts-logo-Arabic.png',
        href: 'https://arts.psu.edu.eg/',
        alt: 'كلية الآداب',
    },
    {
        src: 'https://law.psu.edu.eg/wp-content/uploads/2022/10/law-logo.png',
        href: 'https://law.psu.edu.eg/',
        alt: 'كلية الحقوق',
    },
];

function Slider() {
    useEffect(() => {
        const flickityInstance = initFlickity();
        return () => {
            if (flickityInstance) {
                if (typeof flickityInstance.stop === 'function') {
                    flickityInstance.stop();
                }
                flickityInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="b-slider marquee-slider" aria-label="شركاء مميزون">
            {logos.map(({ src, href, alt }, i) => (
                <div className="b-slider__slide" key={`logo-${i}`}>
                    <a href={href} className="b-slider__ref" tabIndex={-1} target="_blank" rel="noopener noreferrer">
                        <img src={src} className="b-slider__img" alt={alt || ''} />
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Slider;
