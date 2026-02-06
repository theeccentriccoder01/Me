export default function Footer() {
    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <div className="footer-text">
                <p>Copyright &copy; Portfolio by Eccentric Explorer</p>
            </div>

            <div className="footer-iconTop">
                <a href="#" onClick={scrollToTop}>
                    <i className="bx bx-up-arrow-alt"></i>
                </a>
            </div>
        </footer>
    );
}
