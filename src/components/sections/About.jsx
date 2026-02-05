export default function About() {
    return (
        <section className="about" id="about">
            <h2 className="heading">About <span>Me</span></h2>

            <div className="about-img">
                <img src="/images/about.png" alt="About Me" />
                <span className="circle-spin"></span>
            </div>

            <div className="about-content">
                <h3>Hi there! Glad to see you here.</h3>
                <p>
                    Hello! Sagnik Chakraborty here. A technology fanatic!<br />
                    I aim at building impactful digital products with a focus on functionality,
                    visual appeal, and user experience. Let&apos;s connect and collaborate on
                    cutting-edge projects that can make a difference!
                </p>

                <div className="btn-box btns">
                    <a href="#contact" className="btn">Contact Me</a>
                </div>
            </div>

            <div className="about-sci">
                <a href="https://brainly.in/app/profile/7324789" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/brainly.jpeg" alt="Brainly" className="about-sci-logo" />
                </a>
                <a href="https://www.geeksforgeeks.org/user/eccentriccoder" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/geeksforgeeks.jpeg" alt="GeeksForGeeks" className="about-sci-logo" />
                </a>
                <a href="https://www.codechef.com/users/eccentriccoder" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/CodeChef.jpg" alt="CodeChef" className="about-sci-logo" />
                </a>
                <a href="https://codeforces.com/profile/sagnikgraviton847" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/codeforces.jpg" alt="CodeForces" className="about-sci-logo" />
                </a>
                <a href="https://www.skills.google/public_profiles/88955038-92e7-4861-b63b-aee7a92261cc" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/Google Cloud.jpg" alt="LeetCode" className="about-sci-logo" />
                </a>
                <a href="https://leetcode.com/u/eccentriccoder01/" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/LeetCode.png" alt="LeetCode" className="about-sci-logo" />
                </a>
                <a href="https://www.naukri.com/code360/profile/eccentriccoder" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/codingninjas.jpeg" alt="Coding Ninjas" className="about-sci-logo" />
                </a>
                <a href="https://tryhackme.com/p/eccentriccoder" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/tryhackme.jpeg" alt="TryHackMe" className="about-sci-logo" />
                </a>
                <a href="https://www.credly.com/users/mreccentric" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/Credly.png" alt="Credly" className="about-sci-logo" />
                </a>
            </div>
        </section>
    );
}
