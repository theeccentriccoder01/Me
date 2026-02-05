export default function Skills() {
    const softwareDev = [
        'C', 'C++', 'Python', 'R', 'SQL', 'MySQL', 'SQLite', 'PIL (Pillow)', 'OpenCV',
        'HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'ReactJS',
        'Vite', 'NodeJS', 'ExpressJS', 'Django REST Framework', 'MongoDB', 'REST APIs', 'Scrapy'
    ];

    const aiDataScience = [
        'ANNs', 'CNNs', 'TensorFlow', 'Keras', 'Transformers', 'Feature Engineering',
        'Image Processing', 'PyTorch (metrics)', 'Matplotlib', 'Seaborn', 'Scikit-learn',
        'Pandas', 'NumPy'
    ];

    const toolsPlatforms = [
        'Cloud Computing', 'Version Control', 'Git and GitHub', 'Docker', 'Streamlit',
        'yt-dlp', 'Pyrogram', 'Py-TgCalls', 'Jupyter', 'HuggingFace', 'Wix'
    ];

    const badges = [
        { src: '/Badges/front-end-development-with-react.png', alt: 'Front End Development With React', link: 'https://www.credly.com/badges/f397a886-61de-4ec5-9e50-6eb741a085d1/public_url' },
        { src: '/Badges/git-and-github-essentials.png', alt: 'Git and GitHub Essentials', link: 'https://www.credly.com/badges/bcf6d1bb-3d3d-422c-bc5b-2e3c90d5ccbc/public_url' },
        { src: '/Badges/introduction-to-cloud-computing.png', alt: 'Introduction to Cloud Computing', link: 'https://www.credly.com/badges/53bd600a-4e4a-4a87-b7bd-11405964c0d3/public_url' },
        { src: '/Badges/web-development-with-html-css-javascript-essentials.png', alt: 'Web Development with HTML/CSS/JS', link: 'https://www.credly.com/badges/f093ec4e-dff7-4db6-8909-77205c6b0861/public_url' },
        { src: '/Badges/node-and-express-essentials.png', alt: 'Node and Express Essentials', link: 'https://www.credly.com/badges/4b318b6e-c7cc-4e31-856c-0957a84b14dd/public_url' },
        { src: '/Badges/python-for-data-science-and-ai.png', alt: 'Python for Data Science and AI', link: 'https://www.credly.com/badges/1bde91ac-946e-40f9-b9e5-927d9d631101/public_url' },
        { src: '/Badges/LFQ101.jpg', alt: 'LFQ101', link: 'https://www.credly.com/badges/fb130af4-6008-4ae8-b24d-e9d012f57777/public_url' },
        { src: '/Badges/Explore Emerging Tech.jpg', alt: 'Explore Emerging Tech', link: 'https://www.credly.com/badges/76e994f4-a66f-4209-9727-f0007de3c3a8/public_url' },
        { src: '/Badges/javascript-essentials-1.png', alt: 'JavaScript Essentials', link: 'https://www.credly.com/badges/83bed5fd-8ba1-4c44-8358-73fb2da1623e/public_url' },
        { src: '/Badges/Project Admin Badge.jpg', alt: 'GSSoC\'25 Project Admin', link: '#' },
    ];

    return (
        <section className="skills" id="skills">
            <h2 className="heading">My <span>Skills</span></h2>

            <div className="skills-content">
                <div className="skill-card col-4">
                    <div className="skill-category">
                        <h6><b>Software Development</b></h6>
                        <div className="thumbnail-list">
                            {softwareDev.map((skill, idx) => (
                                <div key={idx} className="thumbnail">{skill}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="skill-card col-4">
                    <div className="skill-category">
                        <h6><b>AI and Data Science</b></h6>
                        <div className="thumbnail-list">
                            {aiDataScience.map((skill, idx) => (
                                <div key={idx} className="thumbnail">{skill}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="skill-card col-4">
                    <div className="skill-category">
                        <h6><b>Tools &amp; Platforms</b></h6>
                        <div className="thumbnail-list">
                            {toolsPlatforms.map((skill, idx) => (
                                <div key={idx} className="thumbnail">{skill}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="badge-gallery">
                {badges.map((badge, idx) => (
                    <div key={idx} className="badge-item">
                        <span className="badge-icon">🏅</span>
                        <a href={badge.link} target="_blank" rel="noopener noreferrer">
                            <img src={badge.src} alt={badge.alt} />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
