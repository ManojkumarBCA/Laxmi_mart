import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeMenSlider from './HomeMenSlider';
import HomeWomenSlider from './HomeWomenSlider';

interface TrendingSectionProps { }

export default function TrendingSection(props: TrendingSectionProps): JSX.Element {
    const [selectedSection, setSelectedSection] = useState<string>('men');

    const handleMenClick = (): void => {
        setSelectedSection('men');
    };

    const handleWomenClick = (): void => {
        setSelectedSection('women');
    };

    return (
        <div>
            <div>
                <b>
                    <h2 className='trandingHomepagetext'>TRENDING</h2>
                </b>
            </div>

            <div className='d-flex justify-content-center mt-3'>
                <div>
                    <Link to='' className={`text-decoration-none text-dark Trandingtext ${selectedSection === 'men' ? 'active' : ''}`} onClick={handleMenClick}>
                        <p>MEN</p>
                    </Link>
                </div>
                <div>
                    <Link to='' className={`text-decoration-none text-dark Trandingtext ${selectedSection === 'women' ? 'active' : ''}`} onClick={handleWomenClick}>
                        <p>WOMEN</p>
                    </Link>
                </div>
            </div>

            {selectedSection === 'men' && (
                <div className='mt-5 mb-5'>
                   <HomeMenSlider />
                </div>
            )}

            {selectedSection === 'women' && (
                <div className='mt-5 mb-5 text-center'>
                   <HomeWomenSlider />
                </div>
            )}
        </div>
    );
}