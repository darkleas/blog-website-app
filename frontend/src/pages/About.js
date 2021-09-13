function About() {
  return (
    <main>
      <div className="container" style={{ marginTop: "6rem" }}>
        <div className="about">
          <div className="rawz" style={{ display: "flex" }}>
            <div className="top">
              <img alt="" src="https://i.ibb.co/KFBZ2L3/profile.jpg" className="about-img" />
              <div className="about-social-media mt-5">
                <a
                    rel="noreferrer"
                  target="_blank"
                  href="https://github.com/darkleas/"
                  className="about-links"
                >
                  <i class="fab fa-github"></i> Github
                </a>
                <a
                    rel="noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/burhan-kocada%C4%9F-49a3331a5/"
                  className="about-links"
                >
                  <i class="fab fa-linkedin-in"></i> Linkedin
                </a>
                <a
                rel="noreferrer"
                  target="_blank"
                  href="https://twitter.com/burhankocadag0"
                  className="about-links"
                >
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </div>
            </div>
            <div className="right">
              <p> Hi, this is Burhan.</p>

              <p>
              My interest is Software Development and I have been interested in Software Development since the 2019 year. I want to be a software developer in the future. I was born in 2005.
              </p>

              <p>All my skills are;</p>

              <p>
              Python, React, C#, Amazon AWS, Django, PHP, MySQL, PostgreSQL, SQLite, Bootstrap, Jquery, JavaScript, HTML, CSS, Chart.js.

              </p>

              <p>
              I'm still learning programming languages and I will keep on learning programming languages. Meanwhile, I will create open-source projects. You can review my open source projects on my github profile. I'm focusing on improving myself.

              </p>

              <p>
                Email: burhankcd@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default About;
